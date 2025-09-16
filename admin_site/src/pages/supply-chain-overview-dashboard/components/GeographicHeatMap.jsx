import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GeographicHeatMap = ({ isVisible, onToggle, district }) => {
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
                  Geographic Activity Heat Map of {district}
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
              <div className="lg:col-span-4 bg-muted/30 rounded-lg p-6 relative">
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
    <title>Mumbai Heat Map</title>
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
      var map = L.map("map").setView([19.0760, 72.8777], 12); // Mumbai center
      L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);

     // ✅ Green polygon (Airport + Andheri zone)
var greenArea = L.polygon([
  [19.07, 72.82], // SW corner
  [19.15, 72.82], // NW corner
  [19.15, 72.91], // NE corner
  [19.07, 72.91]  // SE corner
], { color: "green", fillOpacity: 0.5 }).addTo(map);

greenArea.bindPopup("✅ Green Zone: Airport + Andheri East");


// ❌ Red polygon with a HOLE where the green area is
var redArea = L.polygon([
  // Outer red polygon (big Mumbai bounding box)
  [
    [18.90, 72.75], // Bottom-left
    [19.30, 72.75], // Top-left
    [19.30, 73.05], // Top-right
    [18.90, 73.05]  // Bottom-right
  ],
  // Inner hole (same as green polygon coords)
  [
    [19.07, 72.82],
    [19.15, 72.82],
    [19.15, 72.91],
    [19.07, 72.91]
  ]
], { color: "red", fillOpacity: 0.4 }).addTo(map);

redArea.bindPopup("❌ Red Zone: Restricted Area (excluding Airport Zone)");
      redArea.on("mouseover", function (e) { this.openPopup(e.latlng); });
      redArea.on("mouseout", function () { this.closePopup(); });

      // 🌿 Markers in Mumbai
      var locations = [
        { name: "🌿 Ramesh - Andheri", coords: [19.119, 72.846] },
        { name: "🌿 Suresh - Bandra", coords: [19.059, 72.829] },
        { name: "🌿 Kuresh - Colaba", coords: [18.907, 72.814] },
        { name: "🌿 Puresh - Powai", coords: [19.118, 72.905] }
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatMap;
