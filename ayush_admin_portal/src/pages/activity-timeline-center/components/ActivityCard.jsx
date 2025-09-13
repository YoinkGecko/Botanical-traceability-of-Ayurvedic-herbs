import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityCard = ({ activity, isExpanded, onToggle }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'practitioner_registration': 'UserPlus',
      'compliance_update': 'FileCheck',
      'system_modification': 'Settings',
      'emergency_intervention': 'AlertTriangle',
      'audit_action': 'Search',
      'policy_update': 'FileText',
      'security_alert': 'Shield',
      'data_export': 'Download',
      'user_management': 'Users',
      'blockchain_transaction': 'Link'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type, priority) => {
    if (priority === 'critical') return 'text-red-600 bg-red-50 border-red-200';
    if (priority === 'high') return 'text-orange-600 bg-orange-50 border-orange-200';
    
    const colorMap = {
      'practitioner_registration': 'text-blue-600 bg-blue-50 border-blue-200',
      'compliance_update': 'text-green-600 bg-green-50 border-green-200',
      'system_modification': 'text-purple-600 bg-purple-50 border-purple-200',
      'emergency_intervention': 'text-red-600 bg-red-50 border-red-200',
      'audit_action': 'text-indigo-600 bg-indigo-50 border-indigo-200',
      'policy_update': 'text-amber-600 bg-amber-50 border-amber-200',
      'security_alert': 'text-red-600 bg-red-50 border-red-200',
      'data_export': 'text-gray-600 bg-gray-50 border-gray-200',
      'user_management': 'text-teal-600 bg-teal-50 border-teal-200',
      'blockchain_transaction': 'text-cyan-600 bg-cyan-50 border-cyan-200'
    };
    return colorMap?.[type] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
      {/* Activity Card */}
      <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ml-14">
        {/* Timeline Icon */}
        <div className={`absolute -left-8 top-4 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity?.type, activity?.priority)}`}>
          <Icon name={getActivityIcon(activity?.type)} size={20} />
        </div>

        {/* Card Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">{activity?.title}</h3>
                {activity?.priority === 'critical' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Critical
                  </span>
                )}
                {activity?.priority === 'high' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    High Priority
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{activity?.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{activity?.administrator}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{formatTimestamp(activity?.timestamp)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{activity?.location}</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggle(activity?.id)}
              className="ml-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-gray-400"
              />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Impact Assessment
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Records Affected:</span>
                    <span className="font-medium text-gray-900">{activity?.details?.recordsAffected}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium text-gray-900">{activity?.details?.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      activity?.details?.status === 'completed' ? 'text-green-600' :
                      activity?.details?.status === 'pending'? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {activity?.details?.status?.charAt(0)?.toUpperCase() + activity?.details?.status?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Technical Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-xs text-gray-900">{activity?.details?.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Block Height:</span>
                    <span className="font-mono text-xs text-gray-900">{activity?.details?.blockHeight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gas Used:</span>
                    <span className="font-mono text-xs text-gray-900">{activity?.details?.gasUsed}</span>
                  </div>
                </div>
              </div>
            </div>

            {activity?.details?.notes && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Additional Notes
                </h4>
                <p className="text-sm text-gray-600 bg-white p-3 rounded-md border">
                  {activity?.details?.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700">
                  <Icon name="ExternalLink" size={12} />
                  <span>View in Blockchain Explorer</span>
                </button>
                <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-700">
                  <Icon name="Download" size={12} />
                  <span>Export Details</span>
                </button>
              </div>
              
              {activity?.details?.relatedActivities && (
                <span className="text-xs text-gray-500">
                  {activity?.details?.relatedActivities} related activities
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;