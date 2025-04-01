import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardModules.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const mockEvents = [
  {
    id: 1,
    eventName: "Annual Corporate Retreat",
    client: "Acme Corp",
    location: "Mountain View Resort",
    eventDate: "2025-06-15T14:00:00",
    status: "SCHEDULED",
  },
  {
    id: 2,
    eventName: "Product Launch",
    client: "Tech Innovations Inc",
    location: "Downtown Convention Center",
    eventDate: "2025-05-10T09:00:00",
    status: "SCHEDULED",
  },
  {
    id: 3,
    eventName: "Charity Gala",
    client: "Global Foundation",
    location: "Grand Ballroom",
    eventDate: "2025-04-30T18:00:00",
    status: "SCHEDULED",
  },
  {
    id: 4,
    eventName: "Team Building Workshop",
    client: "Startup XYZ",
    location: "Adventure Park",
    eventDate: "2025-04-22T10:00:00",
    status: "COMPLETED",
  },
];

const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "CLIENT",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "VENDOR",
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert@example.com",
    role: "STAFF",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Williams",
    email: "emily@example.com",
    role: "CLIENT",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    role: "VENDOR",
  },
];

const mockInvoices = [
  {
    id: 101,
    eventId: 1,
    client: "Acme Corp",
    totalAmount: 5200.0,
    status: "PENDING",
    dueDate: "2025-05-15",
  },
  {
    id: 102,
    eventId: 2,
    client: "Tech Innovations Inc",
    totalAmount: 3750.0,
    status: "PAID",
    dueDate: "2025-04-10",
  },
  {
    id: 103,
    eventId: 3,
    client: "Global Foundation",
    totalAmount: 8900.0,
    status: "PENDING",
    dueDate: "2025-04-15",
  },
];

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [users, setUsers] = useState(mockUsers);
  const [invoices, setInvoices] = useState(mockInvoices);
  const [loading, setLoading] = useState(false);

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
            <i className="fa fa-calendar"></i>
          </div>
          <div className="summary-details">
            <h3>{events.length}</h3>
            <p>Total Events</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fa fa-users"></i>
          </div>
          <div className="summary-details">
            <h3>{users.length}</h3>
            <p>Registered Users</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="fa fa-dollar-sign"></i>
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
            <i className="fa fa-file-invoice-dollar"></i>
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
              View All <i className="fa fa-arrow-right"></i>
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
                      <td>{event.client}</td>
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
                          <i className="fa fa-eye"></i>
                        </Link>
                        <Link
                          to={`/events/${event.id}/edit`}
                          className="action-button"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
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
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>

          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
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
                          to={`/users/${user.id}`}
                          className="action-button"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <Link
                          to={`/users/${user.id}/edit`}
                          className="action-button"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
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
            <PersonIcon />
          </div>
          <div className="action-details">
            <h3>Add New User</h3>
            <p>Create account for user</p>
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
