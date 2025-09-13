import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const StatisticalView = ({ activities }) => {
  // Process data for charts
  const processActivityData = () => {
    const activityTypes = {};
    const dailyActivity = {};
    const priorityDistribution = {};
    const statusDistribution = {};
    const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 }));

    activities?.forEach(activity => {
      // Activity types
      const type = activity?.type?.replace('_', ' ');
      activityTypes[type] = (activityTypes?.[type] || 0) + 1;

      // Daily activity
      const date = new Date(activity.timestamp)?.toLocaleDateString('en-IN');
      dailyActivity[date] = (dailyActivity?.[date] || 0) + 1;

      // Priority distribution
      priorityDistribution[activity.priority] = (priorityDistribution?.[activity?.priority] || 0) + 1;

      // Status distribution
      statusDistribution[activity.details.status] = (statusDistribution?.[activity?.details?.status] || 0) + 1;

      // Hourly activity
      const hour = new Date(activity.timestamp)?.getHours();
      hourlyActivity[hour].count += 1;
    });

    return {
      activityTypes: Object.entries(activityTypes)?.map(([name, value]) => ({ name, value })),
      dailyActivity: Object.entries(dailyActivity)?.map(([date, count]) => ({ date, count })),
      priorityDistribution: Object.entries(priorityDistribution)?.map(([name, value]) => ({ name, value })),
      statusDistribution: Object.entries(statusDistribution)?.map(([name, value]) => ({ name, value })),
      hourlyActivity
    };
  };

  const chartData = processActivityData();

  const COLORS = ['#1E3A8A', '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`${label}: ${payload?.[0]?.value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities?.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {((activities?.filter(a => a?.details?.status === 'completed')?.length / activities?.length) * 100)?.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-red-600">
                {activities?.filter(a => a?.priority === 'critical')?.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-purple-600">2.3s</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Types Bar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Activity Types Distribution</h3>
            <Icon name="BarChart3" size={20} className="text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData?.activityTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution Pie Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
            <Icon name="PieChart" size={20} className="text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData?.priorityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData?.priorityDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Activity Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Activity Trend</h3>
            <Icon name="TrendingUp" size={20} className="text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData?.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Activity Pattern */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Activity Pattern</h3>
            <Icon name="Clock" size={20} className="text-gray-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData?.hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}:00`}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => `${value}:00`}
                  content={<CustomTooltip />}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Status Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Status Overview</h3>
          <Icon name="CheckSquare" size={20} className="text-gray-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData?.statusDistribution?.map((status, index) => (
            <div key={status?.name} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-1" style={{ color: COLORS?.[index % COLORS?.length] }}>
                {status?.value}
              </div>
              <div className="text-sm font-medium text-gray-600 capitalize">
                {status?.name?.replace('_', ' ')}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((status?.value / activities?.length) * 100)?.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticalView;