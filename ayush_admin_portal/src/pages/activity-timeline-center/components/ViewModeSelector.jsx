import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewModeSelector = ({ currentView, onViewChange, onExport }) => {
  const viewModes = [
    {
      id: 'detailed',
      label: 'Detailed View',
      icon: 'List',
      description: 'Complete activity information with expandable details'
    },
    {
      id: 'summary',
      label: 'Summary View',
      icon: 'LayoutList',
      description: 'Condensed view for quick overview'
    },
    {
      id: 'statistical',
      label: 'Statistical View',
      icon: 'BarChart3',
      description: 'Charts and graphs for trend analysis'
    }
  ];

  const exportOptions = [
    { id: 'pdf', label: 'Export PDF', icon: 'FileText' },
    { id: 'excel', label: 'Export Excel', icon: 'FileSpreadsheet' },
    { id: 'csv', label: 'Export CSV', icon: 'Download' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* View Mode Selector */}
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-700 mr-3">View Mode:</span>
          {viewModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => onViewChange(mode?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === mode?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={mode?.description}
            >
              <Icon name={mode?.icon} size={16} />
              <span className="hidden sm:inline">{mode?.label}</span>
            </button>
          ))}
        </div>

        {/* Export Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">Export:</span>
          {exportOptions?.map((option) => (
            <Button
              key={option?.id}
              variant="outline"
              size="sm"
              onClick={() => onExport(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              className="hidden sm:flex"
            >
              {option?.label?.replace('Export ', '')}
            </Button>
          ))}
          
          {/* Mobile Export Dropdown */}
          <div className="relative sm:hidden">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* View Mode Description */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-600">
          {viewModes?.find(mode => mode?.id === currentView)?.description}
        </p>
      </div>
    </div>
  );
};

export default ViewModeSelector;