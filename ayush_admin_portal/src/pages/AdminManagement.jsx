import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Plus,
  UserCheck,
  UserX,
  Trash2,
  Users,
  Filter,
} from "lucide-react";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [counts, setCounts] = useState({ active: 0, suspended: 0, blocks: 0 });

  const getcount = async () => {
    try {
      const res1 = await fetch("http://localhost:5001/api/admins/count");
      if (!res1.ok) throw new Error("Failed to fetch admin counts");
      const data1 = await res1.json();

      // 3. Update state
      setCounts({
        active: data1.active || 0,
        suspended: data1.suspended || 0,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  useEffect(() => {
    const adminData = localStorage.getItem("ayushAdmin");
    if (!adminData) {
      navigate("/login");
    } else {
      setUser(adminData);
      getcount();
      getadmindetails();
      setAdmins([
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh.kumar@delhi.ayush.gov.in",
          district: "Delhi",
          status: "active",
          role: "District Admin",
          lastLogin: "2 hours ago",
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya.sharma@mumbai.ayush.gov.in",
          district: "Mumbai",
          status: "active",
          role: "District Admin",
          lastLogin: "1 day ago",
        },
        {
          id: 3,
          name: "Amit Singh",
          email: "amit.singh@bangalore.ayush.gov.in",
          district: "Bangalore",
          status: "suspended",
          role: "District Admin",
          lastLogin: "1 week ago",
        },
        {
          id: 4,
          name: "Sunita Patel",
          email: "sunita.patel@chennai.ayush.gov.in",
          district: "Chennai",
          status: "active",
          role: "District Admin",
          lastLogin: "3 hours ago",
        },
      ]);
    }
  }, [navigate]);

  const handleStatusChange = (adminId, newStatus) => {
    setAdmins((prev) =>
      prev?.map((admin) =>
        admin?.id === adminId ? { ...admin, status: newStatus } : admin
      )
    );
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins((prev) => prev?.filter((admin) => admin?.id !== adminId));
    }
  };

  const filteredAdmins = admins?.filter((admin) => {
    const matchesSearch =
      admin?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      admin?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      admin?.district?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || admin?.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

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
                <Users className="w-6 h-6 text-orange-500 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Management
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
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e?.target?.value)}
                  className="border border-gray-300 rounded-lg px-5 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-green-700 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Admin</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Number(counts.active) + Number(counts.suspended)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Admins</p>
                <p className="text-2xl font-bold text-green-600">
                  {counts.active}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {counts.suspended}
                </p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </motion.div>

        {/* Admins Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              District Administrators
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins?.map((admin) => (
                  <tr key={admin?.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {admin?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {admin?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {admin?.district}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          admin?.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin?.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {admin?.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(admin?.id, "suspended")
                            }
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Suspend Admin"
                          >
                            <UserX size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(admin?.id, "active")
                            }
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Activate Admin"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAdmin(admin?.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete Admin"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAdmins?.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No admins found matching your criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminManagement;
