import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GeographicHeatMap = ({ isVisible, onToggle, regionData }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const getActivityLevel = (count) => {
    if (count >= 100) return "high";
    if (count >= 50) return "medium";
    if (count >= 20) return "low";
    return "minimal";
  };

  const getActivityColor = (level) => {
    switch (level) {
      case "high":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-primary text-primary-foreground";
      case "minimal":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8 h-full">
        <div className="bg-card rounded-lg border border-border shadow-modal h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Geographic Activity Heat Map
                </h2>
                <p className="text-sm text-muted-foreground">
                  Regional distribution of stakeholder activities
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <Icon name="X" size={24} />
              </Button>
            </div>
          </div>

          {/* Map Content */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              {/* Map Area */}
              <div className="lg:col-span-3 bg-muted/30 rounded-lg p-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* ⬇️ Leaflet map via srcDoc */}
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Leaflet Map"
                    className="rounded-lg"
                    style={{ border: 0 }}
                    srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <title>Leaflet Green & Red Areas with Hover Info</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
      html, body { height:100%; margin:0; padding:0; }
      #map { height:100%; width:100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      var map = L.map("map").setView([28.6139, 77.2090], 12);
      L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);

      // Green polygon
      var greenArea = L.polygon([[28.6139, 77.2090],[28.6239, 77.2090],[28.6239, 77.2190],[28.6139, 77.2190]], { color: "green", fillOpacity: 0.5 }).addTo(map);
      greenArea.bindPopup("✅ Green Zone: Suitable Area");
      greenArea.on("mouseover", function (e) { this.openPopup(e.latlng); });
      greenArea.on("mouseout", function () { this.closePopup(); });

      // Red polygon
      var redArea = L.polygon([[28.6039, 77.1990],[28.6139, 77.1990],[28.6139, 77.2090],[28.6039, 77.2090]], { color: "red", fillOpacity: 0.5 }).addTo(map);
      redArea.bindPopup("❌ Red Zone: Restricted Area");
      redArea.on("mouseover", function (e) { this.openPopup(e.latlng); });
      redArea.on("mouseout", function () { this.closePopup(); });

      // Markers
      var locations = [
        { name: "🌿 Ashwagandha Farm", coords: [28.6139, 77.2090] },
        { name: "🌿 Aloe Vera Field", coords: [28.6189, 77.2150] },
        { name: "🌿 Tulsi Plantation", coords: [28.6089, 77.2000] },
        { name: "🌿 Neem Garden", coords: [28.6200, 77.2200] }
      ];
      locations.forEach(function (loc) {
        var marker = L.marker(loc.coords).addTo(map);
        marker.bindPopup("<b>" + loc.name + "</b><br>Lat: " + loc.coords[0] + "<br>Lng: " + loc.coords[1]);
        marker.on("mouseover", function () { this.openPopup(); });
        marker.on("mouseout", function () { this.closePopup(); });
      });
    </script>
  </body>
</html>`}
                  />
                </div>

                {/* Activity Overlay Points */}
                <div className="absolute inset-0 pointer-events-none">
                  {regionData?.map((region, index) => (
                    <div
                      key={region?.id}
                      className={`absolute w-4 h-4 rounded-full ${getActivityColor(
                        getActivityLevel(region?.activityCount)
                      )} opacity-80 animate-pulse pointer-events-auto cursor-pointer`}
                      style={{
                        left: `${20 + ((index * 15) % 60)}%`,
                        top: `${30 + ((index * 10) % 40)}%`,
                      }}
                      onClick={() => setSelectedRegion(region)}
                      title={`${region?.name}: ${region?.activityCount} activities`}
                    />
                  ))}
                </div>
              </div>

              {/* Right-side details (unchanged) */}
              <div className="space-y-4">
                {/* Legend */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Activity Legend
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-xs text-muted-foreground">
                        High (100+)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-xs text-muted-foreground">
                        Medium (50-99)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-xs text-muted-foreground">
                        Low (20-49)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-muted rounded-full"></div>
                      <span className="text-xs text-muted-foreground">
                        Minimal (&lt;20)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Region list */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Regional Summary
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {regionData?.map((region) => (
                      <div
                        key={region?.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-smooth ${
                          selectedRegion?.id === region?.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedRegion(region)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {region?.name}
                          </h4>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              getActivityColor(
                                getActivityLevel(region?.activityCount)
                              )?.split(" ")?.[0]
                            }`}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              Farmers:
                            </span>
                            <span className="font-medium text-foreground ml-1">
                              {region?.farmers}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Labs:</span>
                            <span className="font-medium text-foreground ml-1">
                              {region?.labs}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Processors:
                            </span>
                            <span className="font-medium text-foreground ml-1">
                              {region?.processors}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Manufacturers:
                            </span>
                            <span className="font-medium text-foreground ml-1">
                              {region?.manufacturers}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Region details */}
                {selectedRegion && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-foreground mb-2">
                      {selectedRegion?.name} Details
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Activity:
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedRegion?.activityCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Verification Rate:
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedRegion?.verificationRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Avg Processing Time:
                        </span>
                        <span className="font-medium text-foreground">
                          {selectedRegion?.avgProcessingTime}h
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;
