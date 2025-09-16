import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentSubmissionsTable = ({ submissions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(submissions?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = submissions?.slice(startIndex, endIndex);

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

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recent Submissions
            </h3>
            <p className="text-sm text-muted-foreground">
              Latest data submissions across all stakeholders
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
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
                Location
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentSubmissions?.map((submission) => {
              const statusConfig = getStatusConfig(submission?.status);
              const stakeholderIcon = getStakeholderIcon(
                submission?.stakeholderType
              );

              return (
                <tr
                  key={submission?.id}
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
                          {submission?.stakeholderName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {submission?.stakeholderType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono text-foreground">
                      {submission?.submissionId}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">
                      {submission?.submissionType}
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
                        {submission?.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(submission?.timestamp)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
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
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, submissions?.length)} of {submissions?.length}{" "}
              entries
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
        </div>
      )}
    </div>
  );
};

export default RecentSubmissionsTable;
