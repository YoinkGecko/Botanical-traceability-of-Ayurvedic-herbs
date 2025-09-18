import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const VerificationFunnelChart = ({ data }) => {
  const COLORS = ["#2D5016", "#8B4513", "#FF8C00", "#228B22", "#DAA520"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground">{d?.name}</p>
          <p className="text-sm text-muted-foreground">
            Count:{" "}
            <span className="font-medium text-foreground">
              {d?.value?.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Rate:{" "}
            <span className="font-medium text-foreground">{d?.rate}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Verification Workflow
          </h3>
          <p className="text-sm text-muted-foreground">
            Current pipeline status and bottleneck analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-caption text-success">Live Data</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
            barCategoryGap="20%"
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 13, fill: "#666" }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
              animationDuration={800}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                style={{ fill: "#111", fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        {data?.map((stage, index) => (
          <div
            key={stage?.name}
            className="flex items-center space-x-2 text-sm"
          >
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-foreground font-medium">{stage?.name}</span>
            <span className="text-muted-foreground">({stage?.rate}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationFunnelChart;
