import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import BlockchainFeed from './components/BlockchainFeed';
import AlertsPanel from './components/AlertsPanel';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import StateComplianceMap from './components/StateComplianceMap';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommandDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const metricsData = [
    {
      title: 'Total Registered Practitioners',
      value: '1,24,567',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'blue'
    },
    {
      title: 'Active Blockchain Transactions',
      value: '45,892',
      change: '+8.3%',
      changeType: 'increase',
      icon: 'Activity',
      color: 'green'
    },
    {
      title: 'Compliance Rate',
      value: '87.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: 'Shield',
      color: 'amber'
    },
    {
      title: 'Avg Processing Time',
      value: '2.4 hrs',
      change: '-15.7%',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'purple'
    },
    {
      title: 'Pending Approvals',
      value: '1,234',
      change: '-5.2%',
      changeType: 'decrease',
      icon: 'FileText',
      color: 'red'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'increase',
      icon: 'Server',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Command Dashboard</h1>
                <p className="text-gray-600">
                  Welcome back, Super Administrator. Here's your system overview for today.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {currentTime?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    {currentTime?.toLocaleTimeString('en-IN', { 
                      hour12: true,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Charts and Analytics */}
            <div className="xl:col-span-2 space-y-6">
              <PerformanceChart />
              <StateComplianceMap />
            </div>

            {/* Right Column - Live Feed and Actions */}
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>

          {/* Bottom Row - Live Feed and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BlockchainFeed />
            <AlertsPanel />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
              <p>
                © {new Date()?.getFullYear()} Ministry of Ayush, Government of India. All rights reserved.
              </p>
              <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                <span>Last updated: {currentTime?.toLocaleTimeString('en-IN')}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full status-pulse"></div>
                  <span>System Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommandDashboard;