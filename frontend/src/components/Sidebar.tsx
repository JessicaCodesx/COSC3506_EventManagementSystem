import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Sidebar.css';

interface SidebarProps {
  userRole: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const getNavItems = () => {
    const commonItems = [
      { path: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
      { path: '/profile', icon: 'fa-user', label: 'My Profile' },
    ];

    switch (userRole) {
      case 'ADMIN':
        return [
          ...commonItems,
          { path: '/users', icon: 'fa-users', label: 'User Management' },
          { path: '/events', icon: 'fa-calendar', label: 'Events' },
          { path: '/invoices', icon: 'fa-file-invoice-dollar', label: 'Invoices' },
          { path: '/reports', icon: 'fa-chart-bar', label: 'Reports' },
        ];
      case 'CLIENT':
        return [
          ...commonItems,
          { path: '/events', icon: 'fa-calendar', label: 'My Events' },
          { path: '/invoices', icon: 'fa-file-invoice-dollar', label: 'Invoices' },
        ];
      case 'VENDOR':
        return [
          ...commonItems,
          { path: '/assignments', icon: 'fa-calendar-check', label: 'My Assignments' },
        ];
      case 'STAFF':
        return [
          ...commonItems,
          { path: '/schedule', icon: 'fa-calendar-alt', label: 'My Schedule' },
          { path: '/events/assigned', icon: 'fa-calendar-check', label: 'My Events' },
        ];
      default:
        return commonItems;
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <span className="logo-text">EMS</span>
        </Link>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className={`fa ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-nav">
          {getNavItems().map((item, index) => (
            <li key={index} className="sidebar-item">
              <Link to={item.path} className="sidebar-link">
                <i className={`fa ${item.icon}`}></i>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <i className="fa fa-sign-out-alt"></i>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;