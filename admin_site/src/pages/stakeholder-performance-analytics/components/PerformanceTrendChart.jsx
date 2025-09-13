import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceTrendChart = ({ activeTab, timePeriod }) => {
  const generateChartData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
    ];

    return months?.map((month) => ({
      month,
      volume: Math.floor(Math.random() * 5000) + 2000,
      rate: Math.floor(Math.random() * 20) + 80,
      previousVolume: Math.floor(Math.random() * 4500) + 1800,
      previousRate: Math.floor(Math.random() * 18) + 75,
    }));
  };

  const chartData = generateChartData();

  const getChartConfig = (tab) => {
    const configs = {
      farmers: {
        volumeLabel: "Submissions",
        rateLabel: "Verification Rate (%)",
        volumeColor: "#22c55e",
        rateColor: "#3b82f6",
      },
      "lab-testers": {
        volumeLabel: "Tests Completed",
        rateLabel: "Accuracy Rate (%)",
        volumeColor: "#06b6d4",
        rateColor: "#8b5cf6",
      },
      processors: {
        volumeLabel: "Processing Volume",
        rateLabel: "Efficiency Rate (%)",
        volumeColor: "#f59e0b",
        rateColor: "#ef4444",
      },
      manufacturers: {
        volumeLabel: "Production Volume",
        rateLabel: "Compliance Rate (%)",
        volumeColor: "#8b5cf6",
        rateColor: "#10b981",
      },
    };

    return configs?.[tab] || configs?.farmers;
  };

  const config = getChartConfig(activeTab);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Performance Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Volume and rate metrics over time with period comparison
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config?.volumeColor }}
            ></div>
            <span className="text-muted-foreground">Current Period</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-muted-foreground">Previous Period</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis
              yAxisId="volume"
              orientation="left"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              yAxisId="rate"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />

            <Bar
              yAxisId="volume"
              dataKey="volume"
              name={config?.volumeLabel}
              fill={config?.volumeColor}
              opacity={0.8}
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="volume"
              dataKey="previousVolume"
              name={`Previous ${config?.volumeLabel}`}
              fill="#9ca3af"
              opacity={0.6}
              radius={[2, 2, 0, 0]}
            />

            <Line
              yAxisId="rate"
              type="monotone"
              dataKey="rate"
              name={config?.rateLabel}
              stroke={config?.rateColor}
              strokeWidth={3}
              dot={{ fill: config?.rateColor, strokeWidth: 2, r: 4 }}
            />
            <Line
              yAxisId="rate"
              type="monotone"
              dataKey="previousRate"
              name={`Previous ${config?.rateLabel}`}
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#9ca3af", strokeWidth: 2, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceTrendChart;
