import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentSubmissionsTable = ({ district }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5001/api/admin/dashboard/recentsubmissions?district=${district}`
        );
        if (!res.ok) throw new Error("Failed to fetch submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch recent submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchSubmissions();

    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, [district]);

  // Pagination
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = submissions.slice(startIndex, endIndex);

  // Status helper
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  // Show details modal
  const showDetails = async (submission) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/dashboard/submission/${submission.submissionId}`
      );
      if (!res.ok) throw new Error("Failed to fetch details");
      const data = await res.json();
      setSelectedSubmission(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch submission details:", err);
    }
  };

  // Export submissions as CSV (no imports needed)
  const exportToCSV = () => {
    if (!submissions.length) return;

    // Extract headers
    const headers = Object.keys(submissions[0]);
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(","));

    // Add rows
    for (const row of submissions) {
      const values = headers.map(
        (h) => `"${row[h] !== null && row[h] !== undefined ? row[h] : ""}"`
      );
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");

    // Trigger download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "submissions.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            All Submissions
          </h3>
          <p className="text-sm text-muted-foreground">
            Latest data submissions across all stakeholders
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Icon name="Download" size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Stakeholder
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Submitted
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                All Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentSubmissions.map((submission) => {
              const statusConfig = getStatusConfig(submission.status);
              const stakeholderIcon = getStakeholderIcon(
                submission.stakeholderType
              );

              return (
                <tr
                  key={submission.submissionId}
                  className="hover:bg-muted/30 transition-smooth"
                >
                  <td className="p-4 flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                      <Icon
                        name={stakeholderIcon}
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {submission.stakeholderName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {submission.stakeholderType}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-mono text-foreground">
                    {submission.submissionId}
                  </td>
                  <td className="p-4 text-sm text-foreground">
                    {submission.submissionType}
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bgColor}`}
                    >
                      <Icon
                        name={statusConfig.icon}
                        size={12}
                        className={statusConfig.textColor}
                      />
                      <span
                        className={`text-xs font-medium ${statusConfig.textColor}`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(submission.timestamp)}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showDetails(submission)}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, submissions.length)}{" "}
            of {submissions.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-sm font-medium text-foreground px-3">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Submission Details
            </h2>

            <div className="space-y-4">
              {Object.entries(selectedSubmission).map(([key, value]) => (
                <div key={key} className="p-3 border rounded-lg bg-gray-50">
                  <p className="text-sm text-muted-foreground mb-1">{key}</p>
                  <p className="text-base font-medium text-foreground">
                    {value?.toString() || "-"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentSubmissionsTable;
