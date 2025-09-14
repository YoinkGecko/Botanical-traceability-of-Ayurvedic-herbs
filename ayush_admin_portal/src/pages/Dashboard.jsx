import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import nationallogo from "../assets/national-emblem-front.png";
import {
  Users,
  Settings,
  LogOut,
  Shield,
  Database,
  UserCheck,
  UserX,
  Activity,
  BlocksIcon,
  RefreshCw,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  const [counts, setCounts] = useState({ active: 0, suspended: 0, blocks: 0 });

  const getCount = async () => {
    try {
      // 1. Fetch admin counts
      const res1 = await fetch("http://localhost:5001/api/admins/count");
      if (!res1.ok) throw new Error("Failed to fetch admin counts");
      const data1 = await res1.json();

      // 2. Fetch blockchain block count from BlockChian server
      const res2 = await fetch("http://localhost:3000/count");
      if (!res2.ok) throw new Error("Failed to fetch blockchain count");
      const data2 = await res2.json();

      // 3. Update state
      setCounts({
        active: data1.active || 0,
        suspended: data1.suspended || 0,
        blocks: data2.totalBlocks || 0,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };
  useEffect(() => {
    const adminData = localStorage.getItem("ayushAdmin");

    if (!adminData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(adminData));
    getCount(); // initial fetch

    // Auto-refresh counts every 30s
    const interval = setInterval(() => {
      getCount();
      setRefreshCountdown(30); // reset countdown
    }, 30000);

    // Countdown timer every second
    const countdownInterval = setInterval(() => {
      setRefreshCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ayushAdmin");
    navigate("/login");
  };

  if (!user) return null;
  //================ above all done =================

  const adminActions = [
    {
      title: "Admin Management",
      description: "Manage district administrators",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      onClick: () => navigate("/admin-management"),
    },
    {
      title: "Blockchain Explorer",
      description: "View and search blockchain data",
      icon: Database,
      color: "from-green-500 to-green-600",
      onClick: () => navigate("/blockchain-explorer"),
    },
    {
      title: "System Status",
      description: "Monitor system health",
      icon: Activity,
      color: "from-orange-500 to-orange-600",
      onClick: () => navigate("/system-status"),
    },
    {
      title: "Security Settings",
      description: "Configure security policies",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      onClick: () => navigate("/security-settings"),
    },
  ];

  const stats = [
    {
      label: "Active Admins",
      value: counts.active, // Dynamic value from state
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      label: "Suspended Admins",
      value: counts.suspended, // Dynamic value from state
      icon: UserX,
      color: "text-red-600",
    },
    {
      label: "Total Blocks",
      value: counts.blocks, // Dynamic value from state
      icon: BlocksIcon,
      color: "text-blue-600",
    },
    {
      label: "System Alerts",
      value: "2",
      icon: Shield,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* National Emblem */}
              <div className="w-[70px] mr-3">
                <img
                  src={nationallogo}
                  alt="National Emblem"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Ministry of Ayush
                </h1>
                <p className="text-sm text-gray-500">
                  Administrative Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.role}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.role}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{refreshCountdown}s</span>
            </div>
          </div>
          <p className="text-gray-600">
            Manage your administrative tasks and monitor system activities
          </p>
        </motion.div>

        {/* Working on this ==========================================down===================================================================== down */}
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats?.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat?.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat?.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat?.color}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Working on this =====================================up========================================================================== up */}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminActions?.map((action, index) => (
              <motion.button
                key={index}
                onClick={action?.onClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${action?.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {action?.title}
                </h4>
                <p className="text-sm text-gray-600">{action?.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                action: "New admin registered",
                time: "2 minutes ago",
                type: "success",
              },
              {
                action: "Blockchain transaction verified",
                time: "15 minutes ago",
                type: "info",
              },
              {
                action: "Security alert resolved",
                time: "1 hour ago",
                type: "warning",
              },
              {
                action: "System backup completed",
                time: "3 hours ago",
                type: "success",
              },
            ]?.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity?.type === "success"
                        ? "bg-green-500"
                        : activity?.type === "warning"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <p className="text-sm text-gray-900">{activity?.action}</p>
                </div>
                <p className="text-xs text-gray-500">{activity?.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
