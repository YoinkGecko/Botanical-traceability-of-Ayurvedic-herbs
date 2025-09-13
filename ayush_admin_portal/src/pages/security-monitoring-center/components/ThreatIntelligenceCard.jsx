import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatIntelligenceCard = ({ threat }) => {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'Shield';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg border ${getSeverityColor(threat?.severity)}`}>
            <Icon name={getSeverityIcon(threat?.severity)} size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{threat?.type}</h3>
            <p className="text-sm text-gray-500">{threat?.source}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat?.severity)}`}>
          {threat?.severity}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{threat?.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Detected: {threat?.detectedAt}</span>
        <span>Count: {threat?.count}</span>
      </div>
      {threat?.blocked && (
        <div className="mt-2 flex items-center space-x-1 text-xs text-green-600">
          <Icon name="Shield" size={12} />
          <span>Automatically blocked</span>
        </div>
      )}
    </div>
  );
};

export default ThreatIntelligenceCard;