import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Assignment,
  AssignmentService,
  Event,
  EventService,
} from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/ListPages.css";
import CheckIcon from "@mui/icons-material/Check";

const AssignmentsPage: React.FC = () => {
  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        let assignmentData;
        if (user) {
          assignmentData = await AssignmentService.getAssignmentsByVendor(
            user.id
          );
        }
        setAssignments(assignmentData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();

    const fetchEvents = async () => {
      setLoading(true);
      try {
        let eventData;
        eventData = await EventService.getAllEvents();
        setEvents(eventData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [role, user?.id]);

  const getEventInfo = (eventID: number) => {
    return events.find((x) => x.id == eventID);
  };

  // Filter events based on search term and status
  const filteredAssignments = assignments.filter((assignments) => {
    const matchesSearch =
      (assignments.event &&
        getEventInfo(assignments.event.id)
          ?.eventName.toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (assignments.event &&
        getEventInfo(assignments.event.id)
          ?.location.toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (assignments.vendor &&
        assignments.vendor.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      assignments.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || assignments.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getEventDate = (eventID: number) => {
    let event = getEventInfo(eventID);
    if (event) return formatDate(event.eventDate);

    return "";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return "status-scheduled";
      case "AVAILABLE":
        return "status-completed";
      default:
        return "";
    }
  };

  const changeAssignment = (assignmentID: number) => {
    let assignmentIndex = assignments.findIndex((x) => x.id === assignmentID);
    let temp = [...assignments];
    if (assignmentIndex != -1) {
      if (temp[assignmentIndex].status === "ASSIGNED") {
        temp[assignmentIndex].status = "AVAILABLE";
      } else if (temp[assignmentIndex].status === "AVAILABLE") {
        temp[assignmentIndex].status = "ASSIGNED";
      } else {
        temp[assignmentIndex].status = "";
      }
      AssignmentService.setAssignmentStatus(
        temp[assignmentIndex].id,
        temp[assignmentIndex].status
      );

      setAssignments(temp);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="list-page-container">
            <div className="list-page-header">
              <div className="list-title">
                <h1>Assignments</h1>
                <p>
                  Manage your Assignments
                  {statusFilter === "COMPLETED" && (
                    <span>
                      {" "}
                      - click on the star to review completed event
                      transactions.{" "}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="list-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa fa-search"></i>
              </div>

              <div className="filter-options">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="AVAILABLE">Available</option>
                </select>
              </div>
            </div>

            {error && <div className="list-error">{error}</div>}

            {loading ? (
              <div className="loading-spinner">Loading events...</div>
            ) : filteredAssignments.length > 0 ? (
              <div className="list-table-container">
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date & Time</th>
                      <th>Location</th>
                      {role === "ADMIN" && <th>Vendor</th>}
                      <th>Role</th>
                      <th>Status</th>
                      <th>Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{getEventInfo(assignment.event.id)?.eventName}</td>
                        <td>{getEventDate(assignment.event.id)}</td>
                        <td>{getEventInfo(assignment.event.id)?.location}</td>
                        {role === "ADMIN" && (
                          <td>
                            {assignment.vendor
                              ? `${assignment.vendor.firstName} ${assignment.vendor.lastName}`
                              : "N/A"}
                          </td>
                        )}
                        <td>{assignment.role}</td>
                        <td>
                          <span
                            className={`status-badge ${getStatusClass(
                              assignment.status
                            )}`}
                          >
                            {assignment.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <a
                            className="action-button"
                            onClick={() => changeAssignment(assignment.id)}
                          >
                            <CheckIcon />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-calendar"></i>
                <h3>No assignments found</h3>
                <p>
                  {searchTerm || statusFilter !== "ALL"
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first event"}
                </p>
                {!searchTerm && statusFilter === "ALL" && (
                  <Link to="/events/create" className="btn-primary">
                    Create Event
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignmentsPage;
