import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EventService, AssignmentService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/DetailPages.css';

interface Event {
  id: number;
  eventName: string;
  location: string;
  eventDate: string;
  status: string;
  description?: string;
  client?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Assignment {
  id: number;
  event: {
    id: number;
  };
  vendor?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  staff?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  role: string;
}

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        const eventData = await EventService.getEventById(parseInt(eventId));
        setEvent(eventData);
        
        const assignmentData = await AssignmentService.getAssignmentsByEvent(parseInt(eventId));
        setAssignments(assignmentData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventData();
  }, [eventId]);

  const handleDeleteEvent = async () => {
    if (!eventId) return;
    
    try {
      await EventService.deleteEvent(parseInt(eventId));
      navigate('/events');
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
    }
  };

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
      default:
        return '';
    }
  };

  const canEdit = () => {
    if (role === 'ADMIN') return true;
    if (role === 'CLIENT' && event?.client?.id === user?.id) return true;
    return false;
  };

  const canDelete = () => {
    if (role === 'ADMIN') return true;
    if (role === 'CLIENT' && event?.client?.id === user?.id) return true;
    return false;
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="detail-page-container">
            {loading ? (
              <div className="loading-spinner">Loading event details...</div>
            ) : error ? (
              <div className="detail-error">
                <p>{error}</p>
                <Link to="/events" className="btn-primary">
                  Back to Events
                </Link>
              </div>
            ) : event ? (
              <>
                <div className="detail-header">
                  <div className="detail-title">
                    <h1>{event.eventName}</h1>
                    <span className={`status-badge ${getStatusClass(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="detail-actions">
                    {canEdit() && (
                      <Link to={`/events/${eventId}/edit`} className="btn btn-secondary">
                        <i className="fa fa-edit"></i> Edit
                      </Link>
                    )}
                    {canDelete() && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => setDeleteModalOpen(true)}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>
                    )}
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-section">
                    <h2>Event Details</h2>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Date & Time</span>
                        <span className="detail-value">{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">{event.location}</span>
                      </div>
                      {role === 'ADMIN' && event.client && (
                        <div className="detail-item">
                          <span className="detail-label">Client</span>
                          <span className="detail-value">
                            {event.client.firstName} {event.client.lastName} ({event.client.email})
                          </span>
                        </div>
                      )}
                    </div>
                    {event.description && (
                      <div className="detail-description">
                        <h3>Description</h3>
                        <p>{event.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <div className="section-header">
                      <h2>Assigned Staff & Vendors</h2>
                      {canEdit() && (
                        <Link to={`/events/${eventId}/assign`} className="btn-link">
                          <i className="fa fa-plus"></i> Add Assignment
                        </Link>
                      )}
                    </div>
                    
                    {assignments.length > 0 ? (
                      <div className="detail-table-container">
                        <table className="detail-table">
                          <thead>
                            <tr>
                              <th>Role</th>
                              <th>Type</th>
                              <th>Name</th>
                              <th>Email</th>
                              {canEdit() && <th>Actions</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {assignments.map(assignment => (
                              <tr key={assignment.id}>
                                <td>{assignment.role}</td>
                                <td>{assignment.vendor ? 'Vendor' : 'Staff'}</td>
                                <td>
                                  {assignment.vendor ? 
                                    `${assignment.vendor.firstName} ${assignment.vendor.lastName}` : 
                                    assignment.staff ? 
                                      `${assignment.staff.firstName} ${assignment.staff.lastName}` : 
                                      'N/A'}
                                </td>
                                <td>
                                  {assignment.vendor ? 
                                    assignment.vendor.email : 
                                    assignment.staff ? 
                                      assignment.staff.email : 
                                      'N/A'}
                                </td>
                                {canEdit() && (
                                  <td className="actions-cell">
                                    <button 
                                      className="action-button"
                                      title="Remove Assignment"
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="detail-empty-state">
                        <p>No staff or vendors assigned to this event yet.</p>
                        {canEdit() && (
                          <Link to={`/events/${eventId}/assign`} className="btn-primary">
                            <i className="fa fa-plus"></i> Assign Staff/Vendor
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-footer">
                  <Link to="/events" className="btn btn-secondary">
                    <i className="fa fa-arrow-left"></i> Back to Events
                  </Link>
                </div>

                {deleteModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-container">
                      <div className="modal-header">
                        <h2>Confirm Deletion</h2>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete the event "{event.eventName}"?</p>
                        <p className="modal-warning">This action cannot be undone.</p>
                      </div>
                      <div className="modal-footer">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setDeleteModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={handleDeleteEvent}
                        >
                          Delete Event
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="detail-error">
                <p>Event not found.</p>
                <Link to="/events" className="btn-primary">
                  Back to Events
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetailsPage;