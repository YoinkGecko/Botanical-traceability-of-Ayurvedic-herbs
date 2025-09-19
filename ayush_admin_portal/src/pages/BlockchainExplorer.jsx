import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Database,
  Filter,
  User,
  Package,
  Beaker,
  Factory,
} from "lucide-react";

const BlockchainExplorer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const adminData = localStorage.getItem("ayushAdmin");
    if (!adminData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(adminData));
      // Mock blockchain data
      setTransactions([
        {
          id: "TX001",
          type: "farmer",
          hash: "0x1a2b3c4d5e6f7g8h9i0j",
          timestamp: "2024-01-15 14:30:25",
          status: "verified",
          details: "Organic turmeric harvest registration",
          location: "Karnataka",
          amount: "500 kg",
        },
        {
          id: "TX002",
          type: "processing",
          hash: "0x2b3c4d5e6f7g8h9i0j1k",
          timestamp: "2024-01-15 13:45:10",
          status: "verified",
          details: "Ayurvedic medicine processing",
          location: "Kerala",
          amount: "200 units",
        },
        {
          id: "TX003",
          type: "lab_test",
          hash: "0x3c4d5e6f7g8h9i0j1k2l",
          timestamp: "2024-01-15 12:15:00",
          status: "verified",
          details: "Quality testing for Ashwagandha powder",
          location: "Tamil Nadu",
          amount: "50 samples",
        },
        {
          id: "TX004",
          type: "manufacturer",
          hash: "0x4d5e6f7g8h9i0j1k2l3m",
          timestamp: "2024-01-15 11:20:35",
          status: "pending",
          details: "Herbal supplement manufacturing",
          location: "Maharashtra",
          amount: "1000 bottles",
        },
        {
          id: "TX005",
          type: "farmer",
          hash: "0x5e6f7g8h9i0j1k2l3m4n",
          timestamp: "2024-01-15 10:55:15",
          status: "verified",
          details: "Organic neem oil production",
          location: "Gujarat",
          amount: "300 liters",
        },
      ]);
    }
  }, [navigate]);

  const getTypeIcon = (type) => {
    switch (type) {
      case "farmer":
        return User;
      case "processing":
        return Package;
      case "lab_test":
        return Beaker;
      case "manufacturer":
        return Factory;
      default:
        return Database;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "farmer":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "lab_test":
        return "bg-purple-100 text-purple-800";
      case "manufacturer":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions = transactions?.filter((transaction) => {
    const matchesSearch =
      transaction?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      transaction?.hash?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      transaction?.details
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      transaction?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesFilter =
      filterType === "all" || transaction?.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      label: "Total Transactions",
      value: transactions?.length,
      color: "text-blue-600",
    },
    {
      label: "Verified",
      value: transactions?.filter((t) => t?.status === "verified")?.length,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: transactions?.filter((t) => t?.status === "pending")?.length,
      color: "text-orange-600",
    },
    {
      label: "Today",
      value: transactions?.filter((t) => t?.timestamp?.includes("2024-01-15"))
        ?.length,
      color: "text-purple-600",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 mr-2"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center">
                <Database className="w-6 h-6 text-green-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">
                  Blockchain Explorer
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by ID, hash, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e?.target?.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="farmer">Farmer</option>
                <option value="processing">Processing</option>
                <option value="lab_test">Lab Test</option>
                <option value="manufacturer">Manufacturer</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        >
          {stats?.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat?.label}</p>
                  <p className={`text-2xl font-bold ${stat?.color}`}>
                    {stat?.value}
                  </p>
                </div>
                <Database className={`w-8 h-8 ${stat?.color}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Transactions Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Blockchain Transactions
          </h3>

          {filteredTransactions?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTransactions?.map((transaction) => {
                const TypeIcon = getTypeIcon(transaction?.type);
                return (
                  <div
                    key={transaction?.id}
                    className="bg-gray-50 rounded-xl shadow p-5 hover:shadow-md transition"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <TypeIcon size={18} className="text-gray-500" />
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(
                            transaction?.type
                          )}`}
                        >
                          {transaction?.type?.replace("_", " ")}
                        </span>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction?.status === "verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction?.status}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {transaction?.details}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction?.amount}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium text-gray-700">ID:</span>{" "}
                        {transaction?.id}
                      </p>
                      <p className="font-mono truncate">{transaction?.hash}</p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Location:
                        </span>{" "}
                        {transaction?.location}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Time:</span>{" "}
                        {transaction?.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No transactions found matching your criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;
