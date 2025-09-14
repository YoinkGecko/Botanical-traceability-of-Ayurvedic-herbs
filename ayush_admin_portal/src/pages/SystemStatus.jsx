// src/pages/SystemStatus.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Database,
  Server,
  HardDrive,
  Clock,
  Cpu,
  Cloud,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SystemStatus = () => {
  const navigate = useNavigate();

  // Helper to generate initial random history
  // Helper to generate initial history with 30s intervals
  const generateHistory = () => {
    const history = [];
    const now = new Date();
    for (let i = 10; i > 0; i--) {
      const time = new Date(now.getTime() - i * 30000); // 30 sec intervals
      history.push({
        time: time.toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
      });
    }
    return history;
  };

  const [status, setStatus] = useState({
    uptime: "99.9%",
    lastDowntime: "2 days ago",
    serverHealth: "Healthy",
    responseTime: 120,
    cpu: 45,
    memory: 68,
    disk: 52,
    dbStatus: "Connected",
    activeQueries: 12,
    blockchainBlock: 1452,
    blockchainSync: "Synced",
    latencyHistory: generateHistory(),
    cpuHistory: generateHistory(),
    memoryHistory: generateHistory(),
    diskHistory: generateHistory(),
  });

  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh every 30 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);

      setTimeout(() => {
        const now = new Date().toLocaleTimeString();
        const newLatency = 80 + Math.floor(Math.random() * 100);
        const newCpu = Math.floor(Math.random() * 100);
        const newMemory = Math.floor(Math.random() * 100);
        const newDisk = Math.floor(Math.random() * 100);

        const pushHistory = (arr, value) =>
          [...arr, { time: now, value }].slice(-10);

        setStatus((prev) => ({
          ...prev,
          responseTime: newLatency,
          cpu: newCpu,
          memory: newMemory,
          disk: newDisk,
          latencyHistory: pushHistory(prev.latencyHistory, newLatency),
          cpuHistory: pushHistory(prev.cpuHistory, newCpu),
          memoryHistory: pushHistory(prev.memoryHistory, newMemory),
          diskHistory: pushHistory(prev.diskHistory, newDisk),
        }));

        setRefreshing(false);
      }, 1000); // Show refreshing animation for 1s
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label: "Server Uptime",
      value: status.uptime,
      icon: Clock,
      color: "text-green-600",
      sub: `Last downtime: ${status.lastDowntime}`,
    },
    {
      label: "Server Health",
      value: status.serverHealth,
      icon: Server,
      color:
        status.serverHealth === "Healthy" ? "text-green-600" : "text-red-600",
      sub: status.serverHealth === "Healthy" ? "🟢 Running" : "🔴 Down",
    },
    {
      label: "API Response",
      value: `${status.responseTime}ms`,
      icon: Activity,
      color: "text-blue-600",
      sub: "Average latency",
    },
    {
      label: "Database",
      value: status.dbStatus,
      icon: Database,
      color:
        status.dbStatus === "Connected" ? "text-green-600" : "text-red-600",
      sub: `${status.activeQueries} active queries`,
    },
    {
      label: "Blockchain Sync",
      value: status.blockchainSync,
      icon: Cloud,
      color: "text-purple-600",
      sub: `Block #${status.blockchainBlock}`,
    },
  ];

  const resources = [
    {
      label: "CPU Usage",
      value: status.cpu,
      color: "#3b82f6",
      history: status.cpuHistory,
    },
    {
      label: "Memory Usage",
      value: status.memory,
      color: "#10b981",
      history: status.memoryHistory,
    },
    {
      label: "Disk Usage",
      value: status.disk,
      color: "#f97316",
      history: status.diskHistory,
    },
    {
      label: "API Latency",
      value: status.responseTime,
      color: "#6366f1",
      history: status.latencyHistory,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🖥️ System Status
          {refreshing && (
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          )}
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
        >
          ← Back to Dashboard
        </button>
      </motion.div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resource Usage Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resources.map((res, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">{res.label}</p>
              <p className="text-sm font-semibold">
                {res.value}
                {res.label.includes("Usage") ? "%" : "ms"}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={res.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={res.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
