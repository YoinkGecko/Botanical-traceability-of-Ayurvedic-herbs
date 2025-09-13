import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineStats = ({ activities, filters }) => {
  const calculateStats = () => {
    const total = activities?.length;
    const completed = activities?.filter(a => a?.details?.status === 'completed')?.length;
    const pending = activities?.filter(a => a?.details?.status === 'pending')?.length;
    const critical = activities?.filter(a => a?.priority === 'critical')?.length;
    const high = activities?.filter(a => a?.priority === 'high')?.length;
    
    const today = new Date();
    const todayActivities = activities?.filter(a => {
      const activityDate = new Date(a.timestamp);
      return activityDate?.toDateString() === today?.toDateString();
    })?.length;

    const last24h = activities?.filter(a => {
      const activityDate = new Date(a.timestamp);
      const diffInHours = (today - activityDate) / (1000 * 60 * 60);
      return diffInHours <= 24;
    })?.length;

    const avgProcessingTime = activities?.filter(a => a?.details?.processingTime)?.reduce((acc, a) => {
        const time = parseFloat(a?.details?.processingTime?.replace(/[^\d.]/g, ''));
        return acc + (isNaN(time) ? 0 : time);
      }, 0) / activities?.length;

    return {
      total,
      completed,
      pending,
      critical,
      high,
      todayActivities,
      last24h,
      avgProcessingTime: avgProcessingTime?.toFixed(1),
      completionRate: total > 0 ? ((completed / total) * 100)?.toFixed(1) : 0
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Activities',
      value: stats?.total,
      icon: 'Activity',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      change: `+${stats?.last24h} in 24h`
    },
    {
      title: 'Completed Today',
      value: stats?.todayActivities,
      icon: 'CheckCircle',
      color: 'text-green-600 bg-green-50 border-green-200',
      change: `${stats?.completionRate}% completion rate`
    },
    {
      title: 'Pending Actions',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      change: 'Requires attention'
    },
    {
      title: 'Critical Priority',
      value: stats?.critical,
      icon: 'AlertTriangle',
      color: 'text-red-600 bg-red-50 border-red-200',
      change: `${stats?.high} high priority`
    },
    {
      title: 'Avg Processing',
      value: `${stats?.avgProcessingTime}s`,
      icon: 'Zap',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      change: 'System performance'
    },
    {
      title: 'Success Rate',
      value: `${stats?.completionRate}%`,
      icon: 'TrendingUp',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      change: 'Quality metric'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
          <p className="text-sm text-gray-600">Real-time statistics and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="RefreshCw" size={14} />
          <span>Updated 2 minutes ago</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards?.map((stat, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${stat?.color}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat?.value}</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-700">{stat?.title}</h3>
              <p className="text-xs text-gray-500">{stat?.change}</p>
            </div>

            {/* Trend Indicator */}
            <div className="absolute top-2 right-2">
              {stat?.title?.includes('Critical') || stat?.title?.includes('Pending') ? (
                <div className="w-2 h-2 bg-red-400 rounded-full status-pulse"></div>
              ) : (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Active Filters Display */}
      {(filters?.type !== 'all' || filters?.priority !== 'all' || filters?.status !== 'all' || filters?.search) && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={14} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.type !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Type: {filters?.type?.replace('_', ' ')}
              </span>
            )}
            {filters?.priority !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Priority: {filters?.priority}
              </span>
            )}
            {filters?.status !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {filters?.status}
              </span>
            )}
            {filters?.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Search: "{filters?.search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineStats;