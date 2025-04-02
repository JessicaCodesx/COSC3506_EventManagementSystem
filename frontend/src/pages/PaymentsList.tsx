import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Assignment,
  AssignmentService,
  Event,
  EventService,
  Payment,
  PaymentService,
} from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/ListPages.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

const PaymentsList: React.FC = () => {
  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [payments, setPayments] = useState<Payment[]>([]);

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

    const fetchPayments = async () => {
      setLoading(true);
      try {
        let paymentData = await PaymentService.getAllPayments();
        setPayments(paymentData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch payment information");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [role, user?.id]);

  const getEventInfo = (eventID: number) => {
    return events.find((x) => x.id == eventID);
  };

  // Filter events based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
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

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="list-page-container">
            <div className="list-page-header">
              <div className="list-title">
                <h1>Payments History </h1>
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
            </div>

            {error && <div className="list-error">{error}</div>}

            {loading ? (
              <div className="loading-spinner">Loading events...</div>
            ) : filteredPayments.length > 0 ? (
              <div className="list-table-container">
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.eventName}</td>
                        <td>{payment.amountPaid}</td>
                        <td>{formatDate(payment.paymentDate)}</td>
                        <td>{payment.paymentMethod}</td>
                        <td></td>
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

export default PaymentsList;
