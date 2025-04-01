import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardModules.css";

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
    eventDate: "2025-05-10T09:00:00",
    role: "AV Equipment",
    status: "SCHEDULED",
  },
  {
    id: 3,
    eventName: "Charity Gala",
    clientName: "Global Foundation",
    location: "Grand Ballroom",
    eventDate: "2025-04-30T18:00:00",
    role: "Decorations",
    status: "SCHEDULED",
  },
];

const mockPayments = [
  {
    id: 101,
    eventId: 1,
    eventName: "Annual Corporate Retreat",
    amountPaid: 2500.0,
    paymentDate: "2025-04-15",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 102,
    eventId: 2,
    eventName: "Product Launch",
    amountPaid: 1750.0,
    paymentDate: "2025-03-25",
    paymentMethod: "Credit Card",
  },
];

const VendorDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [payments, setPayments] = useState(mockPayments);
  const [loading, setLoading] = useState(false);

  // In a real app, you would fetch data from API
  useEffect(() => {
    // Example of how you would fetch data
    const fetchData = async () => {
      setLoading(true);
      try {
        // const token = localStorage.getItem('token');
        // const vendorId = '1'; // Would come from auth context or state
        // const assignmentsResponse = await fetch(`http://localhost:8080/api/assignments/vendor/${vendorId}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const assignmentsData = await assignmentsResponse.json();
        // setAssignments(assignmentsData);
        // // Fetch payments related to vendor
        // // This would be a different endpoint in a real API
        // const paymentsResponse = await fetch(`http://localhost:8080/api/payments/vendor/${vendorId}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const paymentsData = await paymentsResponse.json();
        // setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Comment out for now since we're using mock data
    // fetchData();
  }, []);

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
      case "SCHEDULED":
        return "status-scheduled";
      case "COMPLETED":
        return "status-completed";
      case "CANCELED":
        return "status-canceled";
      default:
        return "";
    }
  };

  // Calculate upcoming assignments (next 7 days)
  const upcomingAssignments = assignments.filter((assignment) => {
    const eventDate = new Date(assignment.eventDate);
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
    <div className="dashboard-container">
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
            <i className="fa fa-calendar-check"></i>
          </div>
          <div className="summary-details">
            <h3>{assignments.length}</h3>
            <p>Total Assignments</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon upcoming-icon">
            <i className="fa fa-clock"></i>
          </div>
          <div className="summary-details">
            <h3>{upcomingAssignments.length}</h3>
            <p>Upcoming (7 days)</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon earnings-icon">
            <i className="fa fa-dollar-sign"></i>
          </div>
          <div className="summary-details">
            <h3>${totalEarnings.toFixed(2)}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-widgets">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.eventName}</td>
                      <td>{assignment.clientName}</td>
                      <td>{formatDate(assignment.eventDate)}</td>
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
                        <Link
                          to={`/assignments/${assignment.id}`}
                          className="action-button"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fa fa-calendar-check"></i>
                <p>No assignments found</p>
              </div>
            )}
          </div>
        </div>

        <div className="widget payments-widget">
          <div className="widget-header">
            <h2>Recent Payments</h2>
            <Link to="/payments" className="view-all-link">
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
        <Link to="/services" className="action-card">
          <div className="action-icon">
            <i className="fa fa-cog"></i>
          </div>
          <div className="action-details">
            <h3>Manage Services</h3>
            <p>Update your service offerings and pricing</p>
          </div>
        </Link>

        <Link to="/availability" className="action-card">
          <div className="action-icon">
            <i className="fa fa-calendar-alt"></i>
          </div>
          <div className="action-details">
            <h3>Set Availability</h3>
            <p>Update your calendar and availability</p>
          </div>
        </Link>

        <Link to="/profile" className="action-card">
          <div className="action-icon">
            <i className="fa fa-id-card"></i>
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
