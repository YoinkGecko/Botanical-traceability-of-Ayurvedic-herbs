import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceOverview = () => {
  const overviewStats = [
    {
      id: 1,
      title: "Overall Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: "Shield",
      color: "success",
      description: "Across all AYUSH categories"
    },
    {
      id: 2,
      title: "Active Practitioners",
      value: "1,24,567",
      change: "+1,234",
      trend: "up",
      icon: "Users",
      color: "primary",
      description: "Certified practitioners nationwide"
    },
    {
      id: 3,
      title: "Pending Audits",
      value: "342",
      change: "-23",
      trend: "down",
      icon: "FileCheck",
      color: "warning",
      description: "Requiring immediate attention"
    },
    {
      id: 4,
      title: "Risk Alerts",
      value: "18",
      change: "+5",
      trend: "up",
      icon: "AlertTriangle",
      color: "error",
      description: "High-priority compliance issues"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: "bg-success/10 text-success border-success/20",
      primary: "bg-primary/10 text-primary border-primary/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      error: "bg-error/10 text-error border-error/20"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewStats?.map((stat) => (
        <div key={stat?.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${getColorClasses(stat?.color)}`}>
                  <Icon name={stat?.icon} size={20} />
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTrendIcon(stat?.trend)} 
                    size={16} 
                    className={getTrendColor(stat?.trend)}
                  />
                  <span className={`text-sm font-medium ${getTrendColor(stat?.trend)}`}>
                    {stat?.change}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{stat?.value}</h3>
                <p className="text-sm font-medium text-gray-700">{stat?.title}</p>
                <p className="text-xs text-gray-500">{stat?.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceOverview;