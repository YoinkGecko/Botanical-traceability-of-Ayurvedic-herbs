import React, { useState, useMemo, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import DistrictMap from "../../DistrictMap";

const StakeholderVerificationTable = ({ activeTab, data = [], re }) => {
  const [showmap, setshowmap] = useState(false);
  const [district, setdistrict] = useState("mumbai");
  const [location, setlocation] = useState("19.22,12.44");
  const [message, setmessage] = useState("test");

  const [mockData, setMockData] = useState({
    farmers: [],
    "lab-testers": [],
    processors: [],
    manufacturers: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [sortConfig, setSortConfig] = useState({
    key: "registrationDate",
    direction: "desc",
  });
  const [loadingActions, setLoadingActions] = useState({});
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersRes, labsRes, processorsRes, manufacturersRes] =
          await Promise.all([
            fetch("http://localhost:5001/api/farmer-data").then((res) =>
              res.json()
            ),
            fetch("http://localhost:5001/api/labtester-data").then((res) =>
              res.json()
            ),
            fetch("http://localhost:5001/api/processor-data").then((res) =>
              res.json()
            ),
            fetch("http://localhost:5001/api/manufacturer-data").then((res) =>
              res.json()
            ),
          ]);

        const selectedDistrict = localStorage.getItem("district");

        setMockData({
          farmers: farmersRes
            .filter(
              (f) => f.District.toLowerCase() === selectedDistrict.toLowerCase()
            )
            .map((f) => ({
              id: f.FbatchID,
              farmerid: f.Fid,
              typeOfHerb: f.TypeOfHerb,
              harvestedBy: f.HarvestedBy,
              quantity: f.Quantity,
              location: f.Location,
              locationAccuracy: f.LocationAccuracy,
              registrationDate: f.Timestamp,
              district: f.District,
              photos: f.Photos,
              status: f.Status,
            })),

          "lab-testers": labsRes
            .filter(
              (l) => l.District.toLowerCase() === selectedDistrict.toLowerCase()
            )
            .map((l) => ({
              id: l.LbatchID,
              labId: l.LabID,
              linkedBatchId: l.LinkedBatchID,
              testType: l.TestType,
              testResults: l.TestResults,
              DNASequence: l.DNASequence,
              passFail: l.PassFailStatus,
              certificate: l.CertificateFile,
              location: l.Location,
              locationAccuracy: l.LocationAccuracy,
              district: l.District,
              registrationDate: l.Timestamp,
              photos: l.Photos,
              status: l.Status,
            })),

          processors: processorsRes
            .filter(
              (p) => p.District.toLowerCase() === selectedDistrict.toLowerCase()
            )
            .map((p) => ({
              id: p.PbatchID,
              processorId: p.Pid,
              linkedFarmerBatchId: p.LinkedFarmerBatchID,
              step: p.ProcessingStep,
              weightGiven: p.WeightGivenByFarmer,
              weightBefore: p.WeightBeforeProc,
              weightAfter: p.WeightAfterProcessing,
              parameters: p.Parameters,
              location: p.Location,
              locationAccuracy: p.LocationAccuracy,
              district: p.District,
              photos: p.Photos,
              status: p.Status,
              registrationDate: p.Timestamp,
              approvedBy: p.ApprovedBy,
            })),

          manufacturers: manufacturersRes
            .filter(
              (m) => m.District.toLowerCase() === selectedDistrict.toLowerCase()
            )
            .map((m) => ({
              id: m.MbatchID,
              manufacturerId: m.ManufacturerID,
              linkedlabbatch: m.LinkedLabBatchID,
              productName: m.ProductName,
              form: m.ProductForm,
              ingredients: m.Ingredients,
              packaging: m.PackagingInfo,
              weightFinal: m.WeightFinal,
              qrCode: m.QRCodeID,
              location: m.Location,
              district: m.District,
              photos: m.Photos,
              status: m.Status,
              registrationDate: m.Timestamp,
            })),
        });
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();

    // refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // cleanup on unmount
    return () => clearInterval(interval);
  }, [re]);

  const currentData = data?.length ? data : mockData?.[activeTab] || [];

  const filteredData = useMemo(() => {
    return (
      currentData?.filter((item) => {
        const matchesSearch =
          !searchTerm ||
          item?.name
            ?.toString()
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase()) ||
          item?.id
            ?.toString()
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase()) ||
          item?.district?.toLowerCase()?.includes(searchTerm?.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          item?.status?.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
      }) || []
    );
  }, [currentData, searchTerm, statusFilter]);

  const sortedData = useMemo(() => {
    return [...filteredData]?.sort((a, b) => {
      if (!sortConfig?.key) return 0;

      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === "registrationDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === "string") {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) return sortConfig?.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

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
  const adminPhone = localStorage.getItem("phonenumber");

  const handleApprove = async (batchId, activeTab) => {
    setLoadingActions((prev) => ({
      ...prev,
      [`${batchId}_approve`]: true,
    }));

    try {
      const response = await fetch(
        "http://localhost:5001/api/stakeholders/approve",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ batchId, activeTab, adminPhone }), // ✅ send phone too
        }
      );

      if (!response.ok) throw new Error("Failed to approve");

      alert(`${activeTab} batch ${batchId} approved successfully!`);
    } catch (error) {
      console.error(error);
      alert("Failed to approve. Please try again.");
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [`${batchId}_approve`]: false,
      }));
    }
  };

  const handleReject = async (batchId, activeTab) => {
    const adminPhone = localStorage.getItem("phonenumber");

    setLoadingActions((prev) => ({
      ...prev,
      [`${batchId}_reject`]: true,
    }));

    try {
      const response = await fetch(
        "http://localhost:5001/api/stakeholders/reject",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ batchId, activeTab, adminPhone }),
        }
      );

      if (!response.ok) throw new Error("Failed to reject");

      alert(`${activeTab} batch ${batchId} rejected successfully!`);
    } catch (error) {
      console.error(error);
      alert("Failed to reject. Please try again.");
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [`${batchId}_reject`]: false,
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
      "lab-testers": "Lab ",
      processors: "Processors",
      manufacturers: "Manufacturers",
    };
    return names?.[tab] || "Stakeholders";
  };

  const renderSpecificColumns = (item) => {
    const statusConfig = getStatusConfig(item?.status);
    const stakeholderIcon = getStakeholderIcon(activeTab);
    switch (activeTab) {
      case "farmers":
        return (
          <>
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
                    {item?.farmerid}
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
              <span className="text-sm font-mono text-foreground">
                {item?.typeOfHerb || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.harvestedBy || "-"}{" "}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.quantity || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.location || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.locationAccuracy || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.district || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.photos || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm text-muted-foreground">
                {formatDate(item?.registrationDate)}
              </span>
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
          </>
        );
      case "lab-testers":
        return (
          <>
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
                    {item?.labId}
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
              <span className="text-sm font-mono text-foreground">
                {item?.linkedBatchId || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.testType || "-"}{" "}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.testResults || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.DNASequence || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.passFail || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.certificate || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.location || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.locationAccuracy || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.district || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.photos || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm text-muted-foreground">
                {formatDate(item?.registrationDate)}
              </span>
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
          </>
        );
      case "processors":
        return (
          <>
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
                    {item?.processorId}
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
              <span className="text-sm font-mono text-foreground">
                {item?.linkedFarmerBatchId || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.step || "-"}{" "}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.weightGiven || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.weightBefore || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.weightAfter || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.parameters || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.location || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.locationAccuracy || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.district || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.photos || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm text-muted-foreground">
                {formatDate(item?.registrationDate)}
              </span>
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
          </>
        );
      case "manufacturers":
        return (
          <>
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
                    {item?.manufacturerId}
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
              <span className="text-sm font-mono text-foreground">
                {item?.linkedlabbatch || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.productName || "-"}{" "}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.form || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.ingredients || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.packaging || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.weightFinal || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.qrCode || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.location || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.district || "-"}
              </span>
            </td>

            <td className="p-4">
              <span className="text-sm font-mono text-foreground">
                {item?.photos || "-"}
              </span>
            </td>
            <td className="p-4">
              <span className="text-sm text-muted-foreground">
                {formatDate(item?.registrationDate)}
              </span>
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
          </>
        );
      default:
        return null;
    }
  };

  const renderTableHeaders = () => {
    const commonHeaders = <></>;

    const specificHeaders = {
      farmers: (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("name")}
            >
              <span>Farmer ID</span>
              <Icon name={getSortIcon("name")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("id")}
            >
              <span> Batch ID</span>
              <Icon name={getSortIcon("id")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Type of Herb
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Harvesting method
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Quantity
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location Accuracy
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            District
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Photos
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
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              <Icon name={getSortIcon("status")} size={14} />
            </button>
          </th>

          <th className="text-right p-4 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </>
      ),
      "lab-testers": (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("name")}
            >
              <span>Lab ID</span>
              <Icon name={getSortIcon("name")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("id")}
            >
              <span> Batch ID</span>
              <Icon name={getSortIcon("id")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Linked batch
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Test
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Results
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            DNA sequence
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Pass/Fail
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Certificate
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location Accuracy
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            District
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Photos
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
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              <Icon name={getSortIcon("status")} size={14} />
            </button>
          </th>

          <th className="text-right p-4 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </>
      ),
      processors: (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("name")}
            >
              <span>Processor ID</span>
              <Icon name={getSortIcon("name")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("id")}
            >
              <span> Batch ID</span>
              <Icon name={getSortIcon("id")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Linked batch
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Step
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Weight
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Initial Weight
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Weight after
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Parameters
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location Accuracy
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            District
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Photos
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
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              <Icon name={getSortIcon("status")} size={14} />
            </button>
          </th>

          <th className="text-right p-4 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </>
      ),
      manufacturers: (
        <>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("name")}
            >
              <span>Manufacturer ID</span>
              <Icon name={getSortIcon("name")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("id")}
            >
              <span> Batch ID</span>
              <Icon name={getSortIcon("id")} size={14} />
            </button>
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Linked batch
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Product Name
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            form
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Ingredients
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Packaging
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Final Weight
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            QR ID
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Location
          </th>

          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            District
          </th>
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            Photos
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
          <th className="text-left p-4 text-sm font-medium text-muted-foreground">
            <button
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              <Icon name={getSortIcon("status")} size={14} />
            </button>
          </th>

          <th className="text-right p-4 text-sm font-medium text-muted-foreground">
            Actions
          </th>
        </>
      ),
    };

    return (
      <>
        {commonHeaders}
        {specificHeaders?.[activeTab]}
      </>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {showmap && (
        <div
          style={{
            position: "fixed", // full-screen overlay
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent black backdrop
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // ensure it's on top
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
              onClick={() => setshowmap(false)}
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

            {/* Map */}
            <DistrictMap
              district={district}
              location={location}
              message={message}
            />
          </div>
        </div>
      )}
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
              const isApproving = loadingActions?.[`${item?.id}_approve`];
              const isRejecting = loadingActions?.[`${item?.id}_reject`];

              return (
                <tr
                  key={item?.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {renderSpecificColumns(item)}

                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      {item?.status?.toLowerCase() === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(item?.id, activeTab)}
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
                            onClick={() => handleReject(item?.id, activeTab)}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        title="View Details"
                        onClick={() => {
                          setdistrict(item.district);
                          setlocation(item.location);
                          setmessage(formatDate(item?.registrationDate));
                          setshowmap(true);
                        }}
                      >
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
