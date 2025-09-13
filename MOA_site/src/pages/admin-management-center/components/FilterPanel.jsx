import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState({
    status: currentFilters?.status || [],
    role: currentFilters?.role || [],
    jurisdiction: currentFilters?.jurisdiction || [],
    department: currentFilters?.department || [],
    dateRange: currentFilters?.dateRange || '',
    lastLogin: currentFilters?.lastLogin || '',
    ...currentFilters
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' }
  ];

  const roleOptions = [
    { value: 'Super Administrator', label: 'Super Administrator' },
    { value: 'District Administrator', label: 'District Administrator' },
    { value: 'Audit Officer', label: 'Audit Officer' },
    { value: 'Compliance Officer', label: 'Compliance Officer' },
    { value: 'Data Analyst', label: 'Data Analyst' }
  ];

  const jurisdictionOptions = [
    { value: 'National', label: 'National Level' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'West Bengal', label: 'West Bengal' }
  ];

  const departmentOptions = [
    { value: 'Ayurveda', label: 'Ayurveda Division' },
    { value: 'Yoga & Naturopathy', label: 'Yoga & Naturopathy Division' },
    { value: 'Unani', label: 'Unani Medicine Division' },
    { value: 'Siddha', label: 'Siddha Medicine Division' },
    { value: 'Homoeopathy', label: 'Homoeopathy Division' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Finance', label: 'Finance & Accounts' },
    { value: 'IT & Digital', label: 'IT & Digital Services' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const lastLoginOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Within a week' },
    { value: 'month', label: 'Within a month' },
    { value: 'never', label: 'Never logged in' }
  ];

  const handleCheckboxChange = (filterType, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...(prev?.[filterType] || []), value]
        : (prev?.[filterType] || [])?.filter(item => item !== value)
    }));
  };

  const handleSelectChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: [],
      role: [],
      jurisdiction: [],
      department: [],
      dateRange: '',
      lastLogin: ''
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(filters)?.forEach(value => {
      if (Array.isArray(value)) {
        count += value?.length;
      } else if (value) {
        count += 1;
      }
    });
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Filter Users</h2>
            <p className="text-sm text-gray-500 mt-1">
              {getActiveFilterCount() > 0 ? `${getActiveFilterCount()} filters active` : 'No filters applied'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Account Status</h3>
            <div className="space-y-2">
              {statusOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.status?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('status', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">User Role</h3>
            <div className="space-y-2">
              {roleOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.role?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('role', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Jurisdiction Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Jurisdiction</h3>
            <div className="grid grid-cols-2 gap-2">
              {jurisdictionOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.jurisdiction?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('jurisdiction', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Department</h3>
            <div className="space-y-2">
              {departmentOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.department?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('department', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Account Created"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleSelectChange('dateRange', value)}
              placeholder="Select date range"
            />

            <Select
              label="Last Login"
              options={lastLoginOptions}
              value={filters?.lastLogin}
              onChange={(value) => handleSelectChange('lastLogin', value)}
              placeholder="Select login period"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              iconName="Filter"
              iconPosition="left"
            >
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;