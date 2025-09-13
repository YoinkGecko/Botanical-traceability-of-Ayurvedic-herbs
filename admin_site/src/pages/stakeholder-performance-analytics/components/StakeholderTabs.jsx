import React from 'react';
import Icon from '../../../components/AppIcon';

const StakeholderTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'farmers',
      label: 'Farmers',
      icon: 'Wheat',
      count: 2847,
      color: 'text-green-600'
    },
    {
      id: 'lab-testers',
      label: 'Lab Testers',
      icon: 'FlaskConical',
      count: 156,
      color: 'text-blue-600'
    },
    {
      id: 'processors',
      label: 'Processors',
      icon: 'Factory',
      count: 89,
      color: 'text-orange-600'
    },
    {
      id: 'manufacturers',
      label: 'Manufacturers',
      icon: 'Package',
      count: 34,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-smooth ${
            activeTab === tab?.id
              ? 'bg-primary text-primary-foreground shadow-card'
              : 'bg-card text-foreground hover:bg-muted border border-border'
          }`}
        >
          <Icon 
            name={tab?.icon} 
            size={20} 
            className={activeTab === tab?.id ? 'text-primary-foreground' : tab?.color}
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">{tab?.label}</span>
            <span className="text-xs opacity-75">{tab?.count?.toLocaleString()} active</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StakeholderTabs;