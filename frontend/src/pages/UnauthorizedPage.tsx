// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ErrorPages.css';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="error-page">
      <Navbar />
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <i className="fa fa-exclamation-triangle"></i>
          </div>
          <h1>Access Denied</h1>
          <p>
            You don't have permission to access this page. Please contact your 
            administrator if you believe this is a mistake.
          </p>
          <div className="error-actions">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;