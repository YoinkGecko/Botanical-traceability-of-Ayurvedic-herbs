import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'Grid3X3' },
    { id: 'ayurveda', name: 'Ayurveda', icon: 'Leaf' },
    { id: 'yoga', name: 'Yoga & Naturopathy', icon: 'Heart' },
    { id: 'unani', name: 'Unani', icon: 'Stethoscope' },
    { id: 'siddha', name: 'Siddha', icon: 'Pill' },
    { id: 'homeopathy', name: 'Homeopathy', icon: 'Droplets' }
  ];

  const states = [
    { id: 'all', name: 'All States' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'gujarat', name: 'Gujarat' }
  ];

  const complianceData = [
    {
      id: 1,
      state: "Maharashtra",
      category: "Ayurveda",
      practitioners: 12450,
      compliant: 11678,
      pending: 542,
      violations: 230,
      complianceRate: 93.8,
      lastAudit: "2025-01-08",
      riskLevel: "low"
    },
    {
      id: 2,
      state: "Karnataka",
      category: "Yoga & Naturopathy",
      practitioners: 8920,
      compliant: 8234,
      pending: 456,
      violations: 230,
      complianceRate: 92.3,
      lastAudit: "2025-01-10",
      riskLevel: "medium"
    },
    {
      id: 3,
      state: "Tamil Nadu",
      category: "Siddha",
      practitioners: 15670,
      compliant: 14890,
      pending: 623,
      violations: 157,
      complianceRate: 95.0,
      lastAudit: "2025-01-05",
      riskLevel: "low"
    },
    {
      id: 4,
      state: "Kerala",
      category: "Ayurveda",
      practitioners: 9840,
      compliant: 8956,
      pending: 734,
      violations: 150,
      complianceRate: 91.0,
      lastAudit: "2025-01-12",
      riskLevel: "medium"
    },
    {
      id: 5,
      state: "Gujarat",
      category: "Homeopathy",
      practitioners: 6780,
      compliant: 6234,
      pending: 398,
      violations: 148,
      complianceRate: 91.9,
      lastAudit: "2025-01-07",
      riskLevel: "medium"
    }
  ];

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      low: { color: 'bg-success/10 text-success', label: 'Low Risk' },
      medium: { color: 'bg-warning/10 text-warning', label: 'Medium Risk' },
      high: { color: 'bg-error/10 text-error', label: 'High Risk' }
    };
    
    const config = riskConfig?.[riskLevel] || riskConfig?.medium;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getComplianceBar = (rate) => {
    const getBarColor = () => {
      if (rate >= 95) return 'bg-success';
      if (rate >= 90) return 'bg-warning';
      return 'bg-error';
    };

    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getBarColor()}`}
            style={{ width: `${rate}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
          {rate?.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Compliance Matrix</h2>
            <p className="text-sm text-gray-500">State-wise compliance tracking across AYUSH categories</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {states?.map((state) => (
                <option key={state?.id} value={state?.id}>
                  {state?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State/Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Practitioners
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Audit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complianceData?.map((item) => (
              <tr key={item?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item?.state}</div>
                    <div className="text-sm text-gray-500">{item?.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item?.practitioners?.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    {item?.compliant?.toLocaleString()} compliant
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-32">
                    {getComplianceBar(item?.complianceRate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="text-xs text-gray-600">{item?.pending} pending</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-error rounded-full"></div>
                      <span className="text-xs text-gray-600">{item?.violations} violations</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRiskBadge(item?.riskLevel)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.lastAudit)?.toLocaleDateString('en-IN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="text-primary hover:text-primary/80 p-1">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <Icon name="Download" size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceMatrix;