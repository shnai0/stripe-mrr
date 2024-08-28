import Stripe from "stripe";
import {
  startOfMonth,
  subMonths,
  format,
  parse,
  compareAsc,
  isValid,
} from "date-fns";

// Define the StripeAccount type
type StripeAccount = {
  name: string;
  stripe: Stripe;
};

// Initialize your Stripe instances
const stripe1 = new Stripe(process.env.STRIPE_SECRET_KEY_1 || "", {
  apiVersion: "2024-06-20",
});
const stripe2 = new Stripe(process.env.STRIPE_SECRET_KEY_2 || "", {
  apiVersion: "2024-06-20",
});

function calculateMRRAndGross(subscription: Stripe.Subscription): {
  mrr: number;
  gross: number;
} {
  const interval = subscription.items.data[0]?.plan.interval || "month";
  const amount = subscription.items.data[0]?.plan.amount || 0;

  let mrr = amount;
  if (interval === "year") {
    mrr = amount / 12;
  }

  return {
    mrr: mrr / 100, // Convert cents to dollars
    gross: amount / 100, // Convert cents to dollars
  };
}

async function getStripeAccounts(): Promise<
  { name: string; stripe: Stripe }[]
> {
  return [
    { name: "Stripe Account 1", stripe: stripe1 },
    { name: "Stripe Account 2", stripe: stripe2 },
  ].filter((account) => account.stripe !== null);
}

async function fetchAllSubscriptions(
  stripe: Stripe
): Promise<Stripe.Subscription[]> {
  let allSubscriptions: Stripe.Subscription[] = [];
  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const result = await stripe.subscriptions.list({
      limit: 100,
      starting_after: startingAfter,
      status: "active",
    });

    allSubscriptions = allSubscriptions.concat(result.data);
    hasMore = result.has_more;
    startingAfter = result.data[result.data.length - 1]?.id;

    console.log(
      `Fetched ${result.data.length} subscriptions. Total: ${allSubscriptions.length}`
    );
  }

  console.log(`Total subscriptions fetched: ${allSubscriptions.length}`);
  return allSubscriptions;
}

async function getHistoricalMRR(stripeAccount: StripeAccount) {
  const endDate = new Date();
  const startDate = subMonths(startOfMonth(endDate), 11); // 12 months ago

  const subscriptions = await fetchAllSubscriptions(stripeAccount.stripe);

  return Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(endDate, i);
    const month = format(date, "yyyy-MM");
    const combinedMRR = subscriptions
      .filter((sub) => new Date(sub.created * 1000) <= date)
      .reduce((total, sub) => total + calculateMRRAndGross(sub).mrr, 0);
    return { month, combinedMRR };
  }).reverse();
}

async function getMRRAndVolume(stripe: Stripe) {
  const subscriptions = await fetchAllSubscriptions(stripe);
  let mrr = 0;
  let volume = 0;

  subscriptions.forEach((subscription) => {
    const { mrr: subMRR, gross: subGross } = calculateMRRAndGross(subscription);
    mrr += subMRR;
    volume += subGross;
  });

  return { mrr, volume };
}

async function getHistoricalMRRForAllAccounts(
  accounts: StripeAccount[]
): Promise<Array<{ month: string; combinedMRR: number }>> {
  const endDate = new Date();
  const startDate = subMonths(startOfMonth(endDate), 11); // Get 12 months of data

  const monthlyData: { [key: string]: number } = {};

  for (const account of accounts) {
    const accountData = await getHistoricalMRR(account);
    accountData.forEach(({ month, combinedMRR }) => {
      monthlyData[month] = (monthlyData[month] || 0) + combinedMRR;
    });
  }

  return Object.entries(monthlyData)
    .map(([month, combinedMRR]) => {
      try {
        const parsedDate = parse(month, "yyyy-MM", new Date());
        if (!isValid(parsedDate)) {
          console.error(`Invalid date: ${month}`);
          return null;
        }
        return {
          month,
          combinedMRR,
        };
      } catch (error) {
        console.error(`Error processing date: ${month}`, error);
        return null;
      }
    })
    .filter(
      (item): item is { month: string; combinedMRR: number } => item !== null
    )
    .sort((a, b) =>
      compareAsc(
        parse(a.month, "yyyy-MM", new Date()),
        parse(b.month, "yyyy-MM", new Date())
      )
    );
}

async function getHistoricalVolume(
  account: StripeAccount
): Promise<Array<{ month: string; totalVolume: number }>> {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - 11); // Get 12 months of data

  const monthlyData: Array<{ month: string; totalVolume: number }> = [];

  for (
    let d = new Date(startDate);
    d <= endDate;
    d.setMonth(d.getMonth() + 1)
  ) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const subscriptions = await fetchSubscriptionsForMonth(
      account.stripe,
      year,
      month
    );
    const totalVolume = subscriptions.reduce(
      (sum, sub) => sum + calculateMRRAndGross(sub).gross,
      0
    );

    monthlyData.push({
      month: `${year}-${month.toString().padStart(2, "0")}`,
      totalVolume,
    });
  }

  return monthlyData.sort((a, b) =>
    compareAsc(
      parse(a.month, "yyyy-MM", new Date()),
      parse(b.month, "yyyy-MM", new Date())
    )
  );
}

export async function getCombinedData() {
  try {
    console.log("getCombinedData: Starting to fetch data");
    const accounts = await getStripeAccounts();
    const mrrData = await Promise.all(
      accounts.map(async (account) => {
        const { mrr, volume } = await getMRRAndVolume(account.stripe);
        return { name: account.name, MRR: mrr, volume };
      })
    );

    const totalMrr = mrrData.reduce((sum, item) => sum + item.MRR, 0);
    const totalVolume = mrrData.reduce((sum, item) => sum + item.volume, 0);

    console.log("getCombinedData: Fetching historical MRR data");
    const mrrHistory = await getHistoricalMRRForAllAccounts(accounts);
    console.log("MRR History:", mrrHistory);

    console.log("getCombinedData: Fetching volume history");
    const volumeHistory =
      accounts.length > 0 ? await getHistoricalVolume(accounts[0]) : [];

    console.log("getCombinedData: Successfully compiled all data");
    return { mrrData, totalMrr, totalVolume, mrrHistory, volumeHistory };
  } catch (error) {
    console.error("Error in getCombinedData:", error);
    throw error;
  }
}

async function fetchSubscriptionsForMonth(
  stripe: Stripe,
  year: number,
  month: number
): Promise<Stripe.Subscription[]> {
  const startDate = new Date(year, month - 1, 1).getTime() / 1000;
  const endDate = new Date(year, month, 0).getTime() / 1000;

  const subscriptions = await stripe.subscriptions.list({
    limit: 100,
    created: {
      gte: startDate,
      lt: endDate,
    },
    status: "active",
  });

  return subscriptions.data;
}
