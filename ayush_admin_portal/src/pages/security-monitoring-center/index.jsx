import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ThreatIntelligenceCard from './components/ThreatIntelligenceCard';
import SecurityStatusGrid from './components/SecurityStatusGrid';
import IncidentResponsePanel from './components/IncidentResponsePanel';
import BlockchainIntegrityMonitor from './components/BlockchainIntegrityMonitor';
import UserBehaviorAnalytics from './components/UserBehaviorAnalytics';
import SecurityReportsPanel from './components/SecurityReportsPanel';
import EmergencyResponseCenter from './components/EmergencyResponseCenter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SecurityMonitoringCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Mock data for security monitoring
  const threatIntelligenceData = [
    {
      id: 1,
      type: "Brute Force Attack",
      source: "External IP: 192.168.1.100",
      severity: "High",
      description: "Multiple failed login attempts detected from suspicious IP address targeting admin accounts.",
      detectedAt: "2025-01-12 18:15:30",
      count: 47,
      blocked: true
    },
    {
      id: 2,
      type: "SQL Injection Attempt",
      source: "Web Application",
      severity: "Critical",
      description: "Malicious SQL queries detected in user input fields attempting to access database.",
      detectedAt: "2025-01-12 18:10:15",
      count: 12,
      blocked: true
    },
    {
      id: 3,
      type: "Unusual Data Access",
      source: "Internal User: dr.sharma@ayush.gov.in",
      severity: "Medium",
      description: "User accessing large volumes of patient data outside normal working hours.",
      detectedAt: "2025-01-12 17:45:22",
      count: 1,
      blocked: false
    },
    {
      id: 4,
      type: "Malware Detection",
      source: "Email Gateway",
      severity: "High",
      description: "Suspicious attachment detected in incoming email to admin@ayush.gov.in.",
      detectedAt: "2025-01-12 17:30:45",
      count: 3,
      blocked: true
    }
  ];

  const securityMetrics = [
    {
      component: "Authentication System",
      status: "Secure",
      description: "Multi-factor authentication active",
      uptime: "99.98%",
      lastCheck: "2 min ago",
      incidents: 0
    },
    {
      component: "Blockchain Network",
      status: "Secure",
      description: "All nodes synchronized and verified",
      uptime: "100%",
      lastCheck: "1 min ago",
      incidents: 0
    },
    {
      component: "Database Security",
      status: "Warning",
      description: "Unusual query patterns detected",
      uptime: "99.95%",
      lastCheck: "5 min ago",
      incidents: 2
    },
    {
      component: "API Gateway",
      status: "Secure",
      description: "Rate limiting and encryption active",
      uptime: "99.99%",
      lastCheck: "1 min ago",
      incidents: 0
    },
    {
      component: "File Storage",
      status: "Secure",
      description: "Encryption and access controls verified",
      uptime: "100%",
      lastCheck: "3 min ago",
      incidents: 0
    },
    {
      component: "Network Firewall",
      status: "Critical",
      description: "High volume of blocked attempts",
      uptime: "99.92%",
      lastCheck: "1 min ago",
      incidents: 15
    }
  ];

  const incidentData = [
    {
      id: "INC-2025-001",
      title: "Suspicious Login Activity",
      description: "Multiple failed login attempts from foreign IP addresses targeting administrative accounts.",
      severity: "High",
      status: "Investigating",
      reportedAt: "2025-01-12 18:20:00",
      assignedTo: "Security Team Alpha",
      eta: "2 hours",
      comments: 5,
      actions: ["Block IP Range", "Reset Passwords", "Enable 2FA"]
    },
    {
      id: "INC-2025-002",
      title: "Data Export Anomaly",
      description: "Unusual large-scale data export detected outside business hours.",
      severity: "Medium",
      status: "Active",
      reportedAt: "2025-01-12 17:45:00",
      assignedTo: "Data Protection Officer",
      eta: "4 hours",
      comments: 3,
      actions: ["Audit User Access", "Review Export Logs"]
    },
    {
      id: "INC-2025-003",
      title: "Blockchain Validation Error",
      description: "Temporary validation issues detected in blockchain network node synchronization.",
      severity: "Low",
      status: "Resolved",
      reportedAt: "2025-01-12 16:30:00",
      assignedTo: "Blockchain Team",
      eta: "Completed",
      comments: 8,
      actions: []
    }
  ];

  const blockchainData = {
    networkMetrics: [
      { name: "Network Hash Rate", value: "2.5 TH/s", status: "Excellent" },
      { name: "Block Time", value: "12.3 sec", status: "Good" },
      { name: "Transaction Pool", value: "1,247", status: "Good" },
      { name: "Node Sync Status", value: "100%", status: "Excellent" },
      { name: "Consensus Health", value: "Active", status: "Excellent" },
      { name: "Network Latency", value: "45ms", status: "Good" }
    ],
    latestBlock: {
      number: "2,847,392",
      hash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
      timestamp: "2025-01-12 18:22:30",
      transactions: 156
    },
    recentTransactions: [
      {
        id: "0x8f7e6d5c4b3a2918f7e6d5c4b3a291",
        type: "Practitioner Registration",
        from: "District Admin - Delhi",
        timestamp: "18:22:15"
      },
      {
        id: "0x9e8d7c6b5a4938f7e6d5c4b3a291",
        type: "Certificate Verification",
        from: "Verification Authority",
        timestamp: "18:21:45"
      },
      {
        id: "0xa9f8e7d6c5b4a39f8e7d6c5b4a39",
        type: "License Update",
        from: "State Board - Maharashtra",
        timestamp: "18:21:20"
      },
      {
        id: "0xb0g9f8e7d6c5b4a0g9f8e7d6c5b4",
        type: "Audit Log Entry",
        from: "Compliance Officer",
        timestamp: "18:20:55"
      }
    ]
  };

  const behaviorData = {
    anomalousActivities: [
      {
        user: "dr.patel@ayush.gov.in",
        type: "data_access",
        risk: "High",
        description: "Accessing patient records from multiple locations simultaneously",
        timestamp: "2025-01-12 18:15:00",
        ipAddress: "203.192.45.78",
        actions: true
      },
      {
        user: "admin.kumar@ayush.gov.in",
        type: "permission_change",
        risk: "Medium",
        description: "Modified user permissions outside standard approval workflow",
        timestamp: "2025-01-12 17:30:00",
        ipAddress: "192.168.1.45",
        actions: true
      },
      {
        user: "clerk.singh@ayush.gov.in",
        type: "export",
        risk: "Low",
        description: "Large data export during non-business hours",
        timestamp: "2025-01-12 16:45:00",
        ipAddress: "10.0.0.23",
        actions: false
      }
    ],
    accessPatterns: [
      {
        pattern: "Business Hours Access",
        frequency: "2,847 sessions",
        percentage: 78,
        users: 156
      },
      {
        pattern: "After Hours Access",
        frequency: "542 sessions",
        percentage: 15,
        users: 23
      },
      {
        pattern: "Weekend Access",
        frequency: "198 sessions",
        percentage: 5,
        users: 12
      },
      {
        pattern: "Holiday Access",
        frequency: "73 sessions",
        percentage: 2,
        users: 8
      }
    ],
    failedLogins: [
      {
        user: "admin@ayush.gov.in",
        ipAddress: "185.220.101.47",
        attempts: 12,
        lastAttempt: "18:20:00",
        blocked: true
      },
      {
        user: "superadmin@ayush.gov.in",
        ipAddress: "91.203.67.89",
        attempts: 8,
        lastAttempt: "18:15:00",
        blocked: true
      },
      {
        user: "dr.sharma@ayush.gov.in",
        ipAddress: "203.192.45.12",
        attempts: 3,
        lastAttempt: "17:45:00",
        blocked: false
      }
    ]
  };

  const reportsData = [
    {
      id: "RPT-2025-001",
      title: "Monthly Security Compliance Report",
      type: "Compliance",
      description: "Comprehensive security compliance assessment for January 2025 covering all government security standards and protocols.",
      generatedAt: "2025-01-12 09:00:00",
      period: "January 2025",
      size: "2.4 MB",
      summary: "Overall compliance score: 94%. Minor issues identified in user access management and resolved. All critical security controls are functioning properly.",
      findings: [
        "2 users with expired access credentials identified and resolved",
        "Firewall rules updated to block 15 new threat signatures",
        "All security patches applied within required timeframe"
      ]
    },
    {
      id: "RPT-2025-002",
      title: "Incident Response Analysis",
      type: "Incident",
      description: "Detailed analysis of security incidents from the past week including response times and resolution effectiveness.",
      generatedAt: "2025-01-11 16:30:00",
      period: "Week 2, 2025",
      size: "1.8 MB",
      summary: "3 security incidents handled with average response time of 15 minutes. All incidents resolved without data compromise.",
      findings: [
        "Response time improved by 25% compared to previous week",
        "No data breaches or unauthorized access detected",
        "Emergency protocols activated successfully in 2 critical incidents"
      ]
    },
    {
      id: "RPT-2025-003",
      title: "Blockchain Security Audit",
      type: "Audit",
      description: "Technical audit of blockchain infrastructure security including node integrity and transaction validation.",
      generatedAt: "2025-01-10 14:00:00",
      period: "Q4 2024",
      size: "3.1 MB",
      summary: "Blockchain network security is excellent with 100% node synchronization and zero integrity issues detected.",
      findings: [
        "All blockchain nodes properly secured and synchronized",
        "Transaction validation accuracy: 100%",
        "No unauthorized blockchain modifications detected"
      ]
    },
    {
      id: "RPT-2025-004",
      title: "Vulnerability Assessment Report",
      type: "Vulnerability",
      description: "Comprehensive vulnerability scan results and remediation recommendations for all system components.",
      generatedAt: "2025-01-09 11:00:00",
      period: "January 2025",
      size: "4.2 MB",
      summary: "12 low-risk vulnerabilities identified and patched. No critical or high-risk vulnerabilities found.",
      findings: [
        "All critical security patches applied successfully",
        "Web application security enhanced with additional input validation",
        "Database access controls strengthened"
      ]
    }
  ];

  const emergencyData = {
    protocols: [
      {
        id: "PROTO-001",
        name: "Data Breach Response",
        severity: "Critical",
        description: "Immediate response protocol for suspected or confirmed data breaches affecting sensitive health information.",
        trigger: "Unauthorized data access detected",
        responseTime: "< 5 minutes",
        stakeholders: "Security Team, Legal, Ministry Officials"
      },
      {
        id: "PROTO-002",
        name: "System Compromise",
        severity: "High",
        description: "Response protocol for system-wide security compromises including malware infections or unauthorized access.",
        trigger: "Multiple security alerts or system anomalies",
        responseTime: "< 10 minutes",
        stakeholders: "IT Security, System Administrators, Management"
      },
      {
        id: "PROTO-003",
        name: "Blockchain Attack",
        severity: "High",
        description: "Specialized response for attacks targeting blockchain infrastructure or transaction integrity.",
        trigger: "Blockchain validation errors or consensus issues",
        responseTime: "< 15 minutes",
        stakeholders: "Blockchain Team, Security Analysts, External Experts"
      }
    ],
    quickActions: [
      {
        id: "lockdown",
        name: "Emergency System Lockdown",
        description: "Immediately lock all system access and halt all operations",
        icon: "Lock",
        critical: true
      },
      {
        id: "isolate",
        name: "Isolate Affected Systems",
        description: "Disconnect compromised systems from the network",
        icon: "Shield",
        critical: true
      },
      {
        id: "backup",
        name: "Initiate Emergency Backup",
        description: "Start immediate backup of critical data and systems",
        icon: "Database",
        critical: false
      },
      {
        id: "notify",
        name: "Alert Emergency Contacts",
        description: "Send notifications to all emergency response personnel",
        icon: "Phone",
        critical: false
      },
      {
        id: "forensics",
        name: "Enable Forensic Logging",
        description: "Activate detailed logging for incident investigation",
        icon: "Search",
        critical: false
      },
      {
        id: "recovery",
        name: "Prepare Recovery Plan",
        description: "Initialize disaster recovery procedures",
        icon: "RefreshCw",
        critical: false
      }
    ],
    activeAlerts: [
      {
        title: "Multiple Failed Login Attempts",
        level: "High",
        description: "47 failed login attempts detected from IP 192.168.1.100 in the last 10 minutes",
        timestamp: "18:20:00",
        source: "Authentication System",
        affectedSystems: "Admin Portal, User Management"
      },
      {
        title: "Unusual Database Query Pattern",
        level: "Medium",
        description: "Large volume of database queries detected outside normal business hours",
        timestamp: "17:45:00",
        source: "Database Monitor",
        affectedSystems: "Patient Database, Practitioner Registry"
      },
      {
        title: "Firewall Block Rate Elevated",
        level: "Low",
        description: "Increased number of blocked connection attempts from external sources",
        timestamp: "17:30:00",
        source: "Network Firewall",
        affectedSystems: "External Network Interface"
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Security Overview', icon: 'Shield' },
    { id: 'threats', label: 'Threat Intelligence', icon: 'AlertTriangle' },
    { id: 'incidents', label: 'Incident Response', icon: 'AlertCircle' },
    { id: 'blockchain', label: 'Blockchain Security', icon: 'Link' },
    { id: 'behavior', label: 'User Behavior', icon: 'Users' },
    { id: 'reports', label: 'Security Reports', icon: 'FileText' },
    { id: 'emergency', label: 'Emergency Response', icon: 'Zap' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Refreshing security data...');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Helmet>
        <title>Security Monitoring Center - Ayush Admin Portal</title>
        <meta name="description" content="Comprehensive security command center for protecting sensitive government health data and blockchain infrastructure with real-time monitoring and threat intelligence." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
        
        <main className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-72'
        } pt-16`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Security Monitoring Center</h1>
                  <p className="text-gray-600 mt-1">
                    Real-time security monitoring and threat intelligence for AYUSH infrastructure
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon name="Clock" size={16} />
                    <span>Auto-refresh every {refreshInterval}s</span>
                    <select 
                      value={refreshInterval} 
                      onChange={(e) => setRefreshInterval(Number(e?.target?.value))}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={10}>10s</option>
                      <option value={30}>30s</option>
                      <option value={60}>1m</option>
                      <option value={300}>5m</option>
                    </select>
                  </div>
                  
                  <Button variant="outline" iconName="Download">
                    Export Report
                  </Button>
                  
                  <Button variant="default" iconName="Settings">
                    Configure Alerts
                  </Button>
                </div>
              </div>
            </div>

            {/* Security Status Overview */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Icon name="ShieldCheck" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Security Status</p>
                      <p className="text-lg font-semibold text-green-600">Secure</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Threats</p>
                      <p className="text-lg font-semibold text-red-600">{threatIntelligenceData?.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Icon name="AlertCircle" size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Open Incidents</p>
                      <p className="text-lg font-semibold text-yellow-600">{incidentData?.filter(i => i?.status !== 'Resolved')?.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon name="Activity" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">System Uptime</p>
                      <p className="text-lg font-semibold text-blue-600">99.98%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
              {activeTab === 'overview' && (
                <>
                  <SecurityStatusGrid securityMetrics={securityMetrics} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Threats</h2>
                      <div className="space-y-4">
                        {threatIntelligenceData?.slice(0, 3)?.map((threat) => (
                          <ThreatIntelligenceCard key={threat?.id} threat={threat} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Incidents</h2>
                      <IncidentResponsePanel incidents={incidentData?.slice(0, 2)} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'threats' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Threat Intelligence Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {threatIntelligenceData?.map((threat) => (
                      <ThreatIntelligenceCard key={threat?.id} threat={threat} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'incidents' && (
                <IncidentResponsePanel incidents={incidentData} />
              )}

              {activeTab === 'blockchain' && (
                <BlockchainIntegrityMonitor blockchainData={blockchainData} />
              )}

              {activeTab === 'behavior' && (
                <UserBehaviorAnalytics behaviorData={behaviorData} />
              )}

              {activeTab === 'reports' && (
                <SecurityReportsPanel reports={reportsData} />
              )}

              {activeTab === 'emergency' && (
                <EmergencyResponseCenter emergencyData={emergencyData} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SecurityMonitoringCenter;