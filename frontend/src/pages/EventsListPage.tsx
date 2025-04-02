import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Event, EventService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/ListPages.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

interface PropComplete {
  status: string;
}

const EventsListPage: React.FC<PropComplete> = ({ status }) => {
  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(status);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let eventData;

        // Different API calls based on user role
        if (role === "ADMIN") {
          eventData = await EventService.getAllEvents();
        } else if (role === "CLIENT" && user?.id) {
          eventData = await EventService.getEventsByClientId(user.id);
        } else {
          // For vendors and staff, they would see assigned events
          // This would be implemented with a different API call
          eventData = await EventService.getAllEvents();
        }

        setEvents(eventData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [role, user?.id]);

  // Filter events based on search term and status
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      case "SCHEDULED":
        return "status-scheduled";
      case "COMPLETED":
        return "status-completed";
      case "CANCELED":
        return "status-canceled";
      default:
        return "";
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
                <h1>Events</h1>
                <p>
                  Manage your events{" "}
                  {statusFilter === "COMPLETED" && (
                    <span>
                      {" "}
                      - click on the star to review completed event
                      transactions.{" "}
                    </span>
                  )}
                </p>
              </div>
              <Link to="/events/create" className="btn-primary">
                <i className="fa fa-plus"></i> Create Event
              </Link>
            </div>

            <div className="list-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search events..."
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
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
            </div>

            {error && <div className="list-error">{error}</div>}

            {loading ? (
              <div className="loading-spinner">Loading events...</div>
            ) : filteredEvents.length > 0 ? (
              <div className="list-table-container">
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      {role === "ADMIN" && <th>Client</th>}
                      <th>Date & Time</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td>{event.eventName}</td>
                        {role === "ADMIN" && (
                          <td>
                            {event.client
                              ? `${event.client.firstName} ${event.client.lastName}`
                              : "N/A"}
                          </td>
                        )}
                        <td>{formatDate(event.eventDate)}</td>
                        <td>{event.location}</td>
                        <td>
                          <span
                            className={`status-badge ${getStatusClass(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {event.status === "COMPLETED" && (
                            <Link
                              to={`/events/${event.id}`}
                              className="action-button"
                              title="Review"
                            >
                              <StarIcon />
                            </Link>
                          )}
                          <Link
                            to={`/events/${event.id}`}
                            className="action-button"
                            title="View Details"
                          >
                            <VisibilityIcon />
                          </Link>
                          <Link
                            to={`/events/${event.id}/edit`}
                            className="action-button"
                            title="Edit"
                          >
                            <EditIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-calendar"></i>
                <h3>No events found</h3>
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

export default EventsListPage;
