import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserBehaviorAnalytics = ({ behaviorData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActivityIcon = (activity) => {
    switch (activity?.toLowerCase()) {
      case 'login': return 'LogIn';
      case 'data_access': return 'Database';
      case 'permission_change': return 'Settings';
      case 'export': return 'Download';
      case 'failed_login': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">User Behavior Analytics</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeframes?.map((timeframe) => (
              <Button
                key={timeframe?.value}
                variant={selectedTimeframe === timeframe?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe?.value)}
              >
                {timeframe?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Anomalous Activities */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Anomalous Activities</h3>
            
            <div className="space-y-3">
              {behaviorData?.anomalousActivities?.map((activity, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActivityIcon(activity?.type)} size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{activity?.user}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(activity?.risk)}`}>
                      {activity?.risk} Risk
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{activity?.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{activity?.timestamp}</span>
                    <span>IP: {activity?.ipAddress}</span>
                  </div>
                  
                  {activity?.actions && (
                    <div className="mt-2 flex space-x-2">
                      <Button variant="outline" size="xs">
                        Investigate
                      </Button>
                      <Button variant="outline" size="xs">
                        Block User
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Access Patterns */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Access Patterns</h3>
            
            <div className="space-y-3">
              {behaviorData?.accessPatterns?.map((pattern, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{pattern?.pattern}</span>
                    <span className="text-sm text-gray-600">{pattern?.frequency}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${pattern?.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{pattern?.percentage}% of total access</span>
                    <span>{pattern?.users} users</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Failed Login Attempts */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Failed Login Attempts</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">User</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">IP Address</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Attempts</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Last Attempt</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {behaviorData?.failedLogins?.map((login, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-900">{login?.user}</td>
                    <td className="py-2 px-3 font-mono text-gray-600">{login?.ipAddress}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        login?.attempts > 5 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {login?.attempts}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-500">{login?.lastAttempt}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        login?.blocked ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {login?.blocked ? 'Blocked' : 'Monitoring'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <Button variant="outline" size="xs">
                        {login?.blocked ? 'Unblock' : 'Block'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBehaviorAnalytics;