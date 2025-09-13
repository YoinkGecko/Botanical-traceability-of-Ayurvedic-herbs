import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTable = ({ transactions, loading, onExport }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const toggleRowExpansion = (transactionId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(transactionId)) {
      newExpanded?.delete(transactionId);
    } else {
      newExpanded?.add(transactionId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', icon: 'Clock' },
      rejected: { bg: 'bg-error/10', text: 'text-error', icon: 'XCircle' },
      expired: { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'AlertTriangle' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const getTransactionTypeIcon = (type) => {
    const typeIcons = {
      registration: 'UserPlus',
      renewal: 'RefreshCw',
      modification: 'Edit',
      suspension: 'UserX',
      verification: 'Shield'
    };
    return typeIcons?.[type] || 'FileText';
  };

  const formatHash = (hash) => {
    return `${hash?.substring(0, 8)}...${hash?.substring(hash?.length - 8)}`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="mandala-spinner w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="text-gray-600">Searching blockchain...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Transaction Results</h3>
            <p className="text-sm text-gray-500">{transactions?.length} transactions found</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onExport('csv')}
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              onClick={() => onExport('pdf')}
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Timestamp</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Practitioner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((transaction) => (
              <React.Fragment key={transaction?.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{formatTimestamp(transaction?.timestamp)}</div>
                      <div className="text-xs text-gray-500">Block #{transaction?.blockNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Link" size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 font-mono">
                          {formatHash(transaction?.hash)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Gas: {transaction?.gasUsed?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTransactionTypeIcon(transaction?.type)} size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-900 capitalize">{transaction?.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction?.practitionerName}</div>
                      <div className="text-xs text-gray-500">ID: {transaction?.practitionerId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction?.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction?.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleRowExpansion(transaction?.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon 
                        name={expandedRows?.has(transaction?.id) ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </button>
                  </td>
                </tr>

                {/* Expanded Row Details */}
                {expandedRows?.has(transaction?.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-6 py-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Transaction Details */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <Icon name="FileText" size={16} />
                            <span>Transaction Details</span>
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Full Hash:</span>
                              <span className="text-sm font-mono text-gray-900 break-all">{transaction?.hash}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">From Address:</span>
                              <span className="text-sm font-mono text-gray-900">{formatHash(transaction?.fromAddress)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">To Address:</span>
                              <span className="text-sm font-mono text-gray-900">{formatHash(transaction?.toAddress)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Gas Price:</span>
                              <span className="text-sm text-gray-900">{transaction?.gasPrice} Gwei</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Nonce:</span>
                              <span className="text-sm text-gray-900">{transaction?.nonce}</span>
                            </div>
                          </div>
                        </div>

                        {/* Audit Trail */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <Icon name="Clock" size={16} />
                            <span>Audit Trail</span>
                          </h4>
                          
                          <div className="space-y-3">
                            {transaction?.auditTrail?.map((event, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  event?.status === 'completed' ? 'bg-success' : 
                                  event?.status === 'pending' ? 'bg-warning' : 'bg-gray-300'
                                }`}></div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{event?.action}</p>
                                      <p className="text-xs text-gray-500">by {event?.administrator}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {formatTimestamp(event?.timestamp)}
                                    </span>
                                  </div>
                                  {event?.notes && (
                                    <p className="text-xs text-gray-600 mt-1">{event?.notes}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Digital Signature Verification */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon name="Shield" size={16} className="text-success" />
                            <span className="text-sm font-medium text-gray-900">Digital Signature Verified</span>
                            <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                              RSA-2048 + SHA-256
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" iconName="Eye">
                              View Certificate
                            </Button>
                            <Button variant="outline" size="sm" iconName="Download">
                              Download Proof
                            </Button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {transactions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
          <Button variant="outline" iconName="RefreshCw">
            Refresh Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;