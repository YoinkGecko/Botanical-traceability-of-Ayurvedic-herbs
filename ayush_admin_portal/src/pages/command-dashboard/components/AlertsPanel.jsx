import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Security Breach Detected',
      message: 'Unusual login activity detected from IP 192.168.1.100 in Maharashtra region',
      timestamp: new Date(Date.now() - 180000),
      action: 'Investigate',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Transaction Volume',
      message: 'Gujarat district showing 300% increase in registrations today',
      timestamp: new Date(Date.now() - 900000),
      action: 'Review',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Blockchain node maintenance scheduled for tonight 2:00 AM - 4:00 AM',
      timestamp: new Date(Date.now() - 1800000),
      action: 'Acknowledge',
      unread: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Compliance Audit Completed',
      message: 'Karnataka region passed quarterly compliance audit with 98% score',
      timestamp: new Date(Date.now() - 3600000),
      action: 'View Report',
      unread: false
    }
  ];

  const getAlertIcon = (type) => {
    const icons = {
      critical: 'AlertTriangle',
      warning: 'AlertCircle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getAlertColor = (type) => {
    const colors = {
      critical: 'text-red-600 bg-red-50 border-red-200',
      warning: 'text-amber-600 bg-amber-50 border-amber-200',
      info: 'text-blue-600 bg-blue-50 border-blue-200',
      success: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
            <p className="text-sm text-gray-500">Requires immediate attention</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            {alerts?.filter(alert => alert?.unread)?.length} New
          </span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div 
            key={alert?.id} 
            className={`p-4 rounded-lg border transition-colors ${
              alert?.unread ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getAlertColor(alert?.type)}`}>
                <Icon name={getAlertIcon(alert?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900">{alert?.title}</h4>
                  {alert?.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{alert?.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{formatTime(alert?.timestamp)}</span>
                  <Button 
                    variant={alert?.type === 'critical' ? 'destructive' : 'outline'} 
                    size="xs"
                  >
                    {alert?.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Icon name="Eye" size={16} className="mr-2" />
          Mark All Read
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Icon name="Settings" size={16} className="mr-2" />
          Alert Settings
        </Button>
      </div>
    </div>
  );
};

export default AlertsPanel;