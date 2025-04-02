import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  InvoiceService,
  EventService,
  UserService,
} from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/FormPages.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const EditUserPage: React.FC = () => {
  const { userID } = useParams<{ userID: string }>();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [users, setUsers] = useState<Event[]>([]);
  useState<Event | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "VENDOR",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const data = await UserService.getAllUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData();

    const fetchUser = async () => {
      if (!userID) return;

      setLoading(true);
      try {
        const userData = await UserService.getUserById(parseInt(userID));
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
        });
        // Check if user has permission to edit this event
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [role]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create invoice object
      const userData = {
        id: Number(userID),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
      };

      // Call API to create invoice
      const newUser = await UserService.updateProfile(userData);
      setSuccess("User updated successfully!");

      // Redirect to dashboard after a short delay - can change to go to user management page
      setTimeout(() => {
        navigate(-1);
      }, 500);
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
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
              <h1>Edit User</h1>
              <p>Fill in the details that you want to change</p>
            </div>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="VENDOR">Vendor</option>
                  <option value="CLIENT">Client</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Editing..." : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUserPage;
