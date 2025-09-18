import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import StakeholderKPICard from "./components/StakeholderKPICard";
import VerificationFunnelChart from "./components/VerificationFunnelChart";
import RecentSubmissionsTable from "./components/RecentSubmissionsTable";
import GeographicHeatMap from "./components/GeographicHeatMap";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import DistrictMap from "pages/DistrictMap";
import DistrictMapWrapper from "./DistrictMapWrapper";

const SupplyChainOverviewDashboard = () => {
  const [isHeatMapVisible, setIsHeatMapVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dis, setdis] = useState("");
  const [funneldata, setFunneldata] = useState({
    Submissions: 0,
    labTesting: 0,
    Processing: 0,
    Approved: 0,
  });

  const fetchfunneldata = async () => {
    try {
      const district = localStorage.getItem("district");

      const res = await fetch(
        `http://localhost:5001/api/dashboard/funneldata?district=${district}`
      );

      const data = await res.json();
      setFunneldata(data);
    } catch (err) {
      console.error("Failed to fetch KPIs:", err);
    }
  };

  const verificationFunnelData = [
    { name: "Submissions", value: funneldata.Submissions },
    { name: "Inital review", value: 4 },
    { name: "Farmer", value: funneldata.farmer },
    { name: "Lab Testing", value: funneldata.labTesting },
    { name: "Processing", value: funneldata.Processing },
    { name: "Manufacturing", value: funneldata.man },
    { name: "Approved", value: funneldata.Approved },
    { name: "Rejected", value: funneldata.Rejected || 0 },
  ];

  // Mock data for geographic regions
  const regionData = [
    {
      id: 1,
      name: "California Central Valley",
      activityCount: 156,
      farmers: 89,
      labs: 12,
      processors: 8,
      manufacturers: 3,
      verificationRate: 94.2,
      avgProcessingTime: 2.3,
    },
    {
      id: 2,
      name: "Midwest Corn Belt",
      activityCount: 234,
      farmers: 145,
      labs: 18,
      processors: 15,
      manufacturers: 6,
      verificationRate: 91.8,
      avgProcessingTime: 3.1,
    },
    {
      id: 3,
      name: "Pacific Northwest",
      activityCount: 87,
      farmers: 52,
      labs: 8,
      processors: 6,
      manufacturers: 2,
      verificationRate: 88.5,
      avgProcessingTime: 2.8,
    },
    {
      id: 4,
      name: "Southeast Agricultural",
      activityCount: 123,
      farmers: 78,
      labs: 10,
      processors: 9,
      manufacturers: 4,
      verificationRate: 92.7,
      avgProcessingTime: 2.6,
    },
    {
      id: 5,
      name: "Great Plains",
      activityCount: 198,
      farmers: 124,
      labs: 15,
      processors: 12,
      manufacturers: 5,
      verificationRate: 90.3,
      avgProcessingTime: 3.4,
    },
    {
      id: 6,
      name: "Northeast Corridor",
      activityCount: 76,
      farmers: 45,
      labs: 7,
      processors: 5,
      manufacturers: 3,
      verificationRate: 95.1,
      avgProcessingTime: 2.1,
    },
  ];

  const [kpis, setKpis] = useState({
    farmers: 0,
    labTesters: 0,
    processors: 0,
    manufacturers: 0,
  });

  const fetchKpis = async () => {
    try {
      const district = localStorage.getItem("district");

      const res = await fetch(
        `http://localhost:5001/api/dashboard/kpis?district=${encodeURIComponent(
          district
        )}`
      );

      const data = await res.json();
      setKpis(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch KPIs:", err);
    }
  };

  useEffect(() => {
    setdis(localStorage.getItem("district"));
    const phone = localStorage.getItem("phonenumber");
    if (phone) {
      fetch(`http://localhost:5001/api/admin/district/${phone}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.district) localStorage.setItem("district", data.district);
        })
        .catch((err) => console.error("Error fetching district:", err));
    }

    const fetchAll = async () => {
      await fetchKpis(); // KPI counts
      await fetchfunneldata(); // Funnel counts
      setLastUpdated(new Date());
    };

    fetchAll();
    const interval = setInterval(fetchAll, 10000); // every 30 sec
    return () => clearInterval(interval);
  }, []);

  const stakeholderKPIs = [
    {
      title: "Active Farmers",
      count: kpis.farmers,
      trend: "up",
      trendPercentage: 12.5,
      icon: "Wheat",
      iconColor: "white",
      bgColor: "bg-success",
    },
    {
      title: "Lab Testers",
      count: kpis.labTesters,
      trend: "up",
      trendPercentage: 8.3,
      icon: "FlaskConical",
      iconColor: "white",
      bgColor: "bg-primary",
    },
    {
      title: "Processors",
      count: kpis.processors,
      trend: "down",
      trendPercentage: 3.2,
      icon: "Factory",
      iconColor: "white",
      bgColor: "bg-secondary",
    },
    {
      title: "Manufacturers",
      count: kpis.manufacturers,
      trend: "up",
      trendPercentage: 15.7,
      icon: "Building2",
      iconColor: "white",
      bgColor: "bg-accent",
    },
  ];

  const formatLastUpdated = (date) => {
    return date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {isHeatMapVisible ? <></> : <Header />}
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Supply Chain Overview
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive monitoring and analytics for agricultural supply
                  chain operations
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last updated</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatLastUpdated(lastUpdated)}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsHeatMapVisible(true)}
                >
                  <Icon name="Map" size={16} className="mr-2" />
                  View Heat Map
                </Button>
              </div>
            </div>
          </div>

          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {stakeholderKPIs?.map((kpi, index) => (
                <StakeholderKPICard
                  key={index}
                  title={kpi?.title}
                  count={kpi?.count}
                  trend={kpi?.trend}
                  trendPercentage={kpi?.trendPercentage}
                  icon={kpi?.icon}
                  iconColor={kpi?.iconColor}
                  bgColor={kpi?.bgColor}
                />
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Verification Funnel Chart */}
              <div className="xl:col-span-3 flex justify-center">
                <div className="w-full max-w-3xl">
                  <VerificationFunnelChart data={verificationFunnelData} />
                </div>
              </div>

              {/* Alert Feed */}
            </div>

            {/* Recent Submissions Table */}
            <div className="mb-8">
              <RecentSubmissionsTable
                district={localStorage.getItem("district")}
              />
            </div>
          </>
        </div>
      </main>
      {/* Geographic Heat Map Modal */}
      {isHeatMapVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)", // dark backdrop
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "90%",
              height: "80%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsHeatMapVisible(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1000,
                background: "red",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>

            {/* Map component */}
            {isHeatMapVisible && (
              <DistrictMapWrapper
                district={localStorage.getItem("district")}
                onClose={() => setIsHeatMapVisible(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplyChainOverviewDashboard;
