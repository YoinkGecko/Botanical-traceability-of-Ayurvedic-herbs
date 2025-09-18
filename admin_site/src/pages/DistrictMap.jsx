// DistrictMap.jsx
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Predefined areas for each district
const DISTRICT_AREAS = {
  mumbai: {
    center: [19.076, 72.8777],
    green: [
      [
        [19.08, 72.87],
        [19.085, 72.87],
        [19.085, 72.88],
        [19.08, 72.88],
      ],
    ],
    red: [
      [
        [19.07, 72.87],
        [19.075, 72.87],
        [19.075, 72.88],
        [19.07, 72.88],
      ],
    ],
  },
  panvel: {
    center: [18.9822, 73.1187],
    green: [
      [
        [18.985, 73.115],
        [18.99, 73.115],
        [18.99, 73.12],
        [18.985, 73.12],
      ],
    ],
    red: [
      [
        [18.98, 73.115],
        [18.982, 73.115],
        [18.982, 73.118],
        [18.98, 73.118],
      ],
    ],
  },
  thane: {
    center: [19.2183, 72.9781],
    green: [
      [
        [19.22, 72.97],
        [19.225, 72.97],
        [19.225, 72.98],
        [19.22, 72.98],
      ],
    ],
    red: [
      [
        [19.215, 72.97],
        [19.218, 72.97],
        [19.218, 72.975],
        [19.215, 72.975],
      ],
    ],
  },
  pune: {
    center: [18.5204, 73.8567],
    green: [
      [
        [18.525, 73.85],
        [18.53, 73.85],
        [18.53, 73.855],
        [18.525, 73.855],
      ],
    ],
    red: [
      [
        [18.52, 73.85],
        [18.523, 73.85],
        [18.523, 73.852],
        [18.52, 73.852],
      ],
    ],
  },
};

const DistrictMap = ({ district, location, message }) => {
  useEffect(() => {
    if (!district) return;
    const districtData = DISTRICT_AREAS[district.toLowerCase()];
    if (!districtData) return;

    const { center, green, red } = districtData;

    const map = L.map("map").setView(center, 13);

    L.tileLayer(
      "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      }
    ).addTo(map);

    // Green areas
    green.forEach((coords, i) => {
      const polygon = L.polygon(coords, {
        color: "green",
        fillOpacity: 0.5,
      }).addTo(map);
      polygon.bindPopup(`✅ Green Area ${i + 1} in ${district}`);
      polygon.on("mouseover", function () {
        this.openPopup();
      });
      polygon.on("mouseout", function () {
        this.closePopup();
      });
    });

    // Red areas
    red.forEach((coords, i) => {
      const polygon = L.polygon(coords, {
        color: "red",
        fillOpacity: 0.5,
      }).addTo(map);
      polygon.bindPopup(`❌ Red Area ${i + 1} in ${district}`);
      polygon.on("mouseover", function () {
        this.openPopup();
      });
      polygon.on("mouseout", function () {
        this.closePopup();
      });
    });

    // Single marker passed as prop
    if (location && message) {
      const coordsArray = location.split(",").map(Number);
      const marker = L.marker(coordsArray).addTo(map);
      marker.bindPopup(message);
      marker.on("mouseover", function () {
        this.openPopup();
      });
      marker.on("mouseout", function () {
        this.closePopup();
      });
    }

    return () => {
      map.remove();
    };
  }, [district, location, message]);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default DistrictMap;
