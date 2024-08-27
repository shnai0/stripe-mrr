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
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Stripe MRR Dashboard (2 accounts)</h1>

      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-3 gap-4">
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
                  Total Volume: ${Math.round(account.volume).toLocaleString()}
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
                Total Volume: ${Math.round(data.totalVolume).toLocaleString()}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="w-full max-w-6xl h-[200px]">
          {" "}
          <MyChart data={data.mrrHistory} />
        </div>
      </div>
    </div>
  );
};

export default Home;
