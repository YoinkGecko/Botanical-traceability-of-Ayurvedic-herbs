import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import StakeholderKPICard from "./components/StakeholderKPICard";
import VerificationFunnelChart from "./components/VerificationFunnelChart";
import RecentSubmissionsTable from "./components/RecentSubmissionsTable";
import GeographicHeatMap from "./components/GeographicHeatMap";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import AllStakeholderDataTable from "./components/AllStakeholderDataTable";

const SupplyChainOverviewDashboard = () => {
  const [isHeatMapVisible, setIsHeatMapVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showAllDataView, setShowAllDataView] = useState(false);

  // Mock data for verification funnel
  const verificationFunnelData = [
    { name: "Submissions", value: 3126, rate: 100 },
    { name: "Initial Review", value: 2894, rate: 92.6 },
    { name: "Lab Testing", value: 2567, rate: 82.1 },
    { name: "Processing", value: 2234, rate: 71.5 },
    { name: "Approved", value: 2089, rate: 66.8 },
  ];

  // Enhanced mock data with location coordinates for comprehensive view
  const allStakeholderData = [
    // Farmers
    {
      id: 1,
      submissionId: "SUB-2024-001234",
      stakeholderName: "Green Valley Farms",
      stakeholderType: "Farmer",
      submissionType: "Crop Data",
      status: "Approved",
      timestamp: new Date(Date.now() - 1800000),
      location: {
        latitude: 40.7128,
        longitude: -74.006,
        address: "123 Farm Road, Green Valley, NY 12345",
        region: "Northeast",
      },
    },
    {
      id: 2,
      submissionId: "SUB-2024-001238",
      stakeholderName: "Sunrise Farms",
      stakeholderType: "Farmer",
      submissionType: "Harvest Report",
      status: "Approved",
      timestamp: new Date(Date.now() - 9000000),
      location: {
        latitude: 41.8781,
        longitude: -87.6298,
        address: "456 Sunrise Avenue, Midwest, IL 60614",
        region: "Midwest",
      },
    },
    {
      id: 3,
      submissionId: "SUB-2024-001242",
      stakeholderName: "Mountain View Farms",
      stakeholderType: "Farmer",
      submissionType: "Pesticide Report",
      status: "Pending",
      timestamp: new Date(Date.now() - 16200000),
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: "789 Mountain View Drive, California, CA 94102",
        region: "West Coast",
      },
    },
    {
      id: 4,
      submissionId: "SUB-2024-001246",
      stakeholderName: "Prairie Wind Farms",
      stakeholderType: "Farmer",
      submissionType: "Soil Analysis",
      status: "In Review",
      timestamp: new Date(Date.now() - 25200000),
      location: {
        latitude: 39.7392,
        longitude: -104.9903,
        address: "321 Prairie Wind Road, Denver, CO 80202",
        region: "Mountain West",
      },
    },
    {
      id: 5,
      submissionId: "SUB-2024-001247",
      stakeholderName: "Coastal Produce Co",
      stakeholderType: "Farmer",
      submissionType: "Organic Certification",
      status: "Approved",
      timestamp: new Date(Date.now() - 32400000),
      location: {
        latitude: 33.4484,
        longitude: -112.074,
        address: "654 Coastal Highway, Phoenix, AZ 85001",
        region: "Southwest",
      },
    },

    // Lab Testers
    {
      id: 6,
      submissionId: "SUB-2024-001235",
      stakeholderName: "AgriTest Labs",
      stakeholderType: "Lab Tester",
      submissionType: "Test Results",
      status: "Pending",
      timestamp: new Date(Date.now() - 3600000),
      location: {
        latitude: 42.3601,
        longitude: -71.0589,
        address: "100 Science Park Drive, Boston, MA 02101",
        region: "Northeast",
      },
    },
    {
      id: 7,
      submissionId: "SUB-2024-001239",
      stakeholderName: "Quality Labs Inc",
      stakeholderType: "Lab Tester",
      submissionType: "Soil Analysis",
      status: "Pending",
      timestamp: new Date(Date.now() - 10800000),
      location: {
        latitude: 29.7604,
        longitude: -95.3698,
        address: "200 Quality Street, Houston, TX 77002",
        region: "South",
      },
    },
    {
      id: 8,
      submissionId: "SUB-2024-001243",
      stakeholderName: "TechLab Solutions",
      stakeholderType: "Lab Tester",
      submissionType: "Chemical Analysis",
      status: "Rejected",
      timestamp: new Date(Date.now() - 18000000),
      location: {
        latitude: 47.6062,
        longitude: -122.3321,
        address: "300 Tech Center, Seattle, WA 98101",
        region: "Pacific Northwest",
      },
    },
    {
      id: 9,
      submissionId: "SUB-2024-001248",
      stakeholderName: "BioAnalysis Corp",
      stakeholderType: "Lab Tester",
      submissionType: "Microbiological Test",
      status: "Approved",
      timestamp: new Date(Date.now() - 36000000),
      location: {
        latitude: 25.7617,
        longitude: -80.1918,
        address: "400 Bio Lab Way, Miami, FL 33101",
        region: "Southeast",
      },
    },
    {
      id: 10,
      submissionId: "SUB-2024-001249",
      stakeholderName: "Precision Testing LLC",
      stakeholderType: "Lab Tester",
      submissionType: "Nutritional Analysis",
      status: "In Review",
      timestamp: new Date(Date.now() - 43200000),
      location: {
        latitude: 39.1612,
        longitude: -75.5264,
        address: "500 Precision Drive, Philadelphia, PA 19102",
        region: "Mid-Atlantic",
      },
    },

    // Processors
    {
      id: 11,
      submissionId: "SUB-2024-001236",
      stakeholderName: "Midwest Processing",
      stakeholderType: "Processor",
      submissionType: "Quality Report",
      status: "In Review",
      timestamp: new Date(Date.now() - 5400000),
      location: {
        latitude: 44.9778,
        longitude: -93.265,
        address: "600 Processing Plaza, Minneapolis, MN 55401",
        region: "Upper Midwest",
      },
    },
    {
      id: 12,
      submissionId: "SUB-2024-001240",
      stakeholderName: "Pacific Processors",
      stakeholderType: "Processor",
      submissionType: "Batch Report",
      status: "In Review",
      timestamp: new Date(Date.now() - 12600000),
      location: {
        latitude: 45.5152,
        longitude: -122.6784,
        address: "700 Pacific Industrial Blvd, Portland, OR 97201",
        region: "Pacific Northwest",
      },
    },
    {
      id: 13,
      submissionId: "SUB-2024-001244",
      stakeholderName: "Central Processing",
      stakeholderType: "Processor",
      submissionType: "Safety Report",
      status: "Approved",
      timestamp: new Date(Date.now() - 19800000),
      location: {
        latitude: 32.7767,
        longitude: -96.797,
        address: "800 Central Processing Way, Dallas, TX 75201",
        region: "South Central",
      },
    },
    {
      id: 14,
      submissionId: "SUB-2024-001250",
      stakeholderName: "Valley Food Processing",
      stakeholderType: "Processor",
      submissionType: "HACCP Compliance",
      status: "Approved",
      timestamp: new Date(Date.now() - 50400000),
      location: {
        latitude: 36.7783,
        longitude: -119.4179,
        address: "900 Valley Processing Road, Fresno, CA 93701",
        region: "Central Valley",
      },
    },
    {
      id: 15,
      submissionId: "SUB-2024-001251",
      stakeholderName: "Northeast Food Co",
      stakeholderType: "Processor",
      submissionType: "Traceability Report",
      status: "Pending",
      timestamp: new Date(Date.now() - 57600000),
      location: {
        latitude: 43.2081,
        longitude: -77.6109,
        address: "1000 Northeast Food Drive, Rochester, NY 14604",
        region: "Great Lakes",
      },
    },

    // Manufacturers
    {
      id: 16,
      submissionId: "SUB-2024-001237",
      stakeholderName: "FoodCorp Industries",
      stakeholderType: "Manufacturer",
      submissionType: "Production Data",
      status: "Rejected",
      timestamp: new Date(Date.now() - 7200000),
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
        address: "1100 Manufacturing Drive, Los Angeles, CA 90012",
        region: "Southern California",
      },
    },
    {
      id: 17,
      submissionId: "SUB-2024-001241",
      stakeholderName: "Global Foods Ltd",
      stakeholderType: "Manufacturer",
      submissionType: "Compliance Doc",
      status: "Approved",
      timestamp: new Date(Date.now() - 14400000),
      location: {
        latitude: 40.4406,
        longitude: -79.9959,
        address: "1200 Global Foods Avenue, Pittsburgh, PA 15219",
        region: "Rust Belt",
      },
    },
    {
      id: 18,
      submissionId: "SUB-2024-001245",
      stakeholderName: "Premium Foods Co",
      stakeholderType: "Manufacturer",
      submissionType: "Quality Audit",
      status: "In Review",
      timestamp: new Date(Date.now() - 21600000),
      location: {
        latitude: 30.2672,
        longitude: -97.7431,
        address: "1300 Premium Manufacturing, Austin, TX 78701",
        region: "Hill Country",
      },
    },
    {
      id: 19,
      submissionId: "SUB-2024-001252",
      stakeholderName: "Artisan Food Works",
      stakeholderType: "Manufacturer",
      submissionType: "Ingredient Sourcing",
      status: "Approved",
      timestamp: new Date(Date.now() - 64800000),
      location: {
        latitude: 39.9526,
        longitude: -75.1652,
        address: "1400 Artisan Way, Philadelphia, PA 19103",
        region: "Delaware Valley",
      },
    },
    {
      id: 20,
      submissionId: "SUB-2024-001253",
      stakeholderName: "Heritage Manufacturing",
      stakeholderType: "Manufacturer",
      submissionType: "Sustainability Report",
      status: "Pending",
      timestamp: new Date(Date.now() - 72000000),
      location: {
        latitude: 35.7796,
        longitude: -78.6382,
        address: "1500 Heritage Industrial Park, Raleigh, NC 27601",
        region: "Research Triangle",
      },
    },

    // Additional diverse entries for comprehensive view
    {
      id: 21,
      submissionId: "SUB-2024-001254",
      stakeholderName: "Desert Bloom Farms",
      stakeholderType: "Farmer",
      submissionType: "Water Usage Report",
      status: "Approved",
      timestamp: new Date(Date.now() - 79200000),
      location: {
        latitude: 36.1699,
        longitude: -115.1398,
        address: "1600 Desert Bloom Road, Las Vegas, NV 89101",
        region: "Mojave Desert",
      },
    },
    {
      id: 22,
      submissionId: "SUB-2024-001255",
      stakeholderName: "Alpine Testing Services",
      stakeholderType: "Lab Tester",
      submissionType: "Heavy Metals Analysis",
      status: "In Review",
      timestamp: new Date(Date.now() - 86400000),
      location: {
        latitude: 40.7589,
        longitude: -111.8883,
        address: "1700 Alpine Lab Complex, Salt Lake City, UT 84101",
        region: "Intermountain West",
      },
    },
    {
      id: 23,
      submissionId: "SUB-2024-001256",
      stakeholderName: "Gulf Coast Processing",
      stakeholderType: "Processor",
      submissionType: "Cold Chain Validation",
      status: "Approved",
      timestamp: new Date(Date.now() - 93600000),
      location: {
        latitude: 29.9511,
        longitude: -90.0715,
        address: "1800 Gulf Coast Industrial, New Orleans, LA 70112",
        region: "Gulf Coast",
      },
    },
    {
      id: 24,
      submissionId: "SUB-2024-001257",
      stakeholderName: "Innovation Foods Inc",
      stakeholderType: "Manufacturer",
      submissionType: "R&D Documentation",
      status: "Pending",
      timestamp: new Date(Date.now() - 100800000),
      location: {
        latitude: 37.3382,
        longitude: -121.8863,
        address: "1900 Innovation Drive, San Jose, CA 95112",
        region: "Silicon Valley",
      },
    },
  ];

  // Mock data for recent submissions
  const recentSubmissions = [
    {
      id: 1,
      submissionId: "SUB-2024-001234",
      stakeholderName: "Green Valley Farms",
      stakeholderType: "Farmer",
      submissionType: "Crop Data",
      status: "Approved",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: 2,
      submissionId: "SUB-2024-001235",
      stakeholderName: "AgriTest Labs",
      stakeholderType: "Lab Tester",
      submissionType: "Test Results",
      status: "Pending",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 3,
      submissionId: "SUB-2024-001236",
      stakeholderName: "Midwest Processing",
      stakeholderType: "Processor",
      submissionType: "Quality Report",
      status: "In Review",
      timestamp: new Date(Date.now() - 5400000),
    },
    {
      id: 4,
      submissionId: "SUB-2024-001237",
      stakeholderName: "FoodCorp Industries",
      stakeholderType: "Manufacturer",
      submissionType: "Production Data",
      status: "Rejected",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: 5,
      submissionId: "SUB-2024-001238",
      stakeholderName: "Sunrise Farms",
      stakeholderType: "Farmer",
      submissionType: "Harvest Report",
      status: "Approved",
      timestamp: new Date(Date.now() - 9000000),
    },
    {
      id: 6,
      submissionId: "SUB-2024-001239",
      stakeholderName: "Quality Labs Inc",
      stakeholderType: "Lab Tester",
      submissionType: "Soil Analysis",
      status: "Pending",
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: 7,
      submissionId: "SUB-2024-001240",
      stakeholderName: "Pacific Processors",
      stakeholderType: "Processor",
      submissionType: "Batch Report",
      status: "In Review",
      timestamp: new Date(Date.now() - 12600000),
    },
    {
      id: 8,
      submissionId: "SUB-2024-001241",
      stakeholderName: "Global Foods Ltd",
      stakeholderType: "Manufacturer",
      submissionType: "Compliance Doc",
      status: "Approved",
      timestamp: new Date(Date.now() - 14400000),
    },
    {
      id: 9,
      submissionId: "SUB-2024-001242",
      stakeholderName: "Mountain View Farms",
      stakeholderType: "Farmer",
      submissionType: "Pesticide Report",
      status: "Pending",
      timestamp: new Date(Date.now() - 16200000),
    },
    {
      id: 10,
      submissionId: "SUB-2024-001243",
      stakeholderName: "TechLab Solutions",
      stakeholderType: "Lab Tester",
      submissionType: "Chemical Analysis",
      status: "Rejected",
      timestamp: new Date(Date.now() - 18000000),
    },
    {
      id: 11,
      submissionId: "SUB-2024-001244",
      stakeholderName: "Central Processing",
      stakeholderType: "Processor",
      submissionType: "Safety Report",
      status: "Approved",
      timestamp: new Date(Date.now() - 19800000),
    },
    {
      id: 12,
      submissionId: "SUB-2024-001245",
      stakeholderName: "Premium Foods Co",
      stakeholderType: "Manufacturer",
      submissionType: "Quality Audit",
      status: "In Review",
      timestamp: new Date(Date.now() - 21600000),
    },
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
      const res = await fetch("http://localhost:5001/api/dashboard/kpis");
      const data = await res.json();
      setKpis(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch KPIs:", err);
    }
  };

  useEffect(() => {
    fetchKpis(); // fetch immediately
    const interval = setInterval(fetchKpis, 30000); // every 30 sec
    return () => clearInterval(interval); // cleanup
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
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
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
                  onClick={() => setShowAllDataView(!showAllDataView)}
                >
                  <Icon
                    name={showAllDataView ? "BarChart3" : "Table"}
                    size={16}
                    className="mr-2"
                  />
                  {showAllDataView ? "Dashboard View" : "Data Table View"}
                </Button>
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

          {/* Conditional View Rendering */}
          {showAllDataView ? (
            /* All Stakeholder Data Table View */
            <div className="mb-8">
              <AllStakeholderDataTable allData={allStakeholderData} />
            </div>
          ) : (
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
                <RecentSubmissionsTable submissions={recentSubmissions} />
              </div>
            </>
          )}
        </div>
      </main>
      {/* Geographic Heat Map Modal */}
      <GeographicHeatMap
        isVisible={isHeatMapVisible}
        onToggle={() => setIsHeatMapVisible(!isHeatMapVisible)}
        regionData={regionData}
      />
    </div>
  );
};

export default SupplyChainOverviewDashboard;
