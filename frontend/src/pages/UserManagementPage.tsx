import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/FormPages.css";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UserManagementPage: React.FC = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

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
  }, [role]);

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="form-page-container">
            <div className="form-page-header">
              <h1>Manage Users</h1>
              <p className="fst-italic">{users.length} users in system</p>
            </div>

            <button
              className="btn btn-outline-secondary ms-2 text-nowrap px-2"
              onClick={(x) => navigate("/users/create/")}
            >
              <AddIcon className="me-2" /> Add User
            </button>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`role-badge ${getRoleBadgeClass(user.role)}`}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagementPage;
