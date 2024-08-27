import {
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MyChartProps {
  data: Array<{ month: string; combinedMRR: number }>;
}

export function MyChart({ data }: MyChartProps) {
  const formatYAxis = (value: number) =>
    `$${Math.round(value).toLocaleString()}`;
  const formatTooltip = (value: number) =>
    `$${Math.round(value).toLocaleString()}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle> MRR Distribution </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            combinedMRR: {
              label: "Combined MRR",
              color: "#7e22ce", // Purple-700 color
            },
          }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background p-2 shadow rounded">
                        <p className="font-semibold">
                          {payload[0].payload.month}
                        </p>
                        <p>{formatTooltip(payload[0].value as number)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="combinedMRR"
                stroke="#7e22ce" // Purple-700 color
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
