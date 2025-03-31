import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EventService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/FormPages.css';

const EditEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    eventDate: '',
    eventTime: '',
    status: 'SCHEDULED',
    description: '',
    maxCapacity: 100,
    eventType: 'CORPORATE'
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        const eventData = await EventService.getEventById(parseInt(eventId));
        
        // Check if user has permission to edit this event
        if (role !== 'ADMIN' && (!user || eventData.client.id !== user.id)) {
          setError('You do not have permission to edit this event');
          return;
        }
        
        // Extract date and time from ISO string
        const eventDate = new Date(eventData.eventDate);
        const dateString = eventDate.toISOString().split('T')[0];
        
        // Format time as HH:MM
        const hours = eventDate.getHours().toString().padStart(2, '0');
        const minutes = eventDate.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Set form data
        setFormData({
          eventName: eventData.eventName,
          location: eventData.location,
          eventDate: dateString,
          eventTime: timeString,
          status: eventData.status,
          description: eventData.description || '',
          maxCapacity: eventData.maxCapacity || 100,
          eventType: eventData.eventType || 'CORPORATE'
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId, role, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventId) return;
    
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Combine date and time into a single ISO string
      const dateTime = new Date(`${formData.eventDate}T${formData.eventTime}`);
      
      // Create event object to send to API
      const eventData = {
        eventName: formData.eventName,
        location: formData.location,
        eventDate: dateTime.toISOString(),
        status: formData.status,
        description: formData.description,
        maxCapacity: parseInt(formData.maxCapacity.toString()),
        eventType: formData.eventType
      };

      // Call API to update event
      await EventService.updateEvent(parseInt(eventId), eventData);
      setSuccess('Event updated successfully!');
      
      // Redirect to event details after a short delay
      setTimeout(() => {
        navigate(`/events/${eventId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="form-page-container">
            <div className="form-page-header">
              <h1>Edit Event</h1>
              <p>Update the details of your event</p>
            </div>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            {loading ? (
              <div className="loading-spinner">Loading event details...</div>
            ) : (
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                  <label htmlFor="eventName">Event Name *</label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="Enter event name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventDate">Event Date *</label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventTime">Event Time *</label>
                    <input
                      type="time"
                      id="eventTime"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      <option value="CORPORATE">Corporate</option>
                      <option value="WEDDING">Wedding</option>
                      <option value="BIRTHDAY">Birthday</option>
                      <option value="CONFERENCE">Conference</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxCapacity">Maximum Capacity</label>
                    <input
                      type="number"
                      id="maxCapacity"
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELED">Canceled</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <Link 
                    to={`/events/${eventId}`} 
                    className="btn-secondary"
                  >
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Event'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditEventPage;