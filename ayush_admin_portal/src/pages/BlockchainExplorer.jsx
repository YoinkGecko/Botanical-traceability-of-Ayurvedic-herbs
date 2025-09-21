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
  const [expandedId, setExpandedId] = useState(null);
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

      fetch("http://localhost:3000/chain")
        .then((res) => res.json())
        .then((data) => {
          // Store the raw blockchain data directly in state
          setTransactions(data.reverse()); // reverse if you want latest first
        })
        .catch((err) => console.error("Error fetching blockchain:", err));
    }
  }, [navigate]);

  const getTypeIcon = (type) => {
    switch (type) {
      case "farmers":
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
      case "farmers":
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
      transaction?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      transaction?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesFilter =
      filterType === "all" || transaction?.data.role === filterType;

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
      value: 4, //transactions?.filter((t) => t?.timestamp?.includes("2024-01-15"))
      //?.length
      color: "text-purple-600",
    },
  ];

  const roleLabels = {
    farmers: "Farmer",
    proc: "Processing",
    labtester: "Lab Test",
    manufacturer: "Manufacturer",
  };

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
                <option value="farmers">Farmer</option>
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

        {/* Transactions Timeline */}
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
            <div className="relative border-l border-gray-200 ml-6">
              {filteredTransactions?.map((transaction, index) => {
                const TypeIcon = getTypeIcon(transaction?.data.role);

                return (
                  <motion.div
                    key={transaction.index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="mb-10 ml-6"
                  >
                    {/* Timeline dot */}
                    <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-green-500 rounded-full ring-4 ring-white shadow-md">
                      <TypeIcon size={14} className="text-white" />
                    </span>

                    {/* Card */}
                    <div
                      className="bg-gray-50 rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer"
                      onClick={() =>
                        setExpandedId(
                          expandedId === transaction.index
                            ? null
                            : transaction.index
                        )
                      }
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getTypeColor(
                            transaction?.data.role
                          )}`}
                        >
                          {roleLabels[transaction?.data.role]}
                        </span>

                        {/* Glowing status badge */}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full relative bg-green-100 text-green-800 animate-pulse-green`}
                        >
                          Approved
                        </span>
                      </div>

                      {/* Summary Block starts here*/}
                      <p className="text-sm font-semibold text-gray-900">
                        TX0{transaction.index}
                      </p>
                      {/* */}
                      {transaction.data.role === "farmers" && (
                        <>
                          <p className="text-xs text-gray-500">
                            Batch ID: {transaction.data.FbatchID}
                          </p>

                          {expandedId === transaction.index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 text-xs text-gray-500 space-y-1"
                            >
                              <p>
                                <span className="font-medium text-gray-700">
                                  Farmer ID:
                                </span>{" "}
                                {transaction.data.Fid}
                                <br />
                                <span className="font-medium text-gray-700">
                                  Herb :
                                </span>{" "}
                                {transaction.data.TypeOfHerb}
                                <br />
                                <span className="font-medium text-gray-700">
                                  Harvesting Method :
                                </span>{" "}
                                {transaction.data.HarvestedBy}
                                <br />
                                <span className="font-medium text-gray-700">
                                  Quantity Harvested:
                                </span>{" "}
                                {transaction.data.Quantity} Kg
                                <br />
                                <span className="font-medium text-gray-700">
                                  Location:
                                </span>{" "}
                                <a
                                  href={`https://www.google.com/maps?q=${transaction.data.Location}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                  title="Click to see location"
                                >
                                  {transaction.data.Location}
                                </a>{" "}
                                <br />
                                <span className="font-medium text-gray-700">
                                  District :
                                </span>{" "}
                                {transaction.data.District}
                                <br />
                                <span className="font-medium text-gray-700">
                                  Approved By ID :
                                </span>{" "}
                                {transaction.data.ApprovedBy}
                                <br />
                                <span className="font-medium text-gray-700">
                                  Harvesting Time:
                                </span>{" "}
                                {new Date(
                                  transaction.data.Timestamp
                                ).toLocaleString()}{" "}
                                <br />
                              </p>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
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
