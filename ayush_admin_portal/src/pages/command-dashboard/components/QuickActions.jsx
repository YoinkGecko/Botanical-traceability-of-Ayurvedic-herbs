import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const emergencyProtocols = [
    {
      id: 1,
      title: 'Security Lockdown',
      description: 'Immediately suspend all transactions',
      icon: 'Shield',
      color: 'red',
      urgent: true
    },
    {
      id: 2,
      title: 'System Maintenance',
      description: 'Schedule maintenance window',
      icon: 'Settings',
      color: 'blue',
      urgent: false
    },
    {
      id: 3,
      title: 'Bulk Notification',
      description: 'Send alert to all administrators',
      icon: 'Bell',
      color: 'amber',
      urgent: false
    }
  ];

  const quickTasks = [
    {
      id: 1,
      title: 'Create New Admin',
      description: 'Add district administrator',
      icon: 'UserPlus',
      route: '/admin-management-center',
      count: null
    },
    {
      id: 2,
      title: 'Review Pending',
      description: 'Approve registrations',
      icon: 'Clock',
      route: '/activity-timeline-center',
      count: 23
    },
    {
      id: 3,
      title: 'Security Audit',
      description: 'Run security check',
      icon: 'ShieldCheck',
      route: '/security-monitoring-center',
      count: null
    },
    {
      id: 4,
      title: 'Export Reports',
      description: 'Generate compliance reports',
      icon: 'Download',
      route: '/compliance-audit-center',
      count: null
    }
  ];

  const getColorClasses = (color, urgent = false) => {
    if (urgent) {
      return 'bg-red-500 hover:bg-red-600 text-white border-red-500';
    }
    
    const colors = {
      red: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
      blue: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
      amber: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200',
      green: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Protocols */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Protocols</h3>
            <p className="text-sm text-gray-500">Critical system controls</p>
          </div>
        </div>

        <div className="space-y-3">
          {emergencyProtocols?.map((protocol) => (
            <button
              key={protocol?.id}
              className={`w-full p-4 rounded-lg border transition-colors text-left ${getColorClasses(protocol?.color, protocol?.urgent)}`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={protocol?.icon} size={20} />
                <div className="flex-1">
                  <h4 className="font-medium">{protocol?.title}</h4>
                  <p className="text-sm opacity-80">{protocol?.description}</p>
                </div>
                {protocol?.urgent && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full status-pulse"></div>
                    <span className="text-xs font-medium">URGENT</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Quick Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon name="Zap" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500">Frequently used tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickTasks?.map((task) => (
            <a
              key={task?.id}
              href={task?.route}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 group-hover:bg-primary/10 rounded-lg transition-colors">
                  <Icon name={task?.icon} size={18} className="text-gray-600 group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary truncate">
                      {task?.title}
                    </h4>
                    {task?.count && (
                      <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        {task?.count}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{task?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* System Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Icon name="Activity" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <p className="text-sm text-gray-500">Real-time monitoring</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full status-pulse"></div>
              <span className="text-sm font-medium text-green-800">All Systems Operational</span>
            </div>
            <span className="text-xs text-green-600 font-mono">99.9% Uptime</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users:</span>
              <span className="font-mono text-gray-900">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transactions/min:</span>
              <span className="font-mono text-gray-900">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Response Time:</span>
              <span className="font-mono text-gray-900">120ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Backup:</span>
              <span className="font-mono text-gray-900">2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;