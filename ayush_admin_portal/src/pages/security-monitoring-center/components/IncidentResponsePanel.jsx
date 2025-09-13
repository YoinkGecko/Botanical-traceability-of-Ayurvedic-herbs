import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentResponsePanel = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-red-600 bg-red-50';
      case 'investigating': return 'text-yellow-600 bg-yellow-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'monitoring': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Active Security Incidents</h2>
          </div>
          <Button variant="outline" size="sm" iconName="Plus">
            Create Incident
          </Button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {incidents?.map((incident) => (
          <div key={incident?.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedIncident(incident)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident?.severity)}`}>
                    {incident?.severity}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident?.status)}`}>
                    {incident?.status}
                  </span>
                  <span className="text-xs text-gray-500">#{incident?.id}</span>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1">{incident?.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{incident?.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Reported: {incident?.reportedAt}</span>
                  <span>Assigned: {incident?.assignedTo}</span>
                  <span>ETA: {incident?.eta}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
                <Button variant="ghost" size="sm" iconName="MessageSquare">
                  {incident?.comments}
                </Button>
              </div>
            </div>
            
            {incident?.actions && incident?.actions?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {incident?.actions?.map((action, index) => (
                  <Button key={index} variant="outline" size="xs">
                    {action}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Incident Details</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedIncident(null)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Incident ID</label>
                  <p className="text-sm text-gray-900">#{selectedIncident?.id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <p className="text-sm text-gray-900">{selectedIncident?.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedIncident?.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Severity</label>
                    <p className={`text-sm font-medium ${getSeverityColor(selectedIncident?.severity)?.split(' ')?.[0]}`}>
                      {selectedIncident?.severity}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className={`text-sm font-medium ${getStatusColor(selectedIncident?.status)?.split(' ')?.[0]}`}>
                      {selectedIncident?.status}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reported At</label>
                    <p className="text-sm text-gray-900">{selectedIncident?.reportedAt}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Assigned To</label>
                    <p className="text-sm text-gray-900">{selectedIncident?.assignedTo}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setSelectedIncident(null)}>
                  Close
                </Button>
                <Button variant="default">
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentResponsePanel;