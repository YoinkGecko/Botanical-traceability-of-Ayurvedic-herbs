import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { path: '/command-dashboard', label: 'Command Dashboard', icon: 'LayoutDashboard' },
    { path: '/blockchain-explorer', label: 'Blockchain Explorer', icon: 'Search' },
    { path: '/admin-management-center', label: 'Admin Center', icon: 'Users' },
    { path: '/activity-timeline-center', label: 'Activity Timeline', icon: 'Clock' },
  ];

  const secondaryNavItems = [
    { path: '/security-monitoring-center', label: 'Security Monitor', icon: 'Shield' },
    { path: '/compliance-audit-center', label: 'Compliance Audit', icon: 'FileCheck' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMoreMenuOpen(false);
  };

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-navy-deep to-navy-midnight rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-navy-deep">Ayush Admin Portal</h1>
              <p className="text-xs text-gray-500 -mt-1">Ministry of Ayush</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            ))}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMoreMenuToggle}
                className={`flex items-center space-x-1 ${
                  secondaryNavItems?.some(item => isActivePath(item?.path))
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>More</span>
                <Icon name="ChevronDown" size={14} />
              </Button>

              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {secondaryNavItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-xs font-medium text-success">System Online</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full text-xs flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </Button>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-saffron to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">SA</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">Super Admin</p>
                <p className="text-xs text-gray-500">admin@ayush.gov.in</p>
              </div>
              <Icon name="ChevronDown" size={14} className="text-gray-400" />
            </Button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Super Administrator</p>
                  <p className="text-xs text-gray-500">admin@ayush.gov.in</p>
                  <p className="text-xs text-saffron mt-1">Last login: Today, 09:30 AM</p>
                </div>
                
                <div className="py-1">
                  <a href="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </a>
                  <a href="/security" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Icon name="Shield" size={16} />
                    <span>Security</span>
                  </a>
                  <a href="/preferences" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </a>
                </div>

                <div className="border-t border-gray-100 py-1">
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-gray-100 w-full text-left">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black bg-opacity-50 z-40">
          <div className="bg-white w-80 h-full shadow-xl">
            <nav className="p-4 space-y-2">
              {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={onMenuToggle}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;