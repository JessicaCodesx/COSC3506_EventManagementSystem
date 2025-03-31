import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../contexts/AuthContext';
import '../styles/DashboardPage.css';

import ClientDashboard from '../components/dashboard/ClientDashboard';
import VendorDashboard from '../components/dashboard/VendorDashboard';
import StaffDashboard from '../components/dashboard/StaffDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  const renderDashboardContent = () => {
    if (loading) {
      return <div className="dashboard-loading">Loading...</div>;
    }

    switch (role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'CLIENT':
        return <ClientDashboard />;
      case 'VENDOR':
        return <VendorDashboard />;
      case 'STAFF':
        return <StaffDashboard />;
      default:
        return <div className="dashboard-error">Invalid user role</div>;
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;