import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = () => {
  const registrationData = [
    { month: 'Jan', registrations: 1200, renewals: 800, compliance: 950 },
    { month: 'Feb', registrations: 1400, renewals: 900, compliance: 1100 },
    { month: 'Mar', registrations: 1600, renewals: 1200, compliance: 1300 },
    { month: 'Apr', registrations: 1800, renewals: 1100, compliance: 1400 },
    { month: 'May', registrations: 2200, renewals: 1400, compliance: 1600 },
    { month: 'Jun', registrations: 2000, renewals: 1300, compliance: 1500 },
    { month: 'Jul', registrations: 2400, renewals: 1600, compliance: 1800 },
    { month: 'Aug', registrations: 2600, renewals: 1800, compliance: 2000 },
    { month: 'Sep', registrations: 2800, renewals: 2000, compliance: 2200 }
  ];

  const processingTimeData = [
    { day: 'Mon', avgTime: 4.2 },
    { day: 'Tue', avgTime: 3.8 },
    { day: 'Wed', avgTime: 4.5 },
    { day: 'Thu', avgTime: 3.2 },
    { day: 'Fri', avgTime: 2.9 },
    { day: 'Sat', avgTime: 3.1 },
    { day: 'Sun', avgTime: 2.7 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const TimeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-sm text-blue-600">
            Avg Time: {payload?.[0]?.value} hours
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
            <p className="text-sm text-gray-500">Registration trends and processing efficiency</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-white">
            <option>Last 9 Months</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trends */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Monthly Registration Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="registrations" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="renewals" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="compliance" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600">Registrations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Renewals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-xs text-gray-600">Compliance</span>
            </div>
          </div>
        </div>

        {/* Processing Time Trends */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Average Processing Time (Hours)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                />
                <Tooltip content={<TimeTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingDown" size={16} className="text-green-600" />
              <span className="text-sm text-gray-700">
                Processing time improved by <span className="font-semibold text-green-600">35%</span> this week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;