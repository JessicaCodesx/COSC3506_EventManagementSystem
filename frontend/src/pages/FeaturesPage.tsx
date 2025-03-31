import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/StaticPages.css';

const FeaturesPage: React.FC = () => {
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-header">
          <h1>Event Management System Features</h1>
          <p>Discover all the tools and capabilities our platform offers</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-calendar-check"></i>
            </div>
            <h2>Event Planning & Scheduling</h2>
            <p>Create and manage events of any size with our intuitive scheduling tools. Set dates, times, and locations with ease.</p>
            <ul>
              <li>Drag-and-drop calendar interface</li>
              <li>Automatic conflict detection</li>
              <li>Customizable event templates</li>
              <li>Multi-view calendar (day, week, month)</li>
            </ul>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-users"></i>
            </div>
            <h2>Vendor Management</h2>
            <p>Connect with vendors and assign them to your events seamlessly. Track vendor responsibilities and communications in one place.</p>
            <ul>
              <li>Vendor database with search capabilities</li>
              <li>Vendor assignment system</li>
              <li>Service tracking and management</li>
              <li>Vendor performance ratings</li>
            </ul>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-tasks"></i>
            </div>
            <h2>Task Management</h2>
            <p>Keep track of all your event preparation tasks. Assign responsibilities, set deadlines, and monitor progress.</p>
            <ul>
              <li>Task assignment system</li>
              <li>Progress tracking</li>
              <li>Deadline reminders</li>
              <li>Task dependencies and milestones</li>
            </ul>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-file-invoice-dollar"></i>
            </div>
            <h2>Invoicing & Payments</h2>
            <p>Generate professional invoices and track payments. Simplify your financial management with our integrated tools.</p>
            <ul>
              <li>Automated invoice generation</li>
              <li>Payment tracking</li>
              <li>Multiple payment methods</li>
              <li>Financial reporting</li>
            </ul>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-chart-bar"></i>
            </div>
            <h2>Reporting & Analytics</h2>
            <p>Gain insights into your events performance with detailed reports and analytics. Make data-driven decisions to improve future events.</p>
            <ul>
              <li>Custom report generation</li>
              <li>Visual data dashboards</li>
              <li>Performance metrics tracking</li>
              <li>Exportable reports (PDF, CSV)</li>
            </ul>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <i className="fa fa-mobile-alt"></i>
            </div>
            <h2>Mobile Access</h2>
            <p>Manage your events on the go with our mobile-responsive design. Access all features from any device, anywhere.</p>
            <ul>
              <li>Responsive design for all devices</li>
              <li>Real-time updates and notifications</li>
              <li>Offline capabilities for essential functions</li>
              <li>Mobile-optimized interfaces</li>
            </ul>
          </div>
        </div>

        <div className="feature-cta">
          <h2>Ready to streamline your event management?</h2>
          <p>Get started today and experience the difference our platform can make.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary">Sign Up Now</Link>
            <Link to="/pricing" className="btn-secondary">View Pricing</Link>
          </div>
        </div>
      </div>

      <footer className="static-page-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Event Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;