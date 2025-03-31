// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ErrorPages.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="error-page">
      <Navbar />
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <i className="fa fa-question-circle"></i>
          </div>
          <h1>404 - Page Not Found</h1>
          <p>
            The page you are looking for might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/dashboard" className="btn btn-outline">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;