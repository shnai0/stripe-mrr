import Stripe from "stripe";
import { startOfMonth, subMonths, format } from "date-fns";

// Initialize your Stripe instances
const stripe1 = new Stripe(process.env.STRIPE_SECRET_KEY_1 || "", {
  apiVersion: "2024-06-20",
});
const stripe2 = new Stripe(process.env.STRIPE_SECRET_KEY_2 || "", {
  apiVersion: "2024-06-20",
});

function calculateMRRAndGross(subscription: Stripe.Subscription) {
  let mrr = 0;
  let gross = 0;

  subscription.items.data.forEach((item) => {
    const plan = item.plan;
    const quantity = item.quantity || 1;
    const amount = ((plan.amount || 0) / 100) * quantity;

    if (plan.interval === "year") {
      mrr += amount / 12;
    } else if (plan.interval === "month") {
      mrr += amount;
    }

    gross += amount;
  });

  return { mrr, gross };
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

async function getHistoricalMRR(stripeAccount: {
  name: string;
  stripe: Stripe;
}) {
  const endDate = new Date();
  const startDate = subMonths(startOfMonth(endDate), 5); // 6 months ago

  const subscriptions = await fetchAllSubscriptions(stripeAccount.stripe);

  return Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(endDate, i);
    const month = format(date, "MMMM");
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

export async function getCombinedData() {
  const accounts = await getStripeAccounts();
  const mrrData = await Promise.all(
    accounts.map(async (account) => {
      const { mrr, volume } = await getMRRAndVolume(account.stripe);
      return { name: account.name, MRR: mrr, volume };
    })
  );

  const totalMrr = mrrData.reduce((sum, item) => sum + item.MRR, 0);
  const totalVolume = mrrData.reduce((sum, item) => sum + item.volume, 0);

  // Get historical MRR data for the first account (you may want to combine data from all accounts)
  const mrrHistory =
    accounts.length > 0 ? await getHistoricalMRR(accounts[0]) : [];

  return { mrrData, totalMrr, totalVolume, mrrHistory };
}
