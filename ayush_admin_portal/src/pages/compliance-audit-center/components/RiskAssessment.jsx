import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RiskAssessment = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const timeframes = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const riskMetrics = [
    {
      id: 1,
      category: "Practitioner Compliance",
      currentRisk: 23,
      previousRisk: 28,
      trend: "down",
      severity: "medium",
      factors: [
        "Expired certifications: 342 cases",
        "Missing documentation: 156 cases",
        "Continuing education gaps: 89 cases"
      ],
      recommendation: "Implement automated renewal reminders and streamline documentation process"
    },
    {
      id: 2,
      category: "Institutional Oversight",
      currentRisk: 45,
      previousRisk: 41,
      trend: "up",
      severity: "high",
      factors: [
        "Unregistered facilities: 23 detected",
        "Non-compliance with standards: 67 cases",
        "Inadequate reporting: 34 institutions"
      ],
      recommendation: "Increase field inspection frequency and strengthen reporting mechanisms"
    },
    {
      id: 3,
      category: "Regulatory Changes",
      currentRisk: 12,
      previousRisk: 15,
      trend: "down",
      severity: "low",
      factors: [
        "Policy update delays: 5 pending",
        "Communication gaps: 12 regions",
        "Training requirements: 3 new mandates"
      ],
      recommendation: "Enhance communication channels and accelerate policy implementation"
    },
    {
      id: 4,
      category: "Data Integrity",
      currentRisk: 34,
      previousRisk: 30,
      trend: "up",
      severity: "medium",
      factors: [
        "Inconsistent data entry: 234 records",
        "Missing blockchain verification: 45 transactions",
        "Audit trail gaps: 12 instances"
      ],
      recommendation: "Strengthen data validation protocols and mandatory blockchain verification"
    }
  ];

  const riskDistribution = [
    { level: 'Critical', count: 5, percentage: 8.2, color: 'bg-red-500' },
    { level: 'High', count: 12, percentage: 19.7, color: 'bg-orange-500' },
    { level: 'Medium', count: 28, percentage: 45.9, color: 'bg-yellow-500' },
    { level: 'Low', count: 16, percentage: 26.2, color: 'bg-green-500' }
  ];

  const getSeverityColor = (severity) => {
    const colorMap = {
      low: 'text-success bg-success/10 border-success/20',
      medium: 'text-warning bg-warning/10 border-warning/20',
      high: 'text-error bg-error/10 border-error/20',
      critical: 'text-red-700 bg-red-100 border-red-200'
    };
    return colorMap?.[severity] || colorMap?.medium;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-error' : 'text-success';
  };

  const getRiskGauge = (risk) => {
    const getGaugeColor = () => {
      if (risk >= 40) return 'text-error';
      if (risk >= 25) return 'text-warning';
      return 'text-success';
    };

    const getGaugeBackground = () => {
      if (risk >= 40) return 'bg-error';
      if (risk >= 25) return 'bg-warning';
      return 'bg-success';
    };

    return (
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${(risk / 100) * 175.93} 175.93`}
            className={getGaugeColor()}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${getGaugeColor()}`}>{risk}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Risk Assessment</h2>
            <p className="text-sm text-gray-500">Predictive compliance risk analysis and recommendations</p>
          </div>
          
          <div className="flex space-x-2">
            {timeframes?.map((timeframe) => (
              <button
                key={timeframe?.id}
                onClick={() => setSelectedTimeframe(timeframe?.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe?.id
                    ? 'bg-primary text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {timeframe?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Risk Distribution</h3>
            <div className="space-y-3">
              {riskDistribution?.map((item) => (
                <div key={item?.level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                    <span className="text-sm text-gray-700">{item?.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item?.count}</span>
                    <span className="text-xs text-gray-500">({item?.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Overall Risk Score</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${(28.5 / 100) * 251.33} 251.33`}
                    className="text-warning"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-warning">28.5</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Medium Risk</div>
                <div className="text-sm text-gray-500">Requires attention</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="TrendingDown" size={14} className="text-success" />
                  <span className="text-xs text-success">-3.2% from last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Risk Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {riskMetrics?.map((metric) => (
          <div key={metric?.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{metric?.category}</h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(metric?.severity)}`}>
                  {metric?.severity?.charAt(0)?.toUpperCase() + metric?.severity?.slice(1)} Risk
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{metric?.currentRisk}%</div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getTrendIcon(metric?.trend)} 
                      size={12} 
                      className={getTrendColor(metric?.trend)}
                    />
                    <span className={`text-xs ${getTrendColor(metric?.trend)}`}>
                      {Math.abs(metric?.currentRisk - metric?.previousRisk)}%
                    </span>
                  </div>
                </div>
                {getRiskGauge(metric?.currentRisk)}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Risk Factors
                </h4>
                <ul className="space-y-1">
                  {metric?.factors?.map((factor, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Recommendation
                </h4>
                <p className="text-xs text-gray-600">{metric?.recommendation}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-primary hover:text-primary/80 text-xs font-medium">
                View Detailed Analysis →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAssessment;