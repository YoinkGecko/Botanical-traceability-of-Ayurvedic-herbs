import React, { useState, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const StakeholderVerificationTable = ({ activeTab, data = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [sortConfig, setSortConfig] = useState({
    key: "registrationDate",
    direction: "desc",
  });
  const [loadingActions, setLoadingActions] = useState({});

  const itemsPerPage = 15;

  // Mock data for different stakeholder types
  const mockData = {
    farmers: [
      {
        id: "FRM-001",
        name: "John Smith",
        email: "john.smith@farm.com",
        phone: "+1-555-0123",
        location: "Iowa, USA",
        registrationDate: "2024-01-15T08:30:00Z",
        status: "pending",
        farmSize: "150 acres",
        cropType: "Corn, Soybean",
      },
      {
        id: "FRM-002",
        name: "Maria Garcia",
        email: "maria.garcia@agri.com",
        phone: "+1-555-0124",
        location: "California, USA",
        registrationDate: "2024-01-16T10:15:00Z",
        status: "pending",
        farmSize: "200 acres",
        cropType: "Wheat, Barley",
      },
      {
        id: "FRM-003",
        name: "David Chen",
        email: "david.chen@organic.com",
        phone: "+1-555-0125",
        location: "Oregon, USA",
        registrationDate: "2024-01-17T14:20:00Z",
        status: "approved",
        farmSize: "80 acres",
        cropType: "Organic Vegetables",
      },
      {
        id: "FRM-004",
        name: "Sarah Johnson",
        email: "sarah.j@ranch.com",
        phone: "+1-555-0126",
        location: "Texas, USA",
        registrationDate: "2024-01-18T09:45:00Z",
        status: "rejected",
        farmSize: "300 acres",
        cropType: "Cotton, Rice",
      },
      {
        id: "FRM-009",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@field.com",
        phone: "+1-555-0127",
        location: "Arizona, USA",
        registrationDate: "2024-01-19T11:30:00Z",
        status: "pending",
        farmSize: "120 acres",
        cropType: "Citrus Fruits",
      },
    ],
    "lab-testers": [
      {
        id: "LAB-001",
        name: "Dr. Emily Watson",
        email: "emily.watson@labtech.com",
        phone: "+1-555-0201",
        location: "Chicago, IL",
        registrationDate: "2024-01-15T09:00:00Z",
        status: "pending",
        certification: "ISO 17025",
        specialization: "Soil Analysis",
        experience: "8 years",
      },
      {
        id: "LAB-002",
        name: "Dr. Robert Kim",
        email: "robert.kim@agrilab.com",
        phone: "+1-555-0202",
        location: "Denver, CO",
        registrationDate: "2024-01-16T13:30:00Z",
        status: "pending",
        certification: "AOAC Certified",
        specialization: "Pesticide Residue",
        experience: "12 years",
      },
      {
        id: "LAB-003",
        name: "Dr. Lisa Brown",
        email: "lisa.brown@testlab.com",
        phone: "+1-555-0203",
        location: "Atlanta, GA",
        registrationDate: "2024-01-17T15:45:00Z",
        status: "approved",
        certification: "FDA Certified",
        specialization: "Microbiology",
        experience: "10 years",
      },
      {
        id: "LAB-004",
        name: "Dr. Michael Davis",
        email: "michael.davis@qualab.com",
        phone: "+1-555-0204",
        location: "Seattle, WA",
        registrationDate: "2024-01-18T08:15:00Z",
        status: "rejected",
        certification: "ISO 17025",
        specialization: "Heavy Metals",
        experience: "6 years",
      },
      {
        id: "LAB-005",
        name: "Dr. Anna Rodriguez",
        email: "anna.rodriguez@precisionlab.com",
        phone: "+1-555-0205",
        location: "Miami, FL",
        registrationDate: "2024-01-19T12:20:00Z",
        status: "pending",
        certification: "USDA Certified",
        specialization: "Nutritional Analysis",
        experience: "15 years",
      },
    ],
    processors: [
      {
        id: "PRC-001",
        name: "Green Valley Processing LLC",
        email: "contact@greenvalley.com",
        phone: "+1-555-0301",
        location: "Nebraska, USA",
        registrationDate: "2024-01-15T10:30:00Z",
        status: "pending",
        capacity: "5000 tons/month",
        processingType: "Grain Processing",
        certifications: "HACCP, SQF",
      },
      {
        id: "PRC-002",
        name: "Organic Foods Processing Co.",
        email: "info@organicfoods.com",
        phone: "+1-555-0302",
        location: "Kansas, USA",
        registrationDate: "2024-01-16T14:45:00Z",
        status: "pending",
        capacity: "2500 tons/month",
        processingType: "Organic Processing",
        certifications: "USDA Organic, Non-GMO",
      },
      {
        id: "PRC-003",
        name: "Fresh Produce Partners",
        email: "operations@freshproduce.com",
        phone: "+1-555-0303",
        location: "Florida, USA",
        registrationDate: "2024-01-17T11:15:00Z",
        status: "approved",
        capacity: "8000 tons/month",
        processingType: "Fruit & Vegetable",
        certifications: "FDA, GlobalGAP",
      },
      {
        id: "PRC-004",
        name: "Premium Grain Mills",
        email: "admin@premiumgrain.com",
        phone: "+1-555-0304",
        location: "Minnesota, USA",
        registrationDate: "2024-01-18T16:00:00Z",
        status: "rejected",
        capacity: "3500 tons/month",
        processingType: "Specialty Grains",
        certifications: "SQF, BRC",
      },
      {
        id: "PRC-005",
        name: "Sustainable Processing Inc.",
        email: "hello@sustainable.com",
        phone: "+1-555-0305",
        location: "Wisconsin, USA",
        registrationDate: "2024-01-19T09:30:00Z",
        status: "pending",
        capacity: "4200 tons/month",
        processingType: "Dairy Processing",
        certifications: "HACCP, Organic",
      },
    ],
    manufacturers: [
      {
        id: "MFG-001",
        name: "NutriSnack Industries",
        email: "partnerships@nutrisnack.com",
        phone: "+1-555-0401",
        location: "New Jersey, USA",
        registrationDate: "2024-01-15T12:00:00Z",
        status: "pending",
        productType: "Health Snacks",
        capacity: "10000 units/day",
        certifications: "FDA, USDA",
      },
      {
        id: "MFG-002",
        name: "Farm Fresh Beverages",
        email: "sourcing@farmfreshbev.com",
        phone: "+1-555-0402",
        location: "Georgia, USA",
        registrationDate: "2024-01-16T15:30:00Z",
        status: "pending",
        productType: "Organic Juices",
        capacity: "25000 bottles/day",
        certifications: "Organic, Non-GMO",
      },
      {
        id: "MFG-003",
        name: "Wholesome Foods Corp",
        email: "supply@wholesomefoods.com",
        phone: "+1-555-0403",
        location: "Ohio, USA",
        registrationDate: "2024-01-17T13:45:00Z",
        status: "approved",
        productType: "Frozen Foods",
        capacity: "15000 packages/day",
        certifications: "SQF, BRC",
      },
      {
        id: "MFG-004",
        name: "Artisan Bakery Solutions",
        email: "procurement@artisanbakery.com",
        phone: "+1-555-0404",
        location: "New York, USA",
        registrationDate: "2024-01-18T10:20:00Z",
        status: "rejected",
        productType: "Premium Baked Goods",
        capacity: "8000 items/day",
        certifications: "Kosher, Halal",
      },
      {
        id: "MFG-005",
        name: "Clean Label Manufacturing",
        email: "partnerships@cleanlabel.com",
        phone: "+1-555-0405",
        location: "Colorado, USA",
        registrationDate: "2024-01-19T14:15:00Z",
        status: "pending",
        productType: "Natural Supplements",
        capacity: "50000 capsules/day",
        certifications: "GMP, NSF",
      },
    ],
  };

  // Get data for current tab
  const currentData = data?.length ? data : mockData?.[activeTab] || [];

  // Filter and search data
  const filteredData = useMemo(() => {
    return (
      currentData?.filter((item) => {
        const matchesSearch =
          !searchTerm ||
          item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          item?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          item?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          item?.status?.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
      }) || []
    );
  }, [currentData, searchTerm, statusFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData]?.sort((a, b) => {
      if (!sortConfig?.key) return 0;

      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      // Handle date sorting
      if (sortConfig?.key === "registrationDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting
      if (typeof aValue === "string") {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData?.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev?.key === key && prev?.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleApprove = async (stakeholderId) => {
    setLoadingActions((prev) => ({
      ...prev,
      [`${stakeholderId}_approve`]: true,
    }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real implementation, make API call to approve stakeholder
      console.log(`Approving stakeholder: ${stakeholderId}`);

      // Show success notification
      alert(`Stakeholder ${stakeholderId} has been approved successfully!`);

      // Here you would typically refresh the data or update the local state
    } catch (error) {
      console.error("Error approving stakeholder:", error);
      alert("Failed to approve stakeholder. Please try again.");
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [`${stakeholderId}_approve`]: false,
      }));
    }
  };

  const handleReject = async (stakeholderId) => {
    setLoadingActions((prev) => ({
      ...prev,
      [`${stakeholderId}_reject`]: true,
    }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real implementation, make API call to reject stakeholder
      console.log(`Rejecting stakeholder: ${stakeholderId}`);

      // Show success notification
      alert(`Stakeholder ${stakeholderId} has been rejected.`);

      // Here you would typically refresh the data or update the local state
    } catch (error) {
      console.error("Error rejecting stakeholder:", error);
      alert("Failed to reject stakeholder. Please try again.");
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [`${stakeholderId}_reject`]: false,
      }));
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          icon: "CheckCircle",
        };
      case "pending":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          icon: "Clock",
        };
      case "rejected":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          icon: "XCircle",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          icon: "Circle",
        };
    }
  };

  const getStakeholderIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "farmers":
        return "Wheat";
      case "lab-testers":
        return "FlaskConical";
      case "processors":
        return "Factory";
      case "manufacturers":
        return "Package";
      default:
        return "User";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return "ArrowUpDown";
    return sortConfig?.direction === "asc" ? "ArrowUp" : "ArrowDown";
  };

  const getTabDisplayName = (tab) => {
    const names = {
      farmers: "Farmers",
      "lab-testers": "Lab Testers",
      processors: "Processors",
      manufacturers: "Manufacturers",
    };
    return names?.[tab] || "Stakeholders";
  };

  const renderSpecificColumns = (item) => {
    switch (activeTab) {
      case "farmers":
        return (
          <>
            <td className="p-4">
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {item?.farmSize}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item?.cropType}
                </div>
              </div>
            </td>
          </>
        );
      case "lab-testers":
        return (
          <>
            <td className="p-4">
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {item?.certification}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item?.specialization}
                </div>
              </div>
            </td>
            <td className="p-4">
              <span className="text-sm text-foreground">
                {item?.experience}
              </span>
            </td>
          </>
        );
      case "processors":
        return (
          <>
            <td className="p-4">
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {item?.capacity}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item?.processingType}
                </div>
              </div>
            </td>
            <td className="p-4">
              <span className="text-sm text-foreground">
                {item?.certifications}
              </span>
            </td>
          </>
        );
      case "manufacturers":
        return (
          <>
            <td className="p-4">
              <div className="text-sm">
                <div className="font-medium text-foreground">
                  {item?.capacity}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item?.productType}
                </div>
              </div>
            </td>
            <td className="p-4">
              <span className="text-sm text-foreground">
                {item?.certifications}
              </span>
            </td>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableHeaders = () => {
    const commonHeaders = (
      <>
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          <button
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
            onClick={() => handleSort("name")}
          >
            <span>Name</span>
            <Icon name={getSortIcon("name")} size={14} />
          </button>
        </th>
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          <button
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
            onClick={() => handleSort("id")}
          >
            <span>ID</span>
            <Icon name={getSortIcon("id")} size={14} />
          </button>
        </th>
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          Contact
        </th>
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          Location
        </th>
      </>
    );

    const specificHeaders = {
      farmers: (
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          Farm Details
        </th>
      ),
      "lab-testers": (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Certification
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Experience
          </th>
        </>
      ),
      processors: (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Capacity
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Certifications
          </th>
        </>
      ),
      manufacturers: (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Production
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Certifications
          </th>
        </>
      ),
    };

    return (
      <>
        {commonHeaders}
        {specificHeaders?.[activeTab]}
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          <button
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
            onClick={() => handleSort("status")}
          >
            <span>Status</span>
            <Icon name={getSortIcon("status")} size={14} />
          </button>
        </th>
        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
          <button
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
            onClick={() => handleSort("registrationDate")}
          >
            <span>Registration Date</span>
            <Icon name={getSortIcon("registrationDate")} size={14} />
          </button>
        </th>
        <th className="text-right p-4 text-sm font-medium text-muted-foreground">
          Actions
        </th>
      </>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {getTabDisplayName(activeTab)} Verification
            </h3>
            <p className="text-sm text-muted-foreground">
              Review and verify {getTabDisplayName(activeTab)?.toLowerCase()}{" "}
              applications
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder={`Search ${getTabDisplayName(
                activeTab
              )?.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="min-w-64"
              icon="Search"
            />

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="min-w-32"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>

            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {currentPageData?.length} of {sortedData?.length}{" "}
          {getTabDisplayName(activeTab)?.toLowerCase()}
          {searchTerm && ` (filtered from ${currentData?.length} total)`}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-muted/50">
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentPageData?.map((item) => {
              const statusConfig = getStatusConfig(item?.status);
              const stakeholderIcon = getStakeholderIcon(activeTab);
              const isApproving = loadingActions?.[`${item?.id}_approve`];
              const isRejecting = loadingActions?.[`${item?.id}_reject`];

              return (
                <tr
                  key={item?.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <Icon
                          name={stakeholderIcon}
                          size={16}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getTabDisplayName(activeTab)?.slice(0, -1)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground">
                      {item?.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-foreground">{item?.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {item?.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {item?.location}
                    </span>
                  </td>
                  {renderSpecificColumns(item)}
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig?.bgColor}`}
                    >
                      <Icon
                        name={statusConfig?.icon}
                        size={12}
                        className={statusConfig?.textColor}
                      />
                      <span
                        className={`text-xs font-medium ${statusConfig?.textColor}`}
                      >
                        {item?.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(item?.registrationDate)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      {item?.status?.toLowerCase() === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(item?.id)}
                            loading={isApproving}
                            disabled={isApproving || isRejecting}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Icon
                              name="Check"
                              size={14}
                              className={!isApproving ? "mr-1" : ""}
                            />
                            {isApproving ? "Approving..." : "Approve"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(item?.id)}
                            loading={isRejecting}
                            disabled={isApproving || isRejecting}
                          >
                            <Icon
                              name="X"
                              size={14}
                              className={!isRejecting ? "mr-1" : ""}
                            />
                            {isRejecting ? "Rejecting..." : "Reject"}
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" title="View Details">
                        <Icon name="Eye" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, sortedData?.length)} of {sortedData?.length}{" "}
              entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <Icon name="ChevronsLeft" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <Icon name="ChevronsRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StakeholderVerificationTable;
