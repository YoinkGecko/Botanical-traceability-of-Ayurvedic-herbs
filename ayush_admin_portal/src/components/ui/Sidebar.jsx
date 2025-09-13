import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    management: true,
    monitoring: true,
  });
  const location = useLocation();

  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Dashboard & Analytics',
      icon: 'LayoutDashboard',
      items: [
        { path: '/command-dashboard', label: 'Command Dashboard', icon: 'BarChart3', description: 'Executive overview and KPIs' },
        { path: '/blockchain-explorer', label: 'Blockchain Explorer', icon: 'Search', description: 'Transaction transparency' },
      ]
    },
    {
      id: 'management',
      title: 'Administration',
      icon: 'Users',
      items: [
        { path: '/admin-management-center', label: 'Admin Management', icon: 'UserCog', description: 'User roles and permissions' },
        { path: '/activity-timeline-center', label: 'Activity Timeline', icon: 'Clock', description: 'System activity logs' },
      ]
    },
    {
      id: 'monitoring',
      title: 'Security & Compliance',
      icon: 'Shield',
      items: [
        { path: '/security-monitoring-center', label: 'Security Monitor', icon: 'ShieldCheck', description: 'Real-time security status' },
        { path: '/compliance-audit-center', label: 'Compliance Audit', icon: 'FileCheck', description: 'Regulatory compliance' },
      ]
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleSection = (sectionId) => {
    if (!isCollapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev?.[sectionId]
      }));
    }
  };

  const quickActions = [
    { icon: 'Plus', label: 'New Admin', action: 'create-admin' },
    { icon: 'Download', label: 'Export Data', action: 'export' },
    { icon: 'AlertTriangle', label: 'Security Alert', action: 'security', urgent: true },
  ];

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!isCollapsed && (
            <div>
              <h2 className="text-sm font-semibold text-navy-deep">Navigation</h2>
              <p className="text-xs text-gray-500">Administrative Controls</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </Button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationSections?.map((section) => (
              <div key={section?.id} className="mb-4">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section?.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-sm font-medium transition-colors ${
                    isCollapsed 
                      ? 'justify-center' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  title={isCollapsed ? section?.title : ''}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={section?.icon} size={18} className="text-gray-500" />
                    {!isCollapsed && <span>{section?.title}</span>}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`text-gray-400 transition-transform ${
                        expandedSections?.[section?.id] ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </button>

                {/* Section Items */}
                {(expandedSections?.[section?.id] || isCollapsed) && (
                  <div className={`${isCollapsed ? 'space-y-1' : 'ml-4 space-y-1 mt-2'}`}>
                    {section?.items?.map((item) => (
                      <a
                        key={item?.path}
                        href={item?.path}
                        className={`flex items-center space-x-3 p-2 rounded-md text-sm transition-colors group ${
                          isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? `${item?.label} - ${item?.description}` : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={16} 
                          className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-gray-500 group-hover:text-gray-700'}
                        />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item?.label}</p>
                            <p className={`text-xs truncate ${
                              isActivePath(item?.path) 
                                ? 'text-primary-foreground/80' 
                                : 'text-gray-500'
                            }`}>
                              {item?.description}
                            </p>
                          </div>
                        )}
                        {isActivePath(item?.path) && (
                          <div className="w-1 h-6 bg-saffron rounded-full"></div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions?.map((action, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md text-sm transition-colors ${
                    action?.urgent
                      ? 'text-error hover:bg-error/10 border border-error/20' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon 
                    name={action?.icon} 
                    size={16} 
                    className={action?.urgent ? 'text-error' : 'text-gray-500'}
                  />
                  <span className="flex-1 text-left">{action?.label}</span>
                  {action?.urgent && (
                    <div className="w-2 h-2 bg-error rounded-full status-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* System Status */}
        <div className={`p-4 border-t border-gray-100 ${isCollapsed ? 'px-2' : ''}`}>
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-success rounded-full status-pulse" title="System Online"></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">System Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                  <span className="text-xs text-success font-medium">Online</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Uptime</span>
                  <span className="font-mono text-gray-700">99.9%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Active Users</span>
                  <span className="font-mono text-gray-700">1,247</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Last Backup</span>
                  <span className="font-mono text-gray-700">2h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;