import React from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainFeed = () => {
  const transactions = [
    {
      id: "0x7a8b9c2d",
      type: "registration",
      practitioner: "Dr. Rajesh Kumar",
      location: "Delhi",
      timestamp: new Date(Date.now() - 300000),
      status: "confirmed",
      amount: "₹2,500"
    },
    {
      id: "0x4e5f6a1b",
      type: "renewal",
      practitioner: "Dr. Priya Sharma",
      location: "Mumbai",
      timestamp: new Date(Date.now() - 600000),
      status: "pending",
      amount: "₹1,800"
    },
    {
      id: "0x9c8d7e6f",
      type: "compliance",
      practitioner: "Dr. Amit Patel",
      location: "Gujarat",
      timestamp: new Date(Date.now() - 900000),
      status: "confirmed",
      amount: "₹500"
    },
    {
      id: "0x2b3c4d5e",
      type: "registration",
      practitioner: "Dr. Sunita Rao",
      location: "Karnataka",
      timestamp: new Date(Date.now() - 1200000),
      status: "confirmed",
      amount: "₹2,500"
    },
    {
      id: "0x6f7a8b9c",
      type: "renewal",
      practitioner: "Dr. Vikram Singh",
      location: "Rajasthan",
      timestamp: new Date(Date.now() - 1500000),
      status: "failed",
      amount: "₹1,800"
    }
  ];

  const getTransactionIcon = (type) => {
    const icons = {
      registration: 'UserPlus',
      renewal: 'RefreshCw',
      compliance: 'Shield'
    };
    return icons?.[type] || 'FileText';
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'text-green-600 bg-green-50',
      pending: 'text-amber-600 bg-amber-50',
      failed: 'text-red-600 bg-red-50'
    };
    return colors?.[status] || 'text-gray-600 bg-gray-50';
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Live Blockchain Feed</h3>
            <p className="text-sm text-gray-500">Real-time transaction monitoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full status-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {transactions?.map((transaction) => (
          <div key={transaction?.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon name={getTransactionIcon(transaction?.type)} size={16} className="text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction?.practitioner}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="font-mono">{transaction?.id}</span>
                <span>{transaction?.location}</span>
                <span>{transaction?.type}</span>
              </div>
            </div>
            
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-medium text-gray-900">{transaction?.amount}</p>
              <p className="text-xs text-gray-500">{formatTime(transaction?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default BlockchainFeed;