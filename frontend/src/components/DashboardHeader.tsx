import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/DashboardHeader.css';

interface DashboardHeaderProps {
  userRole: string | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeColor = () => {
    switch (userRole) {
      case 'ADMIN':
        return 'badge-admin';
      case 'CLIENT':
        return 'badge-client';
      case 'VENDOR':
        return 'badge-vendor';
      case 'STAFF':
        return 'badge-staff';
      default:
        return 'badge-default';
    }
  };

  return (
    <header className="dashboard-header">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="header-actions">
        <div className="user-dropdown">
          <button 
            className="user-button" 
            onClick={toggleUserMenu}
            aria-label="User menu"
          >
            <div className="user-avatar">
              <span>
                {user ? 
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 
                  'U'
                }
              </span>
            </div>
            <span className={`role-badge ${getRoleBadgeColor()}`}>
              {userRole}
            </span>
          </button>
          
          {userMenuOpen && (
            <div className="user-menu">
              <div className="user-menu-header">
                <div className="user-info">
                  <h4>{user ? `${user.firstName} ${user.lastName}` : 'User'}</h4>
                  <p>{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <ul className="user-menu-items">
                <li>
                  <Link to="/profile">
                    <i className="fa fa-user"></i> My Profile
                  </Link>
                </li>
                <li className="menu-divider"></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    <i className="fa fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;