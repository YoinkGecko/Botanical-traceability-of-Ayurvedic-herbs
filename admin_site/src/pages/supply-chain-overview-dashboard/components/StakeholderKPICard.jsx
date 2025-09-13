import React from 'react';
import Icon from '../../../components/AppIcon';

const StakeholderKPICard = ({ 
  title, 
  count, 
  trend, 
  trendPercentage, 
  icon, 
  iconColor,
  bgColor 
}) => {
  const isPositiveTrend = trend === 'up';
  const trendIcon = isPositiveTrend ? 'TrendingUp' : 'TrendingDown';
  const trendColor = isPositiveTrend ? 'text-success' : 'text-error';

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-modal transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center justify-center w-12 h-12 ${bgColor} rounded-lg`}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        <div className={`flex items-center space-x-1 ${trendColor}`}>
          <Icon name={trendIcon} size={16} />
          <span className="text-sm font-medium">{trendPercentage}%</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-heading font-bold text-foreground">
          {count?.toLocaleString()}
        </h3>
        <p className="text-sm font-caption text-muted-foreground">{title}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">vs last month</span>
          <span className={`font-medium ${trendColor}`}>
            {isPositiveTrend ? '+' : ''}{trendPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default StakeholderKPICard;