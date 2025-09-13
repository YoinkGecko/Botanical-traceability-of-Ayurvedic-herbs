import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityReportsPanel = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const getReportTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'compliance': return 'text-blue-600 bg-blue-50';
      case 'incident': return 'text-red-600 bg-red-50';
      case 'audit': return 'text-purple-600 bg-purple-50';
      case 'vulnerability': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'compliance': return 'FileCheck';
      case 'incident': return 'AlertTriangle';
      case 'audit': return 'Search';
      case 'vulnerability': return 'Shield';
      default: return 'FileText';
    }
  };

  const filteredReports = filterType === 'all' 
    ? reports 
    : reports?.filter(report => report?.type?.toLowerCase() === filterType);

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'incident', label: 'Incident' },
    { value: 'audit', label: 'Audit' },
    { value: 'vulnerability', label: 'Vulnerability' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Security Reports</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reportTypes?.map((type) => (
                <option key={type?.value} value={type?.value}>{type?.label}</option>
              ))}
            </select>
            
            <Button variant="default" size="sm" iconName="Plus">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports?.map((report) => (
            <div key={report?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => setSelectedReport(report)}>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${getReportTypeColor(report?.type)}`}>
                  <Icon name={getReportIcon(report?.type)} size={16} />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report?.type)}`}>
                  {report?.type}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{report?.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report?.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Generated</span>
                  <span>{report?.generatedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Period</span>
                  <span>{report?.period}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size</span>
                  <span>{report?.size}</span>
                </div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <Button variant="outline" size="xs" iconName="Eye">
                  View
                </Button>
                <Button variant="outline" size="xs" iconName="Download">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
            <p className="text-gray-500">No security reports match the selected filter.</p>
          </div>
        )}
      </div>
      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getReportTypeColor(selectedReport?.type)}`}>
                    <Icon name={getReportIcon(selectedReport?.type)} size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedReport?.title}</h3>
                    <p className="text-sm text-gray-500">{selectedReport?.type} Report</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedReport(null)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Generated</label>
                  <p className="text-sm text-gray-900">{selectedReport?.generatedAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Period</label>
                  <p className="text-sm text-gray-900">{selectedReport?.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">File Size</label>
                  <p className="text-sm text-gray-900">{selectedReport?.size}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-900 mt-1">{selectedReport?.description}</p>
              </div>
              
              {selectedReport?.summary && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700">Executive Summary</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedReport?.summary}</p>
                  </div>
                </div>
              )}
              
              {selectedReport?.findings && selectedReport?.findings?.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700">Key Findings</label>
                  <div className="mt-2 space-y-2">
                    {selectedReport?.findings?.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Icon name="AlertCircle" size={16} className="text-yellow-600 mt-0.5" />
                        <span className="text-sm text-gray-900">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
                <Button variant="outline" iconName="Download">
                  Download PDF
                </Button>
                <Button variant="default" iconName="Share">
                  Share Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityReportsPanel;