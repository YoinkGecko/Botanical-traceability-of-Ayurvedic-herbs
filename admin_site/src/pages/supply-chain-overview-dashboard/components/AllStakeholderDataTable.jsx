import React, { useState, useMemo } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const AllStakeholderDataTable = ({ allData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stakeholderFilter, setStakeholderFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });

  const itemsPerPage = 20;

  // Filter and search data
  const filteredData = useMemo(() => {
    return (
      allData?.filter((item) => {
        const matchesSearch =
          !searchTerm ||
          item?.stakeholderName
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase()) ||
          item?.submissionId
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase()) ||
          item?.submissionType
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase()) ||
          item?.location?.address
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          item?.status?.toLowerCase() === statusFilter;
        const matchesStakeholder =
          stakeholderFilter === "all" ||
          item?.stakeholderType?.toLowerCase() === stakeholderFilter;

        return matchesSearch && matchesStatus && matchesStakeholder;
      }) || []
    );
  }, [allData, searchTerm, statusFilter, stakeholderFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    return [...filteredData]?.sort((a, b) => {
      if (!sortConfig?.key) return 0;

      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      // Handle timestamp sorting
      if (sortConfig?.key === "timestamp") {
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
  const currentData = sortedData?.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev?.key === key && prev?.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          bgColor: "bg-success/10",
          textColor: "text-success",
          icon: "CheckCircle",
        };
      case "pending":
        return {
          bgColor: "bg-warning/10",
          textColor: "text-warning",
          icon: "Clock",
        };
      case "rejected":
        return {
          bgColor: "bg-error/10",
          textColor: "text-error",
          icon: "XCircle",
        };
      case "in review":
        return {
          bgColor: "bg-primary/10",
          textColor: "text-primary",
          icon: "Eye",
        };
      default:
        return {
          bgColor: "bg-muted/10",
          textColor: "text-muted-foreground",
          icon: "Circle",
        };
    }
  };

  const getStakeholderIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "farmer":
        return "Wheat";
      case "lab tester":
        return "FlaskConical";
      case "processor":
        return "Factory";
      case "manufacturer":
        return "Building2";
      default:
        return "User";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return "N/A";
    return `${parseFloat(lat)?.toFixed(6)}°, ${parseFloat(lng)?.toFixed(6)}°`;
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return "ArrowUpDown";
    return sortConfig?.direction === "asc" ? "ArrowUp" : "ArrowDown";
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              All Stakeholder Data
            </h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive view of all submissions with location coordinates
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="min-w-64"
              icon="Search"
            />

            <Select
              value={stakeholderFilter}
              onValueChange={setStakeholderFilter}
              className="min-w-40"
            >
              <option value="all">All Stakeholders</option>
              <option value="farmer">Farmers</option>
              <option value="lab tester">Lab Testers</option>
              <option value="processor">Processors</option>
              <option value="manufacturer">Manufacturers</option>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="min-w-32"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="in review">In Review</option>
              <option value="rejected">Rejected</option>
            </Select>

            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {currentData?.length} of {sortedData?.length} entries
          {searchTerm && ` (filtered from ${allData?.length} total)`}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  onClick={() => handleSort("stakeholderName")}
                >
                  <span>Stakeholder</span>
                  <Icon name={getSortIcon("stakeholderName")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  onClick={() => handleSort("submissionId")}
                >
                  <span>Submission ID</span>
                  <Icon name={getSortIcon("submissionId")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                  onClick={() => handleSort("submissionType")}
                >
                  <span>Type</span>
                  <Icon name={getSortIcon("submissionType")} size={14} />{" "}
                  {/* The size of the updown arrow in the datatable view in overview*/}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Location Coordinates
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Address
              </th>
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
                  onClick={() => handleSort("timestamp")}
                >
                  <span>Submitted</span>
                  <Icon name={getSortIcon("timestamp")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData?.map((item) => {
              const statusConfig = getStatusConfig(item?.status);
              const stakeholderIcon = getStakeholderIcon(item?.stakeholderType);

              return (
                <tr
                  key={item?.id}
                  className="hover:bg-muted/30 transition-smooth"
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
                          {item?.stakeholderName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item?.stakeholderType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground">
                      {item?.submissionId}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {item?.submissionType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-mono text-foreground">
                        {formatCoordinates(
                          item?.location?.latitude,
                          item?.location?.longitude
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Lat: {item?.location?.latitude || "N/A"}, Lng:{" "}
                        {item?.location?.longitude || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 max-w-48">
                    <div
                      className="text-sm text-foreground truncate"
                      title={item?.location?.address}
                    >
                      {item?.location?.address || "Address not provided"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.location?.region}
                    </div>
                  </td>
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
                      {formatDate(item?.timestamp)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" title="View Location">
                        <Icon name="MapPin" size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" title="More Actions">
                        <Icon name="MoreHorizontal" size={14} />
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

export default AllStakeholderDataTable;
