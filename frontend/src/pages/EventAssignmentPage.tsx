import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EventService, AssignmentService, UserService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/FormPages.css';

interface Event {
  id: number;
  eventName: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const EventAssignmentPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { role } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [vendors, setVendors] = useState<User[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    assignmentType: 'VENDOR',
    userId: '',
    role: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        // Fetch event details
        const eventData = await EventService.getEventById(parseInt(eventId));
        setEvent(eventData);
        
        // Fetch vendors
        const usersData = await UserService.getAllUsers();
        
        // Filter users by role
        setVendors(usersData.filter((user: User) => user.role === 'VENDOR'));
        setStaff(usersData.filter((user: User) => user.role === 'STAFF'));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!eventId || !formData.userId || !formData.role) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const assignmentData = {
        event: { id: parseInt(eventId) },
        role: formData.role
      };

      // Add either vendor or staff based on assignment type
      if (formData.assignmentType === 'VENDOR') {
        Object.assign(assignmentData, { vendor: { id: parseInt(formData.userId) } });
      } else {
        Object.assign(assignmentData, { staff: { id: parseInt(formData.userId) } });
      }

      // Create the assignment
      await AssignmentService.createAssignment(assignmentData);
      setSuccess('Assignment created successfully!');
      
      // Reset form
      setFormData({
        assignmentType: 'VENDOR',
        userId: '',
        role: ''
      });
      
      // Redirect back to event details after a short delay
      setTimeout(() => {
        navigate(`/events/${eventId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create assignment');
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
              <h1>Assign Vendor or Staff</h1>
              <p>Add a vendor or staff member to {event?.eventName}</p>
            </div>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                  <label htmlFor="assignmentType">Assignment Type *</label>
                  <select
                    id="assignmentType"
                    name="assignmentType"
                    value={formData.assignmentType}
                    onChange={handleChange}
                    required
                  >
                    <option value="VENDOR">Vendor</option>
                    <option value="STAFF">Staff</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="userId">
                    {formData.assignmentType === 'VENDOR' ? 'Select Vendor *' : 'Select Staff Member *'}
                  </label>
                  <select
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select {formData.assignmentType === 'VENDOR' ? 'a vendor' : 'a staff member'} --</option>
                    {formData.assignmentType === 'VENDOR' ? (
                      vendors.map(vendor => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.firstName} {vendor.lastName} ({vendor.email})
                        </option>
                      ))
                    ) : (
                      staff.map(staffMember => (
                        <option key={staffMember.id} value={staffMember.id}>
                          {staffMember.firstName} {staffMember.lastName} ({staffMember.email})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role/Responsibility *</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder={formData.assignmentType === 'VENDOR' ? 'e.g., Catering, Decoration, Photography' : 'e.g., Event Coordinator, Host, Technical Support'}
                    required
                  />
                </div>

                <div className="form-actions">
                  <Link to={`/events/${eventId}`} className="btn-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn-primary">
                    Create Assignment
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

export default EventAssignmentPage;