import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuditTimeline = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Activities', count: 156 },
    { id: 'audits', label: 'Audits', count: 45 },
    { id: 'violations', label: 'Violations', count: 23 },
    { id: 'corrections', label: 'Corrections', count: 67 },
    { id: 'approvals', label: 'Approvals', count: 21 }
  ];

  const timelineData = [
    {
      id: 1,
      type: 'audit',
      title: "Compliance Audit Completed",
      description: "Maharashtra Ayurveda practitioners - 342 institutions audited",
      timestamp: "2025-01-12T14:30:00",
      status: "completed",
      priority: "high",
      assignee: "Dr. Rajesh Kumar",
      location: "Maharashtra",
      category: "Ayurveda",
      findings: 12,
      violations: 3
    },
    {
      id: 2,
      type: 'violation',
      title: "Compliance Violation Detected",
      description: "Unauthorized practice detected in Karnataka - Immediate action required",
      timestamp: "2025-01-12T11:45:00",
      status: "pending",
      priority: "critical",
      assignee: "Compliance Officer - South",
      location: "Karnataka",
      category: "Yoga & Naturopathy",
      reportedBy: "Field Inspector",
      caseId: "CV-2025-001234"
    },
    {
      id: 3,
      type: 'correction',
      title: "Corrective Action Implemented",
      description: "Documentation updated for 45 Siddha practitioners in Tamil Nadu",
      timestamp: "2025-01-12T09:15:00",
      status: "completed",
      priority: "medium",
      assignee: "Regional Coordinator",
      location: "Tamil Nadu",
      category: "Siddha",
      practitionersAffected: 45
    },
    {
      id: 4,
      type: 'approval',
      title: "Certification Approved",
      description: "Batch certification for 128 new Homeopathy practitioners",
      timestamp: "2025-01-11T16:20:00",
      status: "completed",
      priority: "low",
      assignee: "Certification Board",
      location: "Gujarat",
      category: "Homeopathy",
      certificatesIssued: 128
    },
    {
      id: 5,
      type: 'audit',
      title: "Scheduled Audit Initiated",
      description: "Quarterly compliance review for Unani institutions in Delhi",
      timestamp: "2025-01-11T10:00:00",
      status: "in-progress",
      priority: "medium",
      assignee: "Senior Audit Officer",
      location: "Delhi",
      category: "Unani",
      institutionsScheduled: 67
    }
  ];

  const getTypeIcon = (type) => {
    const iconMap = {
      audit: 'FileCheck',
      violation: 'AlertTriangle',
      correction: 'CheckCircle',
      approval: 'Award'
    };
    return iconMap?.[type] || 'FileText';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      audit: 'text-primary bg-primary/10',
      violation: 'text-error bg-error/10',
      correction: 'text-success bg-success/10',
      approval: 'text-saffron bg-saffron/10'
    };
    return colorMap?.[type] || 'text-gray-500 bg-gray-100';
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      critical: { color: 'bg-error text-white', label: 'Critical' },
      high: { color: 'bg-warning text-white', label: 'High' },
      medium: { color: 'bg-primary text-white', label: 'Medium' },
      low: { color: 'bg-gray-500 text-white', label: 'Low' }
    };
    
    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Completed', icon: 'CheckCircle' },
      'in-progress': { color: 'bg-warning/10 text-warning', label: 'In Progress', icon: 'Clock' },
      pending: { color: 'bg-error/10 text-error', label: 'Pending', icon: 'AlertCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Audit Timeline</h2>
            <p className="text-sm text-gray-500">Recent compliance activities and audit findings</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => setSelectedFilter(filter?.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter?.id
                    ? 'bg-primary text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter?.label} ({filter?.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {timelineData?.map((item, index) => (
            <div key={item?.id} className="relative">
              {/* Timeline connector */}
              {index < timelineData?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <div className="flex space-x-4">
                {/* Timeline icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(item?.type)}`}>
                  <Icon name={getTypeIcon(item?.type)} size={20} />
                </div>
                
                {/* Timeline content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">{item?.title}</h3>
                        {getPriorityBadge(item?.priority)}
                        {getStatusBadge(item?.status)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{item?.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="User" size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-600">{item?.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="MapPin" size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-600">{item?.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Tag" size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-600">{item?.category}</span>
                        </div>
                      </div>
                      
                      {/* Additional details based on type */}
                      {item?.type === 'audit' && (
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{item?.findings} findings</span>
                          <span>{item?.violations} violations</span>
                        </div>
                      )}
                      
                      {item?.type === 'violation' && (
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Case ID: {item?.caseId}</span>
                          <span>Reported by: {item?.reportedBy}</span>
                        </div>
                      )}
                      
                      {item?.type === 'correction' && (
                        <div className="text-xs text-gray-500">
                          {item?.practitionersAffected} practitioners affected
                        </div>
                      )}
                      
                      {item?.type === 'approval' && (
                        <div className="text-xs text-gray-500">
                          {item?.certificatesIssued} certificates issued
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-xs text-gray-500">{formatTimestamp(item?.timestamp)}</span>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            Load More Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditTimeline;