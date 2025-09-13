import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainVisualization = ({ realtimeData }) => {
  const [animatingBlocks, setAnimatingBlocks] = useState(new Set());
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Mock blockchain visualization data
  const blockchainData = [
    {
      id: 'genesis',
      number: 0,
      hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      transactions: 1,
      timestamp: new Date('2024-01-01'),
      type: 'genesis',
      status: 'confirmed'
    },
    {
      id: 'block-1',
      number: 2847390,
      hash: '0x6d0a5b7c2d3e4f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
      transactions: 38,
      timestamp: new Date(Date.now() - 360000),
      type: 'regular',
      status: 'confirmed'
    },
    {
      id: 'block-2',
      number: 2847391,
      hash: '0x7e1a6b8c3d4e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
      transactions: 52,
      timestamp: new Date(Date.now() - 240000),
      type: 'regular',
      status: 'confirmed'
    },
    {
      id: 'block-3',
      number: 2847392,
      hash: '0x8f2a7b9c4d5e6f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
      transactions: 47,
      timestamp: new Date(Date.now() - 120000),
      type: 'regular',
      status: 'confirmed'
    },
    {
      id: 'block-4',
      number: 2847393,
      hash: '0x9a3b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9',
      transactions: 23,
      timestamp: new Date(Date.now() - 30000),
      type: 'regular',
      status: 'pending'
    }
  ];

  const transactionTypes = [
    { type: 'registration', icon: 'UserPlus', color: 'text-primary', label: 'Registration' },
    { type: 'renewal', icon: 'RefreshCw', color: 'text-success', label: 'Renewal' },
    { type: 'modification', icon: 'Edit', color: 'text-warning', label: 'Modification' },
    { type: 'verification', icon: 'Shield', color: 'text-saffron', label: 'Verification' }
  ];

  useEffect(() => {
    // Simulate new block animation
    const interval = setInterval(() => {
      const latestBlock = blockchainData?.[blockchainData?.length - 1];
      if (latestBlock && latestBlock?.status === 'pending') {
        setAnimatingBlocks(prev => new Set([...prev, latestBlock.id]));
        setTimeout(() => {
          setAnimatingBlocks(prev => {
            const newSet = new Set(prev);
            newSet?.delete(latestBlock?.id);
            return newSet;
          });
        }, 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatHash = (hash) => {
    return `${hash?.substring(0, 8)}...${hash?.substring(hash?.length - 8)}`;
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getBlockStatus = (block) => {
    if (block?.status === 'pending') {
      return {
        bg: 'bg-warning/10 border-warning/30',
        pulse: 'blockchain-pulse',
        icon: 'Clock',
        iconColor: 'text-warning'
      };
    }
    return {
      bg: 'bg-success/10 border-success/30',
      pulse: '',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    };
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Visualization Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Icon name="GitBranch" size={20} className="text-primary" />
              <span>Blockchain Visualization</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">Real-time view of transaction blocks and network activity</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
              <span className="text-sm text-success font-medium">Live Updates</span>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View Full Chain
            </button>
          </div>
        </div>

        {/* Transaction Type Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Transaction Types:</span>
          {transactionTypes?.map((type, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={type?.icon} size={14} className={type?.color} />
              <span className="text-sm text-gray-600">{type?.label}</span>
            </div>
          ))}
        </div>

        {/* Blockchain Chain Visualization */}
        <div className="relative">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4">
            {blockchainData?.map((block, index) => {
              const status = getBlockStatus(block);
              const isAnimating = animatingBlocks?.has(block?.id);
              
              return (
                <div key={block?.id} className="flex items-center space-x-4 flex-shrink-0">
                  {/* Block */}
                  <div
                    className={`relative w-32 h-24 rounded-lg border-2 cursor-pointer transition-all duration-300 ${status?.bg} ${status?.pulse} ${
                      selectedBlock?.id === block?.id ? 'ring-2 ring-primary ring-offset-2' : ''
                    } ${isAnimating ? 'scale-110' : 'hover:scale-105'}`}
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="p-3 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-900">
                          {block?.type === 'genesis' ? 'Genesis' : `#${block?.number}`}
                        </span>
                        <Icon name={status?.icon} size={12} className={status?.iconColor} />
                      </div>
                      
                      <div>
                        <p className="text-xs font-mono text-gray-600 truncate">
                          {formatHash(block?.hash)}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{block?.transactions} txns</span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(block?.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* New block indicator */}
                    {isAnimating && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Plus" size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  {/* Connection Arrow */}
                  {index < blockchainData?.length - 1 && (
                    <div className="flex items-center">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <Icon name="ChevronRight" size={16} className="text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Next Block Placeholder */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <Icon name="ChevronRight" size={16} className="text-gray-400" />
              </div>
              <div className="w-32 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Plus" size={16} className="text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-400">Next Block</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Block Details */}
      {selectedBlock && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {selectedBlock?.type === 'genesis' ? 'Genesis Block' : `Block #${selectedBlock?.number}`}
            </h4>
            <button
              onClick={() => setSelectedBlock(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Block Hash</label>
                <p className="text-sm font-mono text-gray-900 break-all mt-1">{selectedBlock?.hash}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Block Number</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedBlock?.number?.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Transactions</label>
                  <p className="text-sm text-gray-900 mt-1">{selectedBlock?.transactions}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Timestamp</label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedBlock?.timestamp?.toLocaleString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  {selectedBlock?.status === 'confirmed' ? (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                      <Icon name="CheckCircle" size={12} />
                      <span>Confirmed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium">
                      <Icon name="Clock" size={12} />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Network Confirmations</label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedBlock?.status === 'confirmed' ? '6+ confirmations' : 'Awaiting confirmations'}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Block Size</label>
                <p className="text-sm text-gray-900 mt-1">2.4 KB</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Block Actions</span>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  View Transactions
                </button>
                <span className="text-gray-300">•</span>
                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  Download Block Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Real-time Activity Feed */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <span>Live Transaction Feed</span>
          </h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-sm text-success font-medium">Real-time</span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {realtimeData?.slice(0, 8)?.map((transaction, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTransactionTypeIcon(transaction?.type)} size={14} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction?.description}
                </p>
                <p className="text-xs text-gray-500">
                  {formatHash(transaction?.hash)} • {formatTimeAgo(transaction?.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">{transaction?.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function getTransactionTypeIcon(type) {
    const typeIcons = {
      registration: 'UserPlus',
      renewal: 'RefreshCw',
      modification: 'Edit',
      verification: 'Shield'
    };
    return typeIcons?.[type] || 'FileText';
  }
};

export default BlockchainVisualization;