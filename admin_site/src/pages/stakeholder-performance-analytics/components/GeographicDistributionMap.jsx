import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const GeographicDistributionMap = ({ activeTab }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const generateRegionData = () => {
    const regions = [
      {
        id: "west",
        name: "West Coast",
        lat: 37.7749,
        lng: -122.4194,
        count: 847,
        performance: 94.2,
      },
      {
        id: "midwest",
        name: "Midwest",
        lat: 41.8781,
        lng: -87.6298,
        count: 1234,
        performance: 92.8,
      },
      {
        id: "south",
        name: "South",
        lat: 32.7767,
        lng: -96.797,
        count: 956,
        performance: 89.5,
      },
      {
        id: "northeast",
        name: "Northeast",
        lat: 40.7128,
        lng: -74.006,
        count: 678,
        performance: 96.1,
      },
      {
        id: "southwest",
        name: "Southwest",
        lat: 33.4484,
        lng: -112.074,
        count: 543,
        performance: 87.3,
      },
    ];

    return regions?.map((region) => ({
      ...region,
      color:
        region?.performance >= 95
          ? "#22c55e"
          : region?.performance >= 90
          ? "#f59e0b"
          : "#ef4444",
    }));
  };

  const regionData = generateRegionData();

  const getPerformanceColor = (performance) => {
    if (performance >= 95) return "text-green-600 bg-green-50";
    if (performance >= 90) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Geographic Distribution
          </h3>
          <p className="text-sm text-muted-foreground">
            Stakeholder locations with performance indicators
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div
            className="relative bg-muted rounded-lg overflow-hidden"
            style={{ height: "400px" }}
          >
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Stakeholder Geographic Distribution"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=39.8283,-98.5795&z=4&output=embed"
              className="border-0"
            />

            {/* Performance Overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none">
              <div className="absolute top-4 left-4 bg-card rounded-lg p-3 shadow-card">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {regionData
                      ?.reduce((sum, region) => sum + region?.count, 0)
                      ?.toLocaleString()}{" "}
                    Total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistributionMap;
