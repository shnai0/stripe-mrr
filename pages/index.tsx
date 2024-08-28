"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
import { MyChart } from "@/components/ui/charts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface DashboardProps {
  data?: {
    mrrData: Array<{ name: string; MRR: number; volume: number }>;
    totalMrr: number;
    totalVolume: number;
    mrrHistory: Array<{ month: string; combinedMRR: number }>;
    volumeHistory: Array<{ month: string; totalVolume: number }>;
  };
  error?: string;
}

const Home: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<
    DashboardProps["data"] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch dashboard data: ${errorData.error} - ${errorData.details}`
          );
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err: unknown) {
        console.error("Error fetching dashboard data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col space-y-4 p-4">
          {/* <h1 className="text-2xl font-bold">
            Stripe MRR Dashboard (Combined 2 accounts)
          </h1> */}

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 ">
            <div className="w-full lg:w-2/3 space-y-4 mb-20 sm:mb-0">
              <div className="h-[300px]">
                <MyChart data={dashboardData.mrrHistory} />
              </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-4 ">
              {dashboardData.mrrData.map((account, index) => (
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
                    ${Math.round(dashboardData.totalMrr).toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs text-muted-foreground mt-2">
                    Total Volume: $
                    {Math.round(dashboardData.totalVolume).toLocaleString()}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
