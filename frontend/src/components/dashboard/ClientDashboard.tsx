import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/DashboardModules.css';
import { useAuth } from "../../contexts/AuthContext";
import {
  User,
  Event,
  Invoice,
  EventService,
  UserService,
  InvoiceService,
} from "../../services/apiService";

import VisibilityIcon from '@mui/icons-material/Visibility';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ClientDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEvents(await EventService.getAllEvents());
      } catch (err: any) {}
    };

    fetchEvents();

    const fetchInvoice = async () => {
      try {
        setInvoices(await InvoiceService.getAllInvoices());
      } catch (err: any) {}
    };

    fetchInvoice();
  }, [role, user?.id]);

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
            <CalendarMonthIcon />
          </div>
          <div className="summary-details">
            <h3>{events.filter(e => e.status === 'SCHEDULED').length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon invoices-icon">
            <RequestPageIcon />
          </div>
          <div className="summary-details">
            <h3>{invoices.filter(i => i.status === 'PENDING').length}</h3>
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
                  {events.map(event => (
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
                          <VisibilityIcon />
                        </Link>
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
                  {invoices.map(invoice => (
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
                          <VisibilityIcon/>
                        </Link>
                        {invoice.status === 'PENDING' && (
                          <Link to={`/invoices/${invoice.id}/pay`} className="action-button pay-button">
                            <CreditCardIcon/>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <ReceiptIcon/>
                <p>No invoices found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/events/create" className="action-card">
          <div className="action-icon">
            <AddCircleOutlineIcon/>
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
      </div>
    </div>
  );
};

export default ClientDashboard;