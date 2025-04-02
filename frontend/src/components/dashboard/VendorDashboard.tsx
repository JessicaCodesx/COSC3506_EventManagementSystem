import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardModules.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  User,
  Event,
  Invoice,
  EventService,
  UserService,
  InvoiceService,
  Assignment,
  AssignmentService,
  Payment,
  PaymentService,
} from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CheckIcon from "@mui/icons-material/Check";
// Mock data - in a real app, this would come from API
const mockAssignments = [
  {
    id: 1,
    eventName: "Annual Corporate Retreat",
    clientName: "Acme Corp",
    location: "Mountain View Resort",
    eventDate: "2025-06-15T14:00:00",
    role: "Catering",
    status: "SCHEDULED",
  },
  {
    id: 2,
    eventName: "Product Launch",
    clientName: "Tech Innovations Inc",
    location: "Downtown Convention Center",
    eventDate: "2025-04-05T09:00:00",
    role: "AV Equipment",
    status: "SCHEDULED",
  },
  {
    id: 3,
    eventName: "Charity Gala",
    clientName: "Global Foundation",
    location: "Grand Ballroom",
    eventDate: "2025-04-29T18:00:00",
    role: "Decorations",
    status: "SCHEDULED",
  },
];

const VendorDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, role } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);

  // In a real app, you would fetch data from API
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

  const getEventDate = (eventID: number, format: boolean) => {
    let event = getEventInfo(eventID);
    if (event && format) return formatDate(event.eventDate);
    else if (event && !format) return event.eventDate;

    return "";
  };

  const getEventClient = (eventID: number) => {
    let event = getEventInfo(eventID);
    if (event && event.client)
      return (
        event.client.firstName +
        " " +
        event.client.lastName +
        " " +
        event.client.email
      );
    else {
      return "";
    }
  };

  const getEventInfo = (eventID: number) => {
    return events.find((x) => x.id == eventID);
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

  const formatPaymentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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

  const setStatusClass = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return "status-available";
      case "AVAILABLE":
        return "status-assigned";
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

  // Calculate upcoming assignments (next 7 days)
  const upcomingAssignments = assignments.filter((assignment) => {
    const eventDate = new Date(getEventDate(assignment.event.id, false));
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  });

  // Calculate total earnings
  const totalEarnings = payments.reduce(
    (sum, payment) => sum + payment.amountPaid,
    0
  );

  return (
    <div className="p-4">
      <div className="dashboard-welcome">
        <h1>Vendor Dashboard</h1>
        <p>
          Manage your service assignments, track payments, and update your
          profile.
        </p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon assignments-icon">
            <AssignmentIcon />
          </div>
          <div className="summary-details">
            <h3>{assignments.length}</h3>
            <p>Total Assignments</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon upcoming-icon">
            <AddAlertIcon />
          </div>
          <div className="summary-details">
            <h3>{upcomingAssignments.length}</h3>
            <p>Upcoming (7 days)</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon earnings-icon">
            <AttachMoneyIcon />
          </div>
          <div className="summary-details">
            <h3>${totalEarnings.toFixed(2)}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets" style={{ minHeight: 700 }}>
        <div className="widget assignments-widget">
          <div className="widget-header">
            <h2>Your Assignments</h2>
            <Link to="/assignments" className="view-all-link">
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : assignments.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Client</th>
                    <th>Date & Time</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{getEventInfo(assignment.event.id)?.eventName}</td>
                      <td>{getEventClient(assignment.event.id)}</td>
                      <td className="text-nowrap">
                        {getEventDate(assignment.event.id, true)}
                      </td>
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
                      <td>
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
            ) : (
              <div className="empty-state">
                <CheckIcon />
                <p>No assignments found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget payments-widget">
          <div className="widget-header">
            <h2>Recent Payments</h2>
            <Link to="/paymentslist" className="view-all-link">
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : payments.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.eventName}</td>
                      <td>${payment.amountPaid.toFixed(2)}</td>
                      <td>{formatPaymentDate(payment.paymentDate)}</td>
                      <td>{payment.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fa fa-money-bill-wave"></i>
                <p>No payments found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/assignments" className="action-card">
          <div className="action-icon">
            <AssignmentIcon />
          </div>
          <div className="action-details">
            <h3>View Assignments</h3>
            <p>See a list of your scheduled and completed assignments</p>
          </div>
        </Link>

        <Link to="/invoices/create" className="action-card">
          <div className="action-icon">
            <RequestPageIcon />
          </div>
          <div className="action-details">
            <h3>Submit Invoices</h3>
            <p>Submit an invoice for services rendered</p>
          </div>
        </Link>

        <Link to="/availability" className="action-card">
          <div className="action-icon">
            <CalendarMonthIcon />
          </div>
          <div className="action-details">
            <h3>Set Availability</h3>
            <p>Update your calendar and availability</p>
          </div>
        </Link>

        <Link to="/profile" className="action-card">
          <div className="action-icon">
            <SyncAltIcon />
          </div>
          <div className="action-details">
            <h3>Update Profile</h3>
            <p>Edit your profile information</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
