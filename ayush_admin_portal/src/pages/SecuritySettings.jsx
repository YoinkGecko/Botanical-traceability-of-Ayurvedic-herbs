// src/pages/SecuritySettings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    portVisibility: "private", // private or public
    showPortWarning: true,
    telemetryEnabled: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          ⚙️ Security Settings
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
        >
          ← Back to Dashboard
        </button>
      </motion.div>

      <div className="space-y-6">
        {/* Port Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Port Visibility
            </p>
            <p className="text-sm text-gray-500">
              Choose if forwarded ports are private or public.
            </p>
          </div>
          <select
            value={settings.portVisibility}
            onChange={(e) =>
              setSettings({ ...settings, portVisibility: e.target.value })
            }
            className="px-3 py-2 border rounded"
          >
            <option value="private">Private (localhost only)</option>
            <option value="public">Public (anyone can access)</option>
          </select>
        </motion.div>

        {/* Port Warning Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Show Port Warning
            </p>
            <p className="text-sm text-gray-500">
              Toggle the security warning when a port is exposed publicly.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showPortWarning}
              onChange={() => handleToggle("showPortWarning")}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-colors duration-300"></div>
            <span
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                settings.showPortWarning ? "translate-x-7" : "translate-x-0"
              }`}
            ></span>
          </label>
        </motion.div>

        {/* Telemetry Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-semibold text-gray-900">Telemetry</p>
            <p className="text-sm text-gray-500">
              Enable or disable sending usage data to Microsoft.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.telemetryEnabled}
              onChange={() => handleToggle("telemetryEnabled")}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-colors duration-300"></div>
            <span
              className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                settings.telemetryEnabled ? "translate-x-7" : "translate-x-0"
              }`}
            ></span>
          </label>
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;
