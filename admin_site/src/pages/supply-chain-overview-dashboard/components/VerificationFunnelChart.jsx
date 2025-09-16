import React from "react";
import {
  FunnelChart,
  Funnel,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";

const VerificationFunnelChart = ({ data }) => {
  const COLORS = ["#2D5016", "#8B4513", "#FF8C00", "#228B22", "#DAA520"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            Count:{" "}
            <span className="font-medium text-foreground">
              {data?.value?.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Rate:{" "}
            <span className="font-medium text-foreground">{data?.rate}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
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
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              dataKey="value"
              data={data}
              isAnimationActive={true}
              animationDuration={800}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS?.[index % COLORS?.length]}
                />
              ))}
              <LabelList
                position="center"
                fill="#fff"
                stroke="none"
                fontSize={14}
                fontWeight="600"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {data?.map((stage, index) => (
          <div key={stage?.name} className="text-center">
            <div
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
            ></div>
            <p className="text-xs font-medium text-foreground">{stage?.name}</p>
            <p className="text-xs text-muted-foreground">{stage?.rate}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationFunnelChart;
