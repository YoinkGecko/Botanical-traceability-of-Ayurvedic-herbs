// DistrictMapWrapper.jsx
import React, { useEffect, useState } from "react";
import DistrictMap from "../districtmaphome";

const DistrictMapWrapper = ({ district, onClose }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!district) return;

    const fetchMarkers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/map-locations?district=${encodeURIComponent(
            district
          )}`
        );
        const data = await res.json();
        setMarkers(data);
      } catch (err) {
        console.error("❌ Error fetching map data:", err);
      }
    };

    fetchMarkers();
  }, [district]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
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
          onClick={onClose}
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

        {/* Map Component */}
        <DistrictMap markers={markers} district={district} />
      </div>
    </div>
  );
};

export default DistrictMapWrapper;
