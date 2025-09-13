import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StateComplianceMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  const stateData = [
    { name: 'Maharashtra', compliance: 98, practitioners: 15420, color: '#10b981' },
    { name: 'Gujarat', compliance: 95, practitioners: 12350, color: '#10b981' },
    { name: 'Karnataka', compliance: 92, practitioners: 11200, color: '#10b981' },
    { name: 'Tamil Nadu', compliance: 89, practitioners: 13800, color: '#f59e0b' },
    { name: 'Rajasthan', compliance: 87, practitioners: 9650, color: '#f59e0b' },
    { name: 'Uttar Pradesh', compliance: 84, practitioners: 18900, color: '#f59e0b' },
    { name: 'West Bengal', compliance: 81, practitioners: 8750, color: '#ef4444' },
    { name: 'Bihar', compliance: 78, practitioners: 7200, color: '#ef4444' },
    { name: 'Odisha', compliance: 76, practitioners: 5400, color: '#ef4444' },
    { name: 'Madhya Pradesh', compliance: 73, practitioners: 6800, color: '#ef4444' }
  ];

  const getComplianceLevel = (compliance) => {
    if (compliance >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (compliance >= 80) return { level: 'Good', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const topPerformers = stateData?.sort((a, b) => b?.compliance - a?.compliance)?.slice(0, 5);

  const needsAttention = stateData?.sort((a, b) => a?.compliance - b?.compliance)?.slice(0, 3);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon name="Map" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">State Compliance Overview</h3>
            <p className="text-sm text-gray-500">Regional performance metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-600">≥90%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-xs text-gray-600">80-89%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-600">&lt;80%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-amber-500" />
            <span>Top Performing States</span>
          </h4>
          <div className="space-y-3">
            {topPerformers?.map((state, index) => {
              const level = getComplianceLevel(state?.compliance);
              return (
                <div
                  key={state?.name}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedState(state)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{state?.name}</p>
                      <p className="text-xs text-gray-500">{state?.practitioners?.toLocaleString()} practitioners</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${level?.bg} ${level?.color}`}>
                      {state?.compliance}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{level?.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Needs Attention */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-red-500" />
            <span>Requires Attention</span>
          </h4>
          <div className="space-y-3">
            {needsAttention?.map((state) => {
              const level = getComplianceLevel(state?.compliance);
              return (
                <div
                  key={state?.name}
                  className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50/50 cursor-pointer transition-colors hover:bg-red-50"
                  onClick={() => setSelectedState(state)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full status-pulse"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{state?.name}</p>
                      <p className="text-xs text-gray-500">{state?.practitioners?.toLocaleString()} practitioners</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${level?.bg} ${level?.color}`}>
                      {state?.compliance}%
                    </div>
                    <p className="text-xs text-red-600 mt-1 font-medium">Action Required</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions for Low Performers */}
          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
            <h5 className="text-sm font-medium text-amber-800 mb-2">Recommended Actions</h5>
            <div className="space-y-2">
              <button className="w-full text-left text-xs text-amber-700 hover:text-amber-800 flex items-center space-x-2">
                <Icon name="Send" size={12} />
                <span>Send compliance reminder to district admins</span>
              </button>
              <button className="w-full text-left text-xs text-amber-700 hover:text-amber-800 flex items-center space-x-2">
                <Icon name="Calendar" size={12} />
                <span>Schedule training sessions</span>
              </button>
              <button className="w-full text-left text-xs text-amber-700 hover:text-amber-800 flex items-center space-x-2">
                <Icon name="FileText" size={12} />
                <span>Generate detailed compliance report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* National Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(stateData?.reduce((acc, state) => acc + state?.compliance, 0) / stateData?.length)}%
            </p>
            <p className="text-sm text-gray-500">National Average</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stateData?.filter(state => state?.compliance >= 90)?.length}
            </p>
            <p className="text-sm text-gray-500">Excellent States</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {stateData?.filter(state => state?.compliance >= 80 && state?.compliance < 90)?.length}
            </p>
            <p className="text-sm text-gray-500">Good States</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {stateData?.filter(state => state?.compliance < 80)?.length}
            </p>
            <p className="text-sm text-gray-500">Need Improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateComplianceMap;