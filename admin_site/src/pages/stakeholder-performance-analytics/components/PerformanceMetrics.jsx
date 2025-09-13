import React from "react";
import Icon from "../../../components/AppIcon";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const PerformanceMetrics = ({ activeTab }) => {
  const generateSparklineData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 100) + 50,
    }));
  };

  const getMetricsForTab = (tab) => {
    const baseMetrics = {
      farmers: [
        {
          title: "Total Submissions",
          value: "12,847",
          change: "+8.2%",
          trend: "up",
          icon: "Upload",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Verification Rate",
          value: "94.3%",
          change: "+2.1%",
          trend: "up",
          icon: "CheckCircle",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Avg Response Time",
          value: "2.4 hrs",
          change: "-12%",
          trend: "down",
          icon: "Clock",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Quality Score",
          value: "8.7/10",
          change: "+0.3",
          trend: "up",
          icon: "Star",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ],
      "lab-testers": [
        {
          title: "Tests Completed",
          value: "8,934",
          change: "+12.5%",
          trend: "up",
          icon: "FlaskConical",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Accuracy Rate",
          value: "98.7%",
          change: "+1.2%",
          trend: "up",
          icon: "Target",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Turnaround Time",
          value: "4.2 hrs",
          change: "-8%",
          trend: "down",
          icon: "Timer",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Workload Score",
          value: "7.8/10",
          change: "+0.5",
          trend: "up",
          icon: "Activity",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ],
      processors: [
        {
          title: "Processing Volume",
          value: "45,678 kg",
          change: "+15.3%",
          trend: "up",
          icon: "Factory",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Efficiency Rate",
          value: "92.1%",
          change: "+3.4%",
          trend: "up",
          icon: "Gauge",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Processing Time",
          value: "6.8 hrs",
          change: "-5%",
          trend: "down",
          icon: "Clock",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Quality Control",
          value: "9.2/10",
          change: "+0.7",
          trend: "up",
          icon: "Shield",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ],
      manufacturers: [
        {
          title: "Production Volume",
          value: "234,567 units",
          change: "+18.7%",
          trend: "up",
          icon: "Package",
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Compliance Rate",
          value: "96.8%",
          change: "+2.3%",
          trend: "up",
          icon: "CheckSquare",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Lead Time",
          value: "12.3 days",
          change: "-7%",
          trend: "down",
          icon: "Calendar",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Performance Score",
          value: "8.9/10",
          change: "+0.4",
          trend: "up",
          icon: "TrendingUp",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
      ],
    };

    return baseMetrics?.[tab] || baseMetrics?.farmers;
  };

  const metrics = getMetricsForTab(activeTab);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className="h-12 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateSparklineData()}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={metric?.trend === "up" ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric?.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">
                {metric?.value}
              </span>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  metric?.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <Icon
                  name={metric?.trend === "up" ? "TrendingUp" : "TrendingDown"}
                  size={16}
                />
                <span>{metric?.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
