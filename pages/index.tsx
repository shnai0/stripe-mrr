"use client";

import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { MyChart } from "@/components/ui/charts";

import { GetServerSideProps } from "next";
import { getCombinedData } from "../lib/stripe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

interface DashboardProps {
  data?: {
    mrrData: Array<{ name: string; MRR: number; volume: number }>;
    totalMrr: number;
    totalVolume: number;
    mrrHistory: Array<{ month: string; combinedMRR: number }>;
  };
  error?: string;
}

const chartConfig = {
  combinedMRR: {
    label: "Combined MRR",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const getServerSideProps: GetServerSideProps<
  DashboardProps
> = async () => {
  try {
    const data = await getCombinedData();
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { props: { error: "Failed to fetch dashboard data" } };
  }
};

const Home: React.FC<DashboardProps> = ({ data, error }) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col space-y-4 p-4">
          {/* <h1 className="text-2xl font-bold">
            Papermark Stripe MRR Dashboard (2 accounts)
          </h1> */}

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="w-full lg:w-2/3 space-y-4 my-10">
              <div className="h-[300px]">
                <MyChart data={data.mrrHistory} />
              </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-4 pt-10 ">
              {data.mrrData.map((account, index) => (
                <Card key={index} className="p-4">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-sm text-muted-foreground mb-1">
                      {account.name} MRR
                    </CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      ${Math.round(account.MRR).toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs text-muted-foreground mt-2">
                      Total Volume: $
                      {Math.round(account.volume).toLocaleString()}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
              <Card className="p-4 border border-purple-700 border-2">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm text-muted-foreground mb-1">
                    Combined MRR
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold ">
                    ${Math.round(data.totalMrr).toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs text-muted-foreground mt-2">
                    Total Volume: $
                    {Math.round(data.totalVolume).toLocaleString()}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
