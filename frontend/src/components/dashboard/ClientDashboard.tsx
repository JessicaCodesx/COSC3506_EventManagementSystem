import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/DashboardModules.css';

const mockEvents = [
  { 
    id: 1, 
    eventName: 'Annual Corporate Retreat', 
    location: 'Mountain View Resort', 
    eventDate: '2025-06-15T14:00:00', 
    status: 'SCHEDULED' 
  },
  { 
    id: 2, 
    eventName: 'Product Launch', 
    location: 'Downtown Convention Center', 
    eventDate: '2025-05-10T09:00:00', 
    status: 'SCHEDULED' 
  },
  { 
    id: 3, 
    eventName: 'Team Building Workshop', 
    location: 'Adventure Park', 
    eventDate: '2025-04-22T10:00:00', 
    status: 'COMPLETED' 
  }
];

const mockInvoices = [
  { 
    id: 101, 
    eventId: 1, 
    totalAmount: 5200.00, 
    status: 'PENDING', 
    dueDate: '2025-05-15' 
  },
  { 
    id: 102, 
    eventId: 2, 
    totalAmount: 3750.00, 
    status: 'PAID', 
    dueDate: '2025-04-10' 
  },
  { 
    id: 103, 
    eventId: 3, 
    totalAmount: 1500.00, 
    status: 'PAID', 
    dueDate: '2025-03-22' 
  }
];

const ClientDashboard: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(mockEvents);
  const [recentInvoices, setRecentInvoices] = useState(mockInvoices);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'status-scheduled';
      case 'COMPLETED':
        return 'status-completed';
      case 'CANCELED':
        return 'status-canceled';
      case 'PAID':
        return 'status-completed';
      case 'PENDING':
        return 'status-scheduled';
      case 'OVERDUE':
        return 'status-canceled';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Welcome to your Client Dashboard</h1>
        <p>Manage your events, track payments, and connect with vendors all in one place.</p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon events-icon">
            <i className="fa fa-calendar"></i>
          </div>
          <div className="summary-details">
            <h3>{upcomingEvents.filter(e => e.status === 'SCHEDULED').length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon invoices-icon">
            <i className="fa fa-file-invoice-dollar"></i>
          </div>
          <div className="summary-details">
            <h3>{recentInvoices.filter(i => i.status === 'PENDING').length}</h3>
            <p>Pending Invoices</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon vendors-icon">
            <i className="fa fa-store"></i>
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
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : upcomingEvents.length > 0 ? (
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
                  {upcomingEvents.map(event => (
                    <tr key={event.id}>
                      <td>{event.eventName}</td>
                      <td>{formatDate(event.eventDate)}</td>
                      <td>{event.location}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/events/${event.id}`} className="action-button">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fa fa-calendar-plus"></i>
                <p>No upcoming events found</p>
                <Link to="/events/create" className="btn-primary">
                  Create an Event
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="widget invoices-widget">
          <div className="widget-header">
            <h2>Recent Invoices</h2>
            <Link to="/invoices" className="view-all-link">
              View All <i className="fa fa-arrow-right"></i>
            </Link>
          </div>
          
          <div className="widget-content">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : recentInvoices.length > 0 ? (
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
                  {recentInvoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>INV-{invoice.id}</td>
                      <td>${invoice.totalAmount.toFixed(2)}</td>
                      <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/invoices/${invoice.id}`} className="action-button">
                          <i className="fa fa-eye"></i>
                        </Link>
                        {invoice.status === 'PENDING' && (
                          <Link to={`/invoices/${invoice.id}/pay`} className="action-button pay-button">
                            <i className="fa fa-credit-card"></i>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fa fa-file-invoice"></i>
                <p>No invoices found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/events/create" className="action-card">
          <div className="action-icon">
            <i className="fa fa-plus-circle"></i>
          </div>
          <div className="action-details">
            <h3>Create New Event</h3>
            <p>Plan your next event with our guided setup</p>
          </div>
        </Link>
        
        <Link to="/profile" className="action-card">
          <div className="action-icon">
            <i className="fa fa-user-edit"></i>
          </div>
          <div className="action-details">
            <h3>Update Profile</h3>
            <p>Manage your account information</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;