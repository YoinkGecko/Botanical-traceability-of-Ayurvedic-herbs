// src/pages/SecuritySettings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    portVisibility: "private", // private or public
    showPortWarning: true,
    telemetryEnabled: false,
  });

  const [logs, setLogs] = useState("");
  const logsEndRef = useRef(null);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Fetch logs every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3000/logs")
        .then((res) => res.text())
        .then((data) => {
          try {
            // Try parsing as JSON array
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
              setLogs(parsed.join("\n")); // join array elements with newline
            } else {
              setLogs(data);
            }
          } catch {
            // Not JSON → treat as plain text
            setLogs(data);
          }
        })
        .catch((err) => setLogs(`❌ Error fetching logs: ${err}`));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [logs]);

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

        {/* ------------------ Server Logs Section ------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-900 rounded-xl shadow-sm p-6 mt-6"
        >
          <p className="text-lg font-semibold text-white mb-2">
            Blockchain Server Logs
          </p>
          <div
            ref={logsEndRef}
            className="h-64 overflow-y-auto bg-black text-green-400 p-3 rounded text-xs font-mono"
          >
            <pre className="whitespace-pre-wrap break-words">{logs}</pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;
