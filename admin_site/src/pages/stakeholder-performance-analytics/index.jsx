import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import StakeholderTabs from "./components/StakeholderTabs";
import StakeholderVerificationTable from "./components/StakeholderVerificationTable";
import PerformanceMetrics from "./components/PerformanceMetrics";
import PerformanceTrendChart from "./components/PerformanceTrendChart";
import TopPerformersRanking from "./components/TopPerformersRanking";
import GeographicDistributionMap from "./components/GeographicDistributionMap";
import FilterControls from "./components/FilterControls";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const StakeholderPerformanceAnalytics = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const [activeTab, setActiveTab] = useState("farmers");
  const [filters, setFilters] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState("verification");

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);
  useEffect(() => {
    triggerRefresh();
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Simulate loading state
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBookmark = () => {
    // Simulate saving filter combination
    alert("Filter combination saved successfully!");
  };

  const handleExport = () => {
    // Simulate export functionality
    const exportData = {
      stakeholderType: activeTab,
      filters: filters,
      timestamp: new Date()?.toISOString(),
      format: "CSV",
    };

    console.log("Exporting data:", exportData);
    alert("Export initiated! Download will begin shortly.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Stakeholder Management
              </h1>
              <p className="text-muted-foreground">
                {currentView === "verification"
                  ? "Review and verify stakeholder applications across the supply chain"
                  : "Analyze individual stakeholder category performance and identify optimization opportunities across the supply chain"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* View Toggle */}
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setCurrentView("verification")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "verification"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name="UserCheck" size={16} className="mr-2 inline" />
                  Verification
                </button>
                <button
                  onClick={() => setCurrentView("analytics")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "analytics"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name="BarChart3" size={16} className="mr-2 inline" />
                  Analytics
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Conditional rendering based on current view */}
          {currentView === "verification" ? (
            <>
              {/* Stakeholder Category Tabs */}
              <StakeholderTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                re={refreshKey}
              />

              {/* Stakeholder Verification Table */}
              <StakeholderVerificationTable
                activeTab={activeTab}
                data={[]} // Pass actual data here when available
                re={refreshKey}
              />
            </>
          ) : (
            <>
              {/* Filter Controls */}
              <FilterControls
                onFiltersChange={handleFiltersChange}
                onBookmark={handleBookmark}
                onExport={handleExport}
                re={refreshKey}
              />

              {/* Stakeholder Category Tabs */}
              <StakeholderTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                re={refreshKey}
              />

              {/* Performance Metrics Strip */}
              <PerformanceMetrics activeTab={activeTab} re={refreshKey} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Performance Trend Chart - 8 cols equivalent */}
                <div className="xl:col-span-2">
                  <PerformanceTrendChart
                    activeTab={activeTab}
                    timePeriod={filters?.timePeriod}
                    re={refreshKey}
                  />
                </div>

                {/* Top Performers Ranking - 4 cols equivalent */}
                <div className="xl:col-span-1">
                  <TopPerformersRanking activeTab={activeTab} />
                </div>
              </div>

              {/* Geographic Distribution Map - Full Width */}
              <GeographicDistributionMap
                activeTab={activeTab}
                re={refreshKey}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StakeholderPerformanceAnalytics;
