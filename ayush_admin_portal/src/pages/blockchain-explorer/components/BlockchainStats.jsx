import React from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Transactions',
      value: stats?.totalTransactions?.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Activity',
      description: 'All-time blockchain transactions'
    },
    {
      title: 'Today\'s Activity',
      value: stats?.todayTransactions?.toLocaleString(),
      change: '+8.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Transactions processed today'
    },
    {
      title: 'Pending Verifications',
      value: stats?.pendingVerifications?.toLocaleString(),
      change: '-15.2%',
      changeType: 'negative',
      icon: 'Clock',
      description: 'Awaiting administrator review'
    },
    {
      title: 'Success Rate',
      value: `${stats?.successRate}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      description: 'Successful transaction rate'
    },
    {
      title: 'Active Practitioners',
      value: stats?.activePractitioners?.toLocaleString(),
      change: '+5.7%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Registered and active'
    },
    {
      title: 'Network Health',
      value: 'Excellent',
      change: '99.9% uptime',
      changeType: 'positive',
      icon: 'Shield',
      description: 'Blockchain network status'
    }
  ];

  const recentBlocks = [
    {
      number: 2847392,
      hash: '0x8f2a7b9c4d5e6f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
      transactions: 47,
      timestamp: new Date(Date.now() - 120000),
      miner: 'Ayush-Node-Mumbai-01'
    },
    {
      number: 2847391,
      hash: '0x7e1a6b8c3d4e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
      transactions: 52,
      timestamp: new Date(Date.now() - 240000),
      miner: 'Ayush-Node-Delhi-02'
    },
    {
      number: 2847390,
      hash: '0x6d0a5b7c2d3e4f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
      transactions: 38,
      timestamp: new Date(Date.now() - 360000),
      miner: 'Ayush-Node-Bangalore-03'
    }
  ];

  const formatHash = (hash) => {
    return `${hash?.substring(0, 10)}...${hash?.substring(hash?.length - 8)}`;
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-authority">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat?.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat?.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  stat?.changeType === 'positive' ? 'text-success' : 'text-error'
                }`}>
                  {stat?.change}
                </span>
                <p className="text-xs text-gray-500 mt-1">{stat?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Blocks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Blocks</h3>
              <p className="text-sm text-gray-500">Latest blocks added to the chain</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
              <span className="text-sm text-success font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentBlocks?.map((block, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-navy-deep to-navy-midnight rounded-lg flex items-center justify-center">
                    <Icon name="Box" size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Block #{block?.number?.toLocaleString()}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {block?.transactions} txns
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-500 mt-1">
                      {formatHash(block?.hash)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-900">{formatTimeAgo(block?.timestamp)}</p>
                  <p className="text-xs text-gray-500">Mined by {block?.miner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View All Blocks
          </button>
        </div>
      </div>
      {/* Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Nodes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Globe" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Network Nodes</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Mumbai Primary', status: 'active', load: 78 },
              { name: 'Delhi Secondary', status: 'active', load: 65 },
              { name: 'Bangalore Backup', status: 'active', load: 42 },
              { name: 'Chennai Regional', status: 'maintenance', load: 0 }
            ]?.map((node, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    node?.status === 'active' ? 'bg-success status-pulse' : 
                    node?.status === 'maintenance' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{node?.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">{node?.load}% load</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${node?.load}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Types Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="PieChart" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Transaction Distribution</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { type: 'New Registrations', count: 1247, percentage: 45, color: 'bg-primary' },
              { type: 'License Renewals', count: 892, percentage: 32, color: 'bg-success' },
              { type: 'Profile Updates', count: 456, percentage: 16, color: 'bg-warning' },
              { type: 'Verifications', count: 189, percentage: 7, color: 'bg-saffron' }
            ]?.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item?.type}</span>
                  <span className="text-sm text-gray-600">{item?.count?.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full ${item?.color} rounded-full transition-all`}
                    style={{ width: `${item?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainStats;