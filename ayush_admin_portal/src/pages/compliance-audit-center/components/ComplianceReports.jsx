import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportTypes = [
    { id: 'all', label: 'All Reports', count: 45 },
    { id: 'compliance', label: 'Compliance', count: 18 },
    { id: 'audit', label: 'Audit', count: 12 },
    { id: 'violation', label: 'Violations', count: 8 },
    { id: 'regulatory', label: 'Regulatory', count: 7 }
  ];

  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'annual', label: 'Annual' }
  ];

  const reports = [
    {
      id: 1,
      title: "Monthly Compliance Summary",
      description: "Comprehensive compliance status across all AYUSH categories for December 2024",
      type: "compliance",
      period: "monthly",
      generatedDate: "2025-01-12T10:30:00",
      generatedBy: "System Automated",
      status: "ready",
      format: "PDF",
      size: "2.4 MB",
      downloads: 156,
      category: "All Categories",
      coverage: "National",
      pages: 45,
      charts: 12
    },
    {
      id: 2,
      title: "Quarterly Audit Report - Q4 2024",
      description: "Detailed audit findings and recommendations for Q4 2024 across southern states",
      type: "audit",
      period: "quarterly",
      generatedDate: "2025-01-10T14:15:00",
      generatedBy: "Senior Audit Officer",
      status: "ready",
      format: "PDF",
      size: "5.8 MB",
      downloads: 89,
      category: "Multi-category",
      coverage: "Southern States",
      pages: 78,
      charts: 24
    },
    {
      id: 3,
      title: "Violation Analysis Report",
      description: "Analysis of compliance violations and corrective actions taken in January 2025",
      type: "violation",
      period: "monthly",
      generatedDate: "2025-01-11T16:45:00",
      generatedBy: "Compliance Team",
      status: "processing",
      format: "PDF",
      size: "1.2 MB",
      downloads: 34,
      category: "All Categories",
      coverage: "National",
      pages: 28,
      charts: 8
    },
    {
      id: 4,
      title: "Regulatory Update Impact Assessment",
      description: "Impact analysis of recent AYUSH policy changes on practitioner compliance",
      type: "regulatory",
      period: "quarterly",
      generatedDate: "2025-01-09T11:20:00",
      generatedBy: "Policy Analysis Team",
      status: "ready",
      format: "PDF",
      size: "3.1 MB",
      downloads: 67,
      category: "Policy Impact",
      coverage: "National",
      pages: 52,
      charts: 16
    },
    {
      id: 5,
      title: "State-wise Compliance Dashboard",
      description: "Interactive dashboard report showing compliance metrics by state and category",
      type: "compliance",
      period: "weekly",
      generatedDate: "2025-01-12T08:00:00",
      generatedBy: "Data Analytics Team",
      status: "ready",
      format: "Interactive",
      size: "N/A",
      downloads: 203,
      category: "All Categories",
      coverage: "National",
      pages: 0,
      charts: 35
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      ready: { color: 'bg-success/10 text-success', label: 'Ready', icon: 'CheckCircle' },
      processing: { color: 'bg-warning/10 text-warning', label: 'Processing', icon: 'Clock' },
      failed: { color: 'bg-error/10 text-error', label: 'Failed', icon: 'AlertCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.ready;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      compliance: 'Shield',
      audit: 'FileCheck',
      violation: 'AlertTriangle',
      regulatory: 'FileText'
    };
    return iconMap?.[type] || 'FileText';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      compliance: 'text-primary bg-primary/10',
      audit: 'text-success bg-success/10',
      violation: 'text-error bg-error/10',
      regulatory: 'text-saffron bg-saffron/10'
    };
    return colorMap?.[type] || 'text-gray-500 bg-gray-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickReports = [
    { id: 1, title: 'Generate Compliance Summary', icon: 'Shield', description: 'Current month overview' },
    { id: 2, title: 'Export Violation Data', icon: 'AlertTriangle', description: 'Last 30 days' },
    { id: 3, title: 'Audit Schedule Report', icon: 'Calendar', description: 'Upcoming audits' },
    { id: 4, title: 'Practitioner Status', icon: 'Users', description: 'Active/Inactive summary' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Report Generation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickReports?.map((report) => (
            <button
              key={report?.id}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={report?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{report?.title}</h3>
                <p className="text-xs text-gray-500">{report?.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Reports List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
              <p className="text-sm text-gray-500">Download and manage compliance reports</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e?.target?.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {reportTypes?.map((type) => (
                  <option key={type?.id} value={type?.id}>
                    {type?.label} ({type?.count})
                  </option>
                ))}
              </select>
              
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e?.target?.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {periods?.map((period) => (
                  <option key={period?.id} value={period?.id}>
                    {period?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {reports?.map((report) => (
            <div key={report?.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getTypeColor(report?.type)}`}>
                  <Icon name={getTypeIcon(report?.type)} size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">{report?.title}</h3>
                        {getStatusBadge(report?.status)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{report?.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-gray-500">Generated</span>
                          <p className="text-xs font-medium text-gray-900">{formatDate(report?.generatedDate)}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">By</span>
                          <p className="text-xs font-medium text-gray-900">{report?.generatedBy}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Coverage</span>
                          <p className="text-xs font-medium text-gray-900">{report?.coverage}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Category</span>
                          <p className="text-xs font-medium text-gray-900">{report?.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Icon name="FileText" size={12} />
                          <span>{report?.format}</span>
                        </div>
                        {report?.size !== 'N/A' && (
                          <div className="flex items-center space-x-1">
                            <Icon name="HardDrive" size={12} />
                            <span>{report?.size}</span>
                          </div>
                        )}
                        {report?.pages > 0 && (
                          <div className="flex items-center space-x-1">
                            <Icon name="BookOpen" size={12} />
                            <span>{report?.pages} pages</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Icon name="BarChart3" size={12} />
                          <span>{report?.charts} charts</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Download" size={12} />
                          <span>{report?.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {report?.status === 'ready' && (
                        <>
                          <button className="p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors">
                            <Icon name="Download" size={16} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Icon name="Share" size={16} />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t border-gray-100 text-center">
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            Load More Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;