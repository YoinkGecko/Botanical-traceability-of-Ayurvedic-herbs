import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}) => {
  const activityTypes = [
    { value: 'all', label: 'All Activities' },
    { value: 'practitioner_registration', label: 'Practitioner Registration' },
    { value: 'compliance_update', label: 'Compliance Updates' },
    { value: 'system_modification', label: 'System Modifications' },
    { value: 'emergency_intervention', label: 'Emergency Interventions' },
    { value: 'audit_action', label: 'Audit Actions' },
    { value: 'policy_update', label: 'Policy Updates' },
    { value: 'security_alert', label: 'Security Alerts' },
    { value: 'data_export', label: 'Data Exports' },
    { value: 'user_management', label: 'User Management' },
    { value: 'blockchain_transaction', label: 'Blockchain Transactions' }
  ];

  const priorityLevels = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'in_progress', label: 'In Progress' }
  ];

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_90_days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const administrators = [
    { value: 'all', label: 'All Administrators' },
    { value: 'dr_sharma', label: 'Dr. Rajesh Sharma' },
    { value: 'ms_patel', label: 'Ms. Priya Patel' },
    { value: 'dr_kumar', label: 'Dr. Amit Kumar' },
    { value: 'ms_singh', label: 'Ms. Kavita Singh' },
    { value: 'dr_gupta', label: 'Dr. Suresh Gupta' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isOpen ? 'w-80' : 'w-0 overflow-hidden'
    }`}>
      <div className="h-full flex flex-col">
        {/* Filter Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-900">Advanced Filters</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Search Activities
            </label>
            <Input
              type="text"
              placeholder="Search by title, description, or ID..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Activity Type
            </label>
            <div className="space-y-2">
              {activityTypes?.map((type) => (
                <label key={type?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="activityType"
                    value={type?.value}
                    checked={filters?.type === type?.value}
                    onChange={(e) => handleFilterChange('type', e?.target?.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{type?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Priority Level
            </label>
            <div className="space-y-2">
              {priorityLevels?.map((priority) => (
                <label key={priority?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={priority?.value}
                    checked={filters?.priority === priority?.value}
                    onChange={(e) => handleFilterChange('priority', e?.target?.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{priority?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions?.map((status) => (
                <label key={status?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status?.value}
                    checked={filters?.status === status?.value}
                    onChange={(e) => handleFilterChange('status', e?.target?.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{status?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Time Range
            </label>
            <div className="space-y-2">
              {timeRanges?.map((range) => (
                <label key={range?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timeRange"
                    value={range?.value}
                    checked={filters?.timeRange === range?.value}
                    onChange={(e) => handleFilterChange('timeRange', e?.target?.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{range?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Date Range */}
          {filters?.timeRange === 'custom' && (
            <div className="space-y-3">
              <Input
                type="date"
                label="Start Date"
                value={filters?.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
              />
              <Input
                type="date"
                label="End Date"
                value={filters?.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
              />
            </div>
          )}

          {/* Administrator */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Administrator
            </label>
            <div className="space-y-2">
              {administrators?.map((admin) => (
                <label key={admin?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="administrator"
                    value={admin?.value}
                    checked={filters?.administrator === admin?.value}
                    onChange={(e) => handleFilterChange('administrator', e?.target?.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{admin?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
          <div className="text-xs text-gray-500 text-center">
            Showing filtered results
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;