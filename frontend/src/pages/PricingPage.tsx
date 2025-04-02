import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/StaticPages.css";

const PricingPage: React.FC = () => {
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-header">
          <h1>Flexible Pricing Plans</h1>
          <p>Choose the plan that fits your event management needs</p>
        </div>

        <div className="pricing-toggle">
          <span className={`toggle-option active`}>Monthly Billing</span>
          {/*<span className={`toggle-option`}>Annual Billing (20% off)</span>*/}
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h2>Starter</h2>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">/month</span>
              </div>
              <p>Perfect for small businesses and occasional event planners</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Up to 5 events per month</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Basic event templates</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Email notifications</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Basic reporting</span>
                </li>
                <li className="disabled">
                  <i className="fa fa-times"></i>
                  <span>Vendor management</span>
                </li>
                <li className="disabled">
                  <i className="fa fa-times"></i>
                  <span>Advanced analytics</span>
                </li>
                <li className="disabled">
                  <i className="fa fa-times"></i>
                  <span>Custom branding</span>
                </li>
              </ul>
            </div>
            <div className="pricing-action">
              <Link to="/register" className="btn-outline">
                Get Started
              </Link>
            </div>
          </div>

          <div className="pricing-card popular">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <h2>Professional</h2>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="amount">79</span>
                <span className="period">/month</span>
              </div>
              <p>Ideal for growing businesses and regular event management</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Up to 20 events per month</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Advanced event templates</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Email and SMS notifications</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Comprehensive reporting</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Vendor management</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Basic analytics</span>
                </li>
                <li className="disabled">
                  <i className="fa fa-times"></i>
                  <span>Custom branding</span>
                </li>
              </ul>
            </div>
            <div className="pricing-action">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>

          <div className="pricing-card">
            <div className="pricing-header">
              <h2>Enterprise</h2>
              <div className="pricing-amount">
                <span className="currency">$</span>
                <span className="amount">199</span>
                <span className="period">/month</span>
              </div>
              <p>
                Complete solution for large organizations and event agencies
              </p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Unlimited events</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Custom event templates</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Priority support</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Advanced reporting & exports</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Full vendor management suite</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Advanced analytics & insights</span>
                </li>
                <li>
                  <i className="fa fa-check"></i>
                  <span>Custom branding & white-label</span>
                </li>
              </ul>
            </div>
            <div className="pricing-action">
              <Link to="/register" className="btn-outline">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I upgrade or downgrade my plan at any time?</h3>
              <p>
                Yes, you can change your subscription plan at any time. Changes
                will be applied at the start of your next billing cycle.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial available?</h3>
              <p>
                Yes, we offer a 14-day free trial on all plans so you can
                experience the full features before committing.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer discounts for non-profits?</h3>
              <p>
                Yes, we offer special pricing for non-profit organizations.
                Please contact our sales team for details.
              </p>
            </div>
          </div>
        </div>

        <div className="pricing-cta">
          <h2>Need something more tailored?</h2>
          <p>
            Contact our sales team for a custom solution that meets your
            specific requirements.
          </p>
          <Link to="/contact" className="btn-secondary">
            Contact Sales
          </Link>
        </div>
      </div>

      <footer className="static-page-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Event Management System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
