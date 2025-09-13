import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ComplianceOverview from './components/ComplianceOverview';
import ComplianceMatrix from './components/ComplianceMatrix';
import AuditTimeline from './components/AuditTimeline';
import RiskAssessment from './components/RiskAssessment';
import ComplianceReports from './components/ComplianceReports';

const ComplianceAuditCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'matrix', label: 'Compliance Matrix', icon: 'Grid3X3' },
    { id: 'timeline', label: 'Audit Timeline', icon: 'Clock' },
    { id: 'risk', label: 'Risk Assessment', icon: 'AlertTriangle' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ComplianceOverview />;
      case 'matrix':
        return <ComplianceMatrix />;
      case 'timeline':
        return <AuditTimeline />;
      case 'risk':
        return <RiskAssessment />;
      case 'reports':
        return <ComplianceReports />;
      default:
        return <ComplianceOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={handleMobileMenuToggle} isMenuOpen={isMobileMenuOpen} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Compliance & Audit Center</h1>
                <p className="text-gray-600">Regulatory compliance monitoring and audit management</p>
              </div>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <a href="/command-dashboard" className="hover:text-gray-700">Dashboard</a>
              <Icon name="ChevronRight" size={14} />
              <span className="text-gray-900">Compliance & Audit Center</span>
            </nav>
          </div>

          {/* System Status Banner */}
          <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/20 rounded-full">
                  <Icon name="ShieldCheck" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Compliance System Status</h3>
                  <p className="text-xs text-gray-600">All monitoring systems operational • Last updated: {new Date()?.toLocaleTimeString('en-IN')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-semibold text-success">94.2% Compliance Rate</div>
                  <div className="text-xs text-gray-500">Across all categories</div>
                </div>
                <button className="text-primary hover:text-primary/80 p-2">
                  <Icon name="RefreshCw" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Emergency Actions */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Emergency Actions</h2>
                <p className="text-sm text-gray-500">Quick access to critical compliance functions</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-error rounded-full status-pulse"></div>
                <span className="text-xs text-error font-medium">18 High Priority Alerts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center space-x-3 p-4 border-2 border-error/20 rounded-lg hover:border-error hover:bg-error/5 transition-colors text-left">
                <div className="p-2 bg-error/10 rounded-lg">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Immediate Violations</h3>
                  <p className="text-xs text-gray-500">Require urgent intervention</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-4 border-2 border-warning/20 rounded-lg hover:border-warning hover:bg-warning/5 transition-colors text-left">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Pending Audits</h3>
                  <p className="text-xs text-gray-500">Schedule emergency audits</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-3 p-4 border-2 border-primary/20 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="FileCheck" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Generate Report</h3>
                  <p className="text-xs text-gray-500">Emergency compliance report</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceAuditCenter;