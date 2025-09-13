import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Administrators',
      value: stats?.totalUsers,
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary',
      description: 'Active system users'
    },
    {
      title: 'Active Sessions',
      value: stats?.activeSessions,
      change: '+5',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success',
      description: 'Currently logged in'
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals,
      change: '-3',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'warning',
      description: 'Awaiting activation'
    },
    {
      title: 'Security Alerts',
      value: stats?.securityAlerts,
      change: '0',
      changeType: 'neutral',
      icon: 'Shield',
      color: 'error',
      description: 'Requires attention'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/20'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          border: 'border-success/20'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          border: 'border-error/20'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-success';
      case 'decrease': return 'text-error';
      default: return 'text-gray-500';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards?.map((card, index) => {
        const colors = getColorClasses(card?.color);
        
        return (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${colors?.bg} ${colors?.border} border flex items-center justify-center`}>
                <Icon name={card?.icon} size={24} className={colors?.text} />
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getChangeIcon(card?.changeType)} 
                  size={16} 
                  className={getChangeColor(card?.changeType)} 
                />
                <span className={`text-sm font-medium ${getChangeColor(card?.changeType)}`}>
                  {card?.change}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card?.value}</h3>
              <p className="text-sm font-medium text-gray-600 mb-1">{card?.title}</p>
              <p className="text-xs text-gray-500">{card?.description}</p>
            </div>
            {/* Progress indicator for some cards */}
            {card?.color === 'warning' && card?.value > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-warning h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((card?.value / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {card?.value > 5 ? 'High priority' : 'Normal queue'}
                </p>
              </div>
            )}
            {card?.color === 'error' && card?.value > 0 && (
              <div className="mt-4 p-2 bg-error/10 border border-error/20 rounded-md">
                <p className="text-xs text-error font-medium">Immediate attention required</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;