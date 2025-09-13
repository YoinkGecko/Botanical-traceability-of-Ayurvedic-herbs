import React from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainIntegrityMonitor = ({ blockchainData }) => {
  const getHealthColor = (health) => {
    switch (health?.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Blockchain Integrity Monitor</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Health */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Network Health</h3>
            
            <div className="space-y-3">
              {blockchainData?.networkMetrics?.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Activity" size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{metric?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-900">{metric?.value}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(metric?.status)}`}>
                      {metric?.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block Validation */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Block Validation</h3>
            
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Latest Block</span>
                  <span className="text-sm font-mono text-gray-900">#{blockchainData?.latestBlock?.number}</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Hash: {blockchainData?.latestBlock?.hash}</div>
                  <div>Timestamp: {blockchainData?.latestBlock?.timestamp}</div>
                  <div>Transactions: {blockchainData?.latestBlock?.transactions}</div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Validation Status</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  All blocks validated successfully. No integrity issues detected.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Monitoring */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-4">Recent Transactions</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Transaction ID</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Type</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">From</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blockchainData?.recentTransactions?.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-mono text-xs">{tx?.id}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {tx?.type}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-600">{tx?.from}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={12} className="text-green-600" />
                        <span className="text-green-600 text-xs">Confirmed</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-gray-500">{tx?.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainIntegrityMonitor;