import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardModules.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  EventService,
  InvoiceService,
  UserService,
  Event as ApiEvent,
  Invoice as ApiInvoice,
  User as ApiUser,
} from "../../services/apiService";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import StoreIcon from "@mui/icons-material/Store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import MoneyIcon from "@mui/icons-material/CreditCard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Event extends ApiEvent {
  id: number;
  name: string;
  date: string;
  status: string;
  description: string;
  location: string;
  clientId: number;
}

interface Invoice extends ApiInvoice {
  id: number;
  amount: number;
  status: string;
  dueDate: string;
  eventId: number;
}

interface User extends ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  availability?: {
    id: number;
    date: string;
    isAvailable: boolean;
  }[];
}

const ClientDashboard: React.FC = () => {
  const [loading] = useState<boolean>(false);

  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [vendors, setVendors] = useState<User[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
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
      } catch (err: any) {}
    };

    fetchEvents();

    const fetchInvoice = async () => {
      try {
        let invoiceData;

        // Different API calls based on user role
        if (role === "ADMIN") {
          invoiceData = await InvoiceService.getAllInvoices();
        } else if (role === "CLIENT" && user?.id) {
          invoiceData = await InvoiceService.getInvoicesByClient(user.id);
        } else {
          // For vendors and staff, they would see invoices related to their assignments
          // This would be implemented with a different API call
          invoiceData = [];
        }

        setInvoices(invoiceData);
      } catch (err: any) {}
    };

    const fetchUsers = async () => {
      try {
        const users = await UserService.getAllUsers();
        setVendors(users.filter((user: User) => user.role === "VENDOR"));
        setStaff(users.filter((user: User) => user.role === "STAFF"));
      } catch (err: unknown) {
        setError('Failed to fetch users');
      }
    };

    fetchInvoice();
    fetchUsers();
  }, [role, user?.id]);

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
      case "PAID":
        return "status-completed";
      case "PENDING":
        return "status-scheduled";
      case "OVERDUE":
        return "status-canceled";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Welcome to your Client Dashboard</h1>
        <p>
          Manage your events, track payments, and connect with vendors all in
          one place.
        </p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon events-icon">
            <CalendarMonthIcon />
          </div>
          <div className="summary-details">
            <h3>{events.filter((e) => e.status === "SCHEDULED").length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon invoices-icon">
            <RequestPageIcon />
          </div>
          <div className="summary-details">
            <h3>{invoices.filter((i) => i.status === "PENDING").length}</h3>
            <p>Pending Invoices</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon vendors-icon">
            <StoreIcon />
          </div>
          <div className="summary-details">
            <h3>5</h3>
            <p>Vendors Hired</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget events-widget">
          <div className="widget-header">
            <h2>Upcoming Events</h2>
            <Link to="/events" className="view-all-link">
              View All <ArrowForwardIcon />
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : events.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.eventName}</td>
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
                      <td>
                        <Link
                          to={`/events/${event.id}`}
                          className="action-button"
                        >
                          <VisibilityIcon />
                        </Link>
                        <Link
                          to={`/events/${event.id}/edit`}
                          className="action-button"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this event?')) {
                              try {
                                await EventService.deleteEvent(event.id);
                                // Refresh the events list
                                const updatedEvents = events.filter(e => e.id !== event.id);
                                setEvents(updatedEvents);
                              } catch (err) {
                                setError('Failed to delete event');
                                console.error('Error deleting event:', err);
                              }
                            }
                          }}
                          className="action-button"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <EditCalendarIcon />
                <p>No upcoming events found</p>
                <Link to="/events/create" className="btn-primary">
                  Create an Event
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="widget vendors-widget">
          <div className="widget-header">
            <h2>Vendors</h2>
            <Link to="/vendors" className="view-all-link">
              View All <ArrowForwardIcon />
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : vendors.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor: User) => (
                    <tr key={vendor.id}>
                      <td>{`${vendor.firstName} ${vendor.lastName}`}</td>
                      <td>{vendor.email}</td>
                      <td>
                        <Link
                          to={`/vendors/${vendor.id}/edit`}
                          className="action-button"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this vendor?')) {
                              try {
                                await UserService.deleteUser(vendor.id);
                                setVendors(vendors.filter((v: User) => v.id !== vendor.id));
                              } catch (err) {
                                setError('Failed to delete vendor');
                                console.error('Error deleting vendor:', err);
                              }
                            }
                          }}
                          className="action-button"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <PersonIcon />
                <p>No vendors found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget staff-widget">
          <div className="widget-header">
            <h2>Staff</h2>
            <Link to="/staff" className="view-all-link">
              View All <ArrowForwardIcon />
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : staff.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((staffMember: User) => (
                    <tr key={staffMember.id}>
                      <td>{`${staffMember.firstName} ${staffMember.lastName}`}</td>
                      <td>{staffMember.email}</td>
                      <td>
                        <Link
                          to={`/staff/${staffMember.id}/edit`}
                          className="action-button"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this staff member?')) {
                              try {
                                await UserService.deleteUser(staffMember.id);
                                setStaff(staff.filter((s: User) => s.id !== staffMember.id));
                              } catch (err) {
                                setError('Failed to delete staff member');
                                console.error('Error deleting staff member:', err);
                              }
                            }
                          }}
                          className="action-button"
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <PersonIcon />
                <p>No staff members found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget invoices-widget">
          <div className="widget-header">
            <h2>Recent Invoices</h2>
            <Link to="/invoices" className="view-all-link">
              View All <ArrowForwardIcon />
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : invoices.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice: Invoice) => (
                    <tr key={invoice.id}>
                      <td>INV-{invoice.id}</td>
                      <td>${invoice.totalAmount.toFixed(2)}</td>
                      <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="action-button"
                        >
                          <VisibilityIcon />
                        </Link>
                        {invoice.status === "PENDING" && (
                          <Link
                            to={`/invoices/${invoice.id}/pay`}
                            className="action-button pay-button"
                          >
                            <CreditCardIcon />
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <ReceiptIcon />
                <p>No invoices found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      <div className="dashboard-actions">
        <Link to="/events/create" className="action-card">
          <div className="action-icon">
            <AddCircleOutlineIcon />
          </div>
          <div className="action-details">
            <h3>Create New Event</h3>
            <p>Plan your next event with our guided setup</p>
          </div>
        </Link>

        <Link to="/profile" className="action-card">
          <div className="action-icon">
            <PersonIcon />
          </div>
          <div className="action-details">
            <h3>Update Profile</h3>
            <p>Manage your account information</p>
          </div>
        </Link>

        <Link to="/events/completed" className="action-card">
          <div className="action-icon">
            <StarIcon />
          </div>
          <div className="action-details">
            <h3>Complete Event Reviews</h3>
            <p>Provide a review for completed events</p>
          </div>
        </Link>

        <Link to="/invoices" className="action-card">
          <div className="action-icon">
            <MoneyIcon />
          </div>
          <div className="action-details">
            <h3>View Invoices</h3>
            <p>View Completed and Pending Invoices</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;
