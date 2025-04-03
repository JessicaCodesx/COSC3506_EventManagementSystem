import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardModules.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import {
  EventService,
  UserService,
  InvoiceService,
  Event,
  User,
  Invoice,
} from "../../services/apiService";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useAuth } from "../../contexts/AuthContext";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard: React.FC = () => {
  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let eventData;
        eventData = await EventService.getAllEvents();
        setEvents(eventData);
      } catch (err: any) {}
    };

    fetchEvents();

    const fetchUsers = async () => {
      try {
        let userData;
        userData = await UserService.getAllUsers();
        setUsers(userData);
      } catch (err: any) {}
    };

    fetchUsers();

    const fetchInvoice = async () => {
      try {
        let invoiceData;
        invoiceData = await InvoiceService.getAllInvoices();
        setInvoices(invoiceData);
      } catch (err: any) {}
    };

    fetchInvoice();
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

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "role-admin";
      case "CLIENT":
        return "role-client";
      case "VENDOR":
        return "role-vendor";
      case "STAFF":
        return "role-staff";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Admin Dashboard</h1>
        <p>Monitor system activity, manage users, and generate reports.</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <CalendarTodayIcon />
          </div>
          <div className="summary-details">
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <GroupIcon />
          </div>
          <div className="summary-details">
            <h3>{users.length}</h3>
            <p>Registered Users</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <PriceChangeIcon />
          </div>
          <div className="summary-details">
            <h3>
              $
              {invoices
                .reduce((sum, invoice) => sum + invoice.totalAmount, 0)
                .toFixed(2)}
            </h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <AttachMoneyIcon />
          </div>
          <div className="summary-details">
            <h3>{invoices.filter((inv) => inv.status === "PENDING").length}</h3>
            <p>Pending Invoices</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
        <div className="widget events-widget">
          <div className="widget-header">
            <h2>Upcoming Events</h2>
            <Link to="/events" className="view-all-link">
              View All
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
                    <th>Client</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 5).map((event) => (
                    <tr key={event.id}>
                      <td>{event.eventName}</td>
                      <td>{event.client ? event.client.firstName : ""}</td>
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
                                const updatedEvents = await EventService.getAllEvents();
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
                <i className="fa fa-calendar-plus"></i>
                <p>No events found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget users-widget">
          <div className="widget-header">
            <h2>Recent Users</h2>
            <Link to="/users" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : users.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td>{`${user.firstName} ${user.lastName}`}</td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`role-badge ${getRoleBadgeClass(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/users/${user.id}/edit`}
                          className="action-button"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this user?')) {
                              try {
                                await UserService.deleteUser(user.id);
                                // Refresh the users list
                                const updatedUsers = await UserService.getAllUsers();
                                setUsers(updatedUsers);
                              } catch (err) {
                                setError('Failed to delete user');
                                console.error('Error deleting user:', err);
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
                <i className="fa fa-users"></i>
                <p>No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/report/create" className="action-card">
          <div className="action-icon">
            <ReceiptIcon />
          </div>
          <div className="action-details">
            <h3>Generate Report</h3>
            <p>Generate Event Reports </p>
          </div>
        </Link>

        <Link to="/users/create" className="action-card">
          <div className="action-icon">
            <PersonAddIcon />
          </div>
          <div className="action-details">
            <h3>Add New User</h3>
            <p>Create account for user</p>
          </div>
        </Link>

        <Link to="/users" className="action-card">
          <div className="action-icon">
            <PersonIcon />
          </div>
          <div className="action-details">
            <h3>Edit Existing User</h3>
            <p>Change data from an existing account</p>
          </div>
        </Link>

        <Link to="/invoices/create" className="action-card">
          <div className="action-icon">
            <RequestQuoteIcon />
          </div>
          <div className="action-details">
            <h3>Create Invoice</h3>
            <p>Generate a new invoice</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
