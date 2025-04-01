import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/HomePage.css";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Event Management System</h1>
          <p>
            Seamlessly plan, organize, and manage your events with our
            comprehensive platform.
          </p>
          {!isAuthenticated && (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Our Event Management System?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-calendar"></i>
            </div>
            <h3>Event Planning</h3>
            <p>
              Create and manage events with easy-to-use tools for scheduling,
              venue selection, and capacity management.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-users"></i>
            </div>
            <h3>Vendor Management</h3>
            <p>
              Connect with vendors and assign them to your events with our
              streamlined vendor management system.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-credit-card"></i>
            </div>
            <h3>Payment Processing</h3>
            <p>
              Secure payment processing for invoices and event-related expenses
              with detailed financial tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fa fa-bar-chart"></i>
            </div>
            <h3>Reporting & Analytics</h3>
            <p>
              Generate comprehensive reports on event performance, attendance,
              and financial data.
            </p>
          </div>
        </div>
      </section>

      <section className="user-roles">
        <h2>Tailored For Everyone</h2>
        <div className="role-cards">
          <div className="role-card">
            <h3>Event Organizers</h3>
            <p>
              Create events, manage vendors, track payments, and ensure smooth
              event operations.
            </p>
          </div>

          <div className="role-card">
            <h3>Vendors</h3>
            <p>
              Manage your services, track event assignments, and coordinate with
              clients efficiently.
            </p>
          </div>

          <div className="role-card">
            <h3>Staff</h3>
            <p>
              View your assignments, manage schedules, and communicate with
              event teams.
            </p>
          </div>

          <div className="role-card">
            <h3>Administrators</h3>
            <p>
              Oversee the entire system, generate reports, and ensure proper
              functioning of all components.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Streamline Your Event Management?</h2>
          <p>Join our platform today and experience the difference!</p>
          <Link to="/register" className="btn btn-primary">
            Get Started Now
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Event Management System</h3>
            <p>Simplifying event planning and management.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@ems.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Event Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
