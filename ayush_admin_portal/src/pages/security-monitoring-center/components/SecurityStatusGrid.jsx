import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityStatusGrid = ({ securityMetrics }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'secure': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'maintenance': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'secure': return 'ShieldCheck';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      case 'maintenance': return 'Settings';
      default: return 'Shield';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {securityMetrics?.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg border ${getStatusColor(metric?.status)}`}>
              <Icon name={getStatusIcon(metric?.status)} size={20} />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric?.status)}`}>
              {metric?.status}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1">{metric?.component}</h3>
          <p className="text-sm text-gray-600 mb-3">{metric?.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Uptime</span>
              <span className="font-medium text-gray-900">{metric?.uptime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Check</span>
              <span className="font-medium text-gray-900">{metric?.lastCheck}</span>
            </div>
            {metric?.incidents > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Incidents (24h)</span>
                <span className="font-medium text-red-600">{metric?.incidents}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityStatusGrid;