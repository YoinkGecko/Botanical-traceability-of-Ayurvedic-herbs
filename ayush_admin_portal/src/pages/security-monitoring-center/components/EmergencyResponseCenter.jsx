import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyResponseCenter = ({ emergencyData }) => {
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [systemLockdown, setSystemLockdown] = useState(false);

  const getAlertLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleEmergencyAction = (action) => {
    if (action === 'lockdown') {
      setSystemLockdown(!systemLockdown);
    }
    // Handle other emergency actions
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Emergency Response Center</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              systemLockdown ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {systemLockdown ? 'System Locked' : 'System Active'}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Protocols */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Emergency Protocols</h3>
            
            <div className="space-y-3">
              {emergencyData?.protocols?.map((protocol, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-blue-600" />
                      <span className="font-medium text-gray-900">{protocol?.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertLevelColor(protocol?.severity)}`}>
                      {protocol?.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{protocol?.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-3">
                    <div>Trigger: {protocol?.trigger}</div>
                    <div>Response Time: {protocol?.responseTime}</div>
                    <div>Stakeholders: {protocol?.stakeholders}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant={activeProtocol === protocol?.id ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveProtocol(activeProtocol === protocol?.id ? null : protocol?.id)}
                    >
                      {activeProtocol === protocol?.id ? 'Active' : 'Activate'}
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Quick Actions</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {emergencyData?.quickActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyAction(action?.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    action?.id === 'lockdown' && systemLockdown
                      ? 'border-red-200 bg-red-50' :'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={action?.icon} size={16} className={action?.critical ? 'text-red-600' : 'text-gray-600'} />
                      <span className="font-medium text-gray-900">{action?.name}</span>
                    </div>
                    {action?.critical && (
                      <span className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                        Critical
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{action?.description}</p>
                  {action?.id === 'lockdown' && systemLockdown && (
                    <div className="mt-2 text-xs text-red-600 font-medium">
                      System lockdown is currently active
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Active Security Alerts</h3>
          
          <div className="space-y-3">
            {emergencyData?.activeAlerts?.map((alert, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getAlertLevelColor(alert?.level)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={16} />
                      <span className="font-medium">{alert?.title}</span>
                      <span className="text-xs opacity-75">{alert?.timestamp}</span>
                    </div>
                    <p className="text-sm opacity-90 mb-2">{alert?.description}</p>
                    <div className="text-xs opacity-75">
                      Source: {alert?.source} | Affected Systems: {alert?.affectedSystems}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Center */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Emergency Communication</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" iconName="Phone" className="justify-start">
              Call Emergency Team
            </Button>
            <Button variant="outline" iconName="MessageSquare" className="justify-start">
              Send Alert Broadcast
            </Button>
            <Button variant="outline" iconName="Users" className="justify-start">
              Notify Stakeholders
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Radio" size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-900">Emergency Hotline Active</span>
            </div>
            <p className="text-xs text-gray-600">
              24/7 emergency response team available at +91-11-2345-6789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponseCenter;