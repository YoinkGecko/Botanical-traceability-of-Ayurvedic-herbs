import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SearchBar from './components/SearchBar';
import TransactionTable from './components/TransactionTable';
import BlockchainStats from './components/BlockchainStats';
import BlockchainVisualization from './components/BlockchainVisualization';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BlockchainExplorer = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [searchLoading, setSearchLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    searchType: 'all',
    transactionType: 'all',
    status: 'all',
    region: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock blockchain statistics
  const blockchainStats = {
    totalTransactions: 2847392,
    todayTransactions: 1247,
    pendingVerifications: 89,
    successRate: 98.7,
    activePractitioners: 45678,
    networkHealth: 'Excellent'
  };

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'tx-001',
      hash: '0x8f2a7b9c4d5e6f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
      blockNumber: 2847392,
      timestamp: new Date(Date.now() - 120000),
      type: 'registration',
      practitionerName: 'Dr. Rajesh Kumar Sharma',
      practitionerId: 'AYU-MH-2024-001247',
      status: 'verified',
      region: 'Maharashtra',
      fromAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      toAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      gasUsed: 21000,
      gasPrice: 20,
      nonce: 42,
      auditTrail: [
        {
          action: 'Application Submitted',
          administrator: 'District Admin - Mumbai',
          timestamp: new Date(Date.now() - 180000),
          status: 'completed',
          notes: 'Initial registration application received'
        },
        {
          action: 'Document Verification',
          administrator: 'Verification Officer - MH',
          timestamp: new Date(Date.now() - 150000),
          status: 'completed',
          notes: 'All documents verified successfully'
        },
        {
          action: 'Blockchain Entry',
          administrator: 'System Automated',
          timestamp: new Date(Date.now() - 120000),
          status: 'completed',
          notes: 'Transaction recorded on blockchain'
        }
      ]
    },
    {
      id: 'tx-002',
      hash: '0x7e1a6b8c3d4e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
      blockNumber: 2847391,
      timestamp: new Date(Date.now() - 240000),
      type: 'renewal',
      practitionerName: 'Dr. Priya Nair',
      practitionerId: 'AYU-KL-2019-000892',
      status: 'pending',
      region: 'Kerala',
      fromAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      toAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      gasUsed: 18500,
      gasPrice: 18,
      nonce: 38,
      auditTrail: [
        {
          action: 'Renewal Application',
          administrator: 'Dr. Priya Nair',
          timestamp: new Date(Date.now() - 300000),
          status: 'completed',
          notes: 'License renewal application submitted'
        },
        {
          action: 'Pending Review',
          administrator: 'District Admin - Kochi',
          timestamp: new Date(Date.now() - 240000),
          status: 'pending',
          notes: 'Awaiting administrator review'
        }
      ]
    },
    {
      id: 'tx-003',
      hash: '0x6d0a5b7c2d3e4f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
      blockNumber: 2847390,
      timestamp: new Date(Date.now() - 360000),
      type: 'modification',
      practitionerName: 'Dr. Amit Patel',
      practitionerId: 'UNA-GJ-2022-001456',
      status: 'verified',
      region: 'Gujarat',
      fromAddress: '0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      toAddress: '0x1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b',
      gasUsed: 19200,
      gasPrice: 22,
      nonce: 55,
      auditTrail: [
        {
          action: 'Profile Update Request',
          administrator: 'Dr. Amit Patel',
          timestamp: new Date(Date.now() - 420000),
          status: 'completed',
          notes: 'Updated practice address and contact details'
        },
        {
          action: 'Verification Complete',
          administrator: 'Verification Officer - GJ',
          timestamp: new Date(Date.now() - 360000),
          status: 'completed',
          notes: 'Changes verified and approved'
        }
      ]
    },
    {
      id: 'tx-004',
      hash: '0x5c9a8b7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9',
      blockNumber: 2847389,
      timestamp: new Date(Date.now() - 480000),
      type: 'verification',
      practitionerName: 'Dr. Sunita Reddy',
      practitionerId: 'SID-TN-2023-002134',
      status: 'rejected',
      region: 'Tamil Nadu',
      fromAddress: '0x2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c',
      toAddress: '0xa9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0',
      gasUsed: 16800,
      gasPrice: 19,
      nonce: 29,
      auditTrail: [
        {
          action: 'Document Submission',
          administrator: 'Dr. Sunita Reddy',
          timestamp: new Date(Date.now() - 540000),
          status: 'completed',
          notes: 'Additional certification documents submitted'
        },
        {
          action: 'Review Failed',
          administrator: 'Senior Verification Officer - TN',
          timestamp: new Date(Date.now() - 480000),
          status: 'completed',
          notes: 'Documents do not meet current standards. Resubmission required.'
        }
      ]
    },
    {
      id: 'tx-005',
      hash: '0x4b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8',
      blockNumber: 2847388,
      timestamp: new Date(Date.now() - 600000),
      type: 'registration',
      practitionerName: 'Dr. Mohammed Hassan',
      practitionerId: 'UNA-UP-2024-001789',
      status: 'verified',
      region: 'Uttar Pradesh',
      fromAddress: '0x3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
      toAddress: '0xb0a9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1',
      gasUsed: 22100,
      gasPrice: 21,
      nonce: 67,
      auditTrail: [
        {
          action: 'New Registration',
          administrator: 'District Admin - Lucknow',
          timestamp: new Date(Date.now() - 660000),
          status: 'completed',
          notes: 'Unani medicine practitioner registration'
        },
        {
          action: 'Verification Complete',
          administrator: 'State Verification Authority - UP',
          timestamp: new Date(Date.now() - 600000),
          status: 'completed',
          notes: 'All credentials verified successfully'
        }
      ]
    }
  ];

  // Mock real-time data for visualization
  const realtimeData = [
    {
      hash: '0x9a3b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9',
      type: 'registration',
      description: 'New Ayurveda practitioner registration - Dr. Kavita Singh',
      region: 'Rajasthan',
      timestamp: new Date(Date.now() - 30000)
    },
    {
      hash: '0x8b2a9c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8',
      type: 'renewal',
      description: 'License renewal approved - Dr. Ravi Kumar',
      region: 'Karnataka',
      timestamp: new Date(Date.now() - 45000)
    },
    {
      hash: '0x7c1b8a9d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9',
      type: 'modification',
      description: 'Profile update verified - Dr. Meera Joshi',
      region: 'Maharashtra',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      hash: '0x6d0c7b8a9e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9',
      type: 'verification',
      description: 'Document verification completed - Dr. Suresh Gupta',
      region: 'Gujarat',
      timestamp: new Date(Date.now() - 75000)
    }
  ];

  const tabs = [
    { id: 'search', label: 'Transaction Search', icon: 'Search' },
    { id: 'visualization', label: 'Blockchain View', icon: 'GitBranch' },
    { id: 'analytics', label: 'Network Analytics', icon: 'BarChart3' }
  ];

  useEffect(() => {
    // Initialize with some transactions
    setTransactions(mockTransactions);
  }, []);

  const handleSearch = async (query, searchFilters) => {
    setSearchLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredTransactions = [...mockTransactions];
      
      // Apply filters
      if (searchFilters?.transactionType !== 'all') {
        filteredTransactions = filteredTransactions?.filter(tx => tx?.type === searchFilters?.transactionType);
      }
      
      if (searchFilters?.status !== 'all') {
        filteredTransactions = filteredTransactions?.filter(tx => tx?.status === searchFilters?.status);
      }
      
      if (searchFilters?.region !== 'all') {
        filteredTransactions = filteredTransactions?.filter(tx => 
          tx?.region?.toLowerCase() === searchFilters?.region?.toLowerCase()
        );
      }
      
      // Apply search query
      if (query?.trim()) {
        filteredTransactions = filteredTransactions?.filter(tx => 
          tx?.hash?.toLowerCase()?.includes(query?.toLowerCase()) ||
          tx?.practitionerName?.toLowerCase()?.includes(query?.toLowerCase()) ||
          tx?.practitionerId?.toLowerCase()?.includes(query?.toLowerCase())
        );
      }
      
      setTransactions(filteredTransactions);
      setSearchLoading(false);
    }, 1000);
  };

  const handleExport = (format) => {
    // Mock export functionality
    const exportData = {
      format,
      transactions: transactions?.length,
      timestamp: new Date()?.toISOString()
    };
    
    console.log('Exporting data:', exportData);
    
    // In a real application, this would trigger a download
    alert(`Exporting ${transactions?.length} transactions as ${format?.toUpperCase()}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blockchain Explorer</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive transaction transparency and blockchain analysis center
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Blockchain Secured</span>
              </div>
              
              <Button variant="outline" iconName="Download">
                Export Report
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'search' && (
              <>
                <SearchBar
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
                
                <TransactionTable
                  transactions={transactions}
                  loading={searchLoading}
                  onExport={handleExport}
                />
              </>
            )}

            {activeTab === 'visualization' && (
              <BlockchainVisualization realtimeData={realtimeData} />
            )}

            {activeTab === 'analytics' && (
              <BlockchainStats stats={blockchainStats} />
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-500 mt-1">Common blockchain explorer tasks</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="Search">
                  Advanced Search
                </Button>
                <Button variant="outline" size="sm" iconName="FileText">
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" iconName="Settings">
                  Configure Alerts
                </Button>
                <Button variant="default" size="sm" iconName="RefreshCw">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlockchainExplorer;