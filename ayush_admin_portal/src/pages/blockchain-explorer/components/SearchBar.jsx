import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onFilterChange, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const searchTypeOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'hash', label: 'Transaction Hash' },
    { value: 'practitioner', label: 'Practitioner ID' },
    { value: 'institution', label: 'Institution' },
    { value: 'natural', label: 'Natural Language' }
  ];

  const transactionTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'registration', label: 'New Registration' },
    { value: 'renewal', label: 'License Renewal' },
    { value: 'modification', label: 'Profile Update' },
    { value: 'suspension', label: 'License Suspension' },
    { value: 'verification', label: 'Document Verification' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'verified', label: 'Verified' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'expired', label: 'Expired' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    onSearch(query, filters);
  };

  const quickSearches = [
    "Ayurveda registrations last 30 days",
    "Pending verifications Maharashtra",
    "Expired licenses this month",
    "Unani practitioners Gujarat"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Main Search */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by hash, practitioner ID, or natural language (e.g., 'show all Ayurveda registrations in Kerala')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="text-base"
            />
          </div>
          <div className="w-48">
            <Select
              options={searchTypeOptions}
              value={filters?.searchType}
              onChange={(value) => onFilterChange({ ...filters, searchType: value })}
              placeholder="Search Type"
            />
          </div>
          <Button type="submit" variant="default" iconName="Search" className="px-6">
            Search
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 mr-2">Quick searches:</span>
          {quickSearches?.map((query, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickSearch(query)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="Filter" size={16} />
            <span>Advanced Filters</span>
            <Icon 
              name="ChevronDown" 
              size={14} 
              className={`transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Real-time updates</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
              <span className="text-success font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <Select
              label="Transaction Type"
              options={transactionTypeOptions}
              value={filters?.transactionType}
              onChange={(value) => onFilterChange({ ...filters, transactionType: value })}
            />
            
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => onFilterChange({ ...filters, status: value })}
            />
            
            <Select
              label="Region"
              options={regionOptions}
              value={filters?.region}
              onChange={(value) => onFilterChange({ ...filters, region: value })}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={filters?.dateFrom}
                  onChange={(e) => onFilterChange({ ...filters, dateFrom: e?.target?.value })}
                  placeholder="From"
                />
                <Input
                  type="date"
                  value={filters?.dateTo}
                  onChange={(e) => onFilterChange({ ...filters, dateTo: e?.target?.value })}
                  placeholder="To"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;