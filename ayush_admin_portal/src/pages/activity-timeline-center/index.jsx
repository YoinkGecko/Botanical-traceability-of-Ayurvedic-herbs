import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ActivityCard from './components/ActivityCard';
import FilterPanel from './components/FilterPanel';
import TimelineStats from './components/TimelineStats';
import ViewModeSelector from './components/ViewModeSelector';
import StatisticalView from './components/StatisticalView';

const ActivityTimelineCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedActivities, setExpandedActivities] = useState(new Set());
  const [currentView, setCurrentView] = useState('detailed');
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
    timeRange: 'last_7_days',
    administrator: 'all',
    search: ''
  });

  // Mock activity data
  const mockActivities = [
    {
      id: 'act_001',
      type: 'practitioner_registration',
      title: 'New Ayurvedic Practitioner Registration',
      description: 'Dr. Meera Sharma registered as certified Ayurvedic practitioner in Maharashtra region',
      administrator: 'Dr. Rajesh Sharma',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      location: 'Mumbai, Maharashtra',
      priority: 'normal',
      details: {
        status: 'completed',
        recordsAffected: 1,
        processingTime: '2.3s',
        transactionId: '0x7f8a9b2c3d4e5f6789abcdef',
        blockHeight: '15,847,293',
        gasUsed: '21,000',
        notes: 'Practitioner credentials verified through blockchain authentication. All documentation meets AYUSH ministry standards.',
        relatedActivities: 3
      }
    },
    {
      id: 'act_002',
      type: 'emergency_intervention',
      title: 'Critical System Alert - Unauthorized Access Attempt',
      description: 'Multiple failed login attempts detected from suspicious IP address targeting admin accounts',
      administrator: 'Ms. Priya Patel',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      location: 'Delhi, NCT',
      priority: 'critical',
      details: {
        status: 'in_progress',
        recordsAffected: 0,
        processingTime: '0.8s',
        transactionId: '0x9a8b7c6d5e4f3210fedcba98',
        blockHeight: '15,847,291',
        gasUsed: '18,500',
        notes: 'Security protocols activated. IP address blocked and incident reported to cybersecurity team. Investigation ongoing.',
        relatedActivities: 7
      }
    },
    {
      id: 'act_003',
      type: 'compliance_update',
      title: 'Quarterly Compliance Report Generated',
      description: 'Automated generation of Q3 2024 compliance report covering all registered practitioners and institutions',
      administrator: 'Dr. Amit Kumar',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      location: 'Bangalore, Karnataka',
      priority: 'high',
      details: {
        status: 'completed',
        recordsAffected: 12847,
        processingTime: '45.2s',
        transactionId: '0x1234567890abcdef1234567',
        blockHeight: '15,847,289',
        gasUsed: '156,000',
        notes: 'Comprehensive report includes practitioner compliance rates, institutional audits, and regulatory adherence metrics.',
        relatedActivities: 15
      }
    },
    {
      id: 'act_004',
      type: 'system_modification',
      title: 'Database Schema Update - New Fields Added',
      description: 'Enhanced practitioner profile structure to include specialized treatment categories and research publications',
      administrator: 'Ms. Kavita Singh',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      location: 'Hyderabad, Telangana',
      priority: 'normal',
      details: {
        status: 'completed',
        recordsAffected: 8934,
        processingTime: '127.8s',
        transactionId: '0xabcdef1234567890abcdef12',
        blockHeight: '15,847,285',
        gasUsed: '234,500',
        notes: 'Schema migration completed successfully. All existing records updated with new field structure. Backward compatibility maintained.',
        relatedActivities: 5
      }
    },
    {
      id: 'act_005',
      type: 'audit_action',
      title: 'Routine Security Audit - Access Permissions Review',
      description: 'Monthly review of administrator access permissions and role-based security controls',
      administrator: 'Dr. Suresh Gupta',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      location: 'Chennai, Tamil Nadu',
      priority: 'normal',
      details: {
        status: 'completed',
        recordsAffected: 156,
        processingTime: '89.4s',
        transactionId: '0x567890abcdef1234567890ab',
        blockHeight: '15,847,280',
        gasUsed: '67,800',
        notes: 'All administrator permissions reviewed and validated. Three inactive accounts deactivated. Security protocols updated.',
        relatedActivities: 8
      }
    },
    {
      id: 'act_006',
      type: 'policy_update',
      title: 'New Treatment Protocol Guidelines Published',
      description: 'Updated guidelines for Panchakarma treatment protocols based on latest research and clinical studies',
      administrator: 'Dr. Rajesh Sharma',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      location: 'Pune, Maharashtra',
      priority: 'high',
      details: {
        status: 'pending',
        recordsAffected: 2456,
        processingTime: '12.7s',
        transactionId: '0xcdef1234567890abcdef1234',
        blockHeight: '15,847,275',
        gasUsed: '89,200',
        notes: 'Guidelines pending final approval from AYUSH ministry board. Expected implementation within 48 hours.',
        relatedActivities: 12
      }
    },
    {
      id: 'act_007',
      type: 'blockchain_transaction',
      title: 'Bulk Certificate Verification Process',
      description: 'Batch verification of 500+ practitioner certificates using blockchain validation system',
      administrator: 'Ms. Priya Patel',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      location: 'Jaipur, Rajasthan',
      priority: 'normal',
      details: {
        status: 'completed',
        recordsAffected: 523,
        processingTime: '234.6s',
        transactionId: '0x234567890abcdef234567890',
        blockHeight: '15,847,270',
        gasUsed: '445,600',
        notes: 'All certificates successfully verified. 12 certificates flagged for manual review due to discrepancies.',
        relatedActivities: 6
      }
    },
    {
      id: 'act_008',
      type: 'data_export',
      title: 'Parliamentary Report Data Export',
      description: 'Export of comprehensive AYUSH ministry statistics for parliamentary session presentation',
      administrator: 'Dr. Amit Kumar',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      location: 'New Delhi, NCT',
      priority: 'high',
      details: {
        status: 'completed',
        recordsAffected: 45678,
        processingTime: '456.3s',
        transactionId: '0x890abcdef234567890abcdef',
        blockHeight: '15,847,265',
        gasUsed: '678,900',
        notes: 'Comprehensive dataset exported including practitioner statistics, compliance metrics, and regional distribution data.',
        relatedActivities: 4
      }
    }
  ];

  // Filter activities based on current filters
  const filteredActivities = mockActivities?.filter(activity => {
    if (filters?.type !== 'all' && activity?.type !== filters?.type) return false;
    if (filters?.priority !== 'all' && activity?.priority !== filters?.priority) return false;
    if (filters?.status !== 'all' && activity?.details?.status !== filters?.status) return false;
    if (filters?.administrator !== 'all' && !activity?.administrator?.toLowerCase()?.includes(filters?.administrator?.replace('_', ' '))) return false;
    if (filters?.search && !activity?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !activity?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    
    // Time range filtering
    if (filters?.timeRange !== 'custom') {
      const now = new Date();
      const activityDate = new Date(activity.timestamp);
      const diffInDays = (now - activityDate) / (1000 * 60 * 60 * 24);
      
      switch (filters?.timeRange) {
        case 'today':
          if (diffInDays > 1) return false;
          break;
        case 'yesterday':
          if (diffInDays < 1 || diffInDays > 2) return false;
          break;
        case 'last_7_days':
          if (diffInDays > 7) return false;
          break;
        case 'last_30_days':
          if (diffInDays > 30) return false;
          break;
        case 'last_90_days':
          if (diffInDays > 90) return false;
          break;
      }
    }
    
    return true;
  });

  const handleToggleExpanded = (activityId) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded?.has(activityId)) {
      newExpanded?.delete(activityId);
    } else {
      newExpanded?.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      priority: 'all',
      status: 'all',
      timeRange: 'last_7_days',
      administrator: 'all',
      search: ''
    });
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format...`);
    // Mock export functionality
    alert(`Exporting ${filteredActivities?.length} activities in ${format?.toUpperCase()} format...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-72'
        }`}>
          <div className="flex">
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />

            {/* Main Content */}
            <main className="flex-1 p-6 pt-20">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Activity Timeline Center</h1>
                    <p className="text-gray-600">
                      Comprehensive chronological view of all administrative actions and system activities
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      iconName="Filter"
                      iconPosition="left"
                    >
                      {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    
                    <Button
                      variant="default"
                      iconName="RefreshCw"
                      iconPosition="left"
                    >
                      Refresh Timeline
                    </Button>
                  </div>
                </div>

                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <a href="/command-dashboard" className="hover:text-gray-700">Dashboard</a>
                  <Icon name="ChevronRight" size={14} />
                  <span className="text-gray-900">Activity Timeline</span>
                </nav>
              </div>

              {/* Timeline Stats */}
              <TimelineStats activities={filteredActivities} filters={filters} />

              {/* View Mode Selector */}
              <ViewModeSelector
                currentView={currentView}
                onViewChange={setCurrentView}
                onExport={handleExport}
              />

              {/* Content based on view mode */}
              {currentView === 'statistical' ? (
                <StatisticalView activities={filteredActivities} />
              ) : (
                <div className="space-y-4">
                  {/* Results Summary */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">
                          Showing {filteredActivities?.length} of {mockActivities?.length} activities
                        </span>
                        {filteredActivities?.length !== mockActivities?.length && (
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            Filtered
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedActivities(new Set())}
                          iconName="Minimize2"
                          iconPosition="left"
                        >
                          Collapse All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedActivities(new Set(filteredActivities.map(a => a.id)))}
                          iconName="Maximize2"
                          iconPosition="left"
                        >
                          Expand All
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Activities */}
                  {filteredActivities?.length > 0 ? (
                    <div className="space-y-6">
                      {filteredActivities?.map((activity, index) => (
                        <ActivityCard
                          key={activity?.id}
                          activity={activity}
                          isExpanded={expandedActivities?.has(activity?.id)}
                          onToggle={handleToggleExpanded}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                      <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Activities Found</h3>
                      <p className="text-gray-600 mb-4">
                        No activities match your current filter criteria. Try adjusting your filters or search terms.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}

                  {/* Load More */}
                  {filteredActivities?.length > 0 && (
                    <div className="text-center py-8">
                      <Button
                        variant="outline"
                        iconName="ChevronDown"
                        iconPosition="left"
                      >
                        Load More Activities
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Showing recent activities. Use filters to find specific events.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelineCenter;