import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/StaticPages.css';

const TermsPage: React.FC = () => {
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page-container terms-container">
        <div className="static-page-header">
          <h1>Terms of Service</h1>
          <p>Last Updated: March 1, 2025</p>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Introduction</h2>
            <p>Welcome to the Event Management System ("EMS"). These Terms of Service ("Terms") govern your access to and use of the EMS platform, including any associated mobile applications, websites, software, and services (collectively, the "Service").</p>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.</p>
          </div>

          <div className="terms-section">
            <h2>2. Definitions</h2>
            <p>Throughout these Terms, we may use the following terms:</p>
            <ul>
              <li><strong>"User"</strong> refers to any individual who accesses or uses the Service.</li>
              <li><strong>"Client"</strong> refers to Users who create and manage events on the platform.</li>
              <li><strong>"Vendor"</strong> refers to Users who provide services for events.</li>
              <li><strong>"Staff"</strong> refers to Users who assist in event management.</li>
              <li><strong>"Content"</strong> refers to text, images, photos, audio, video, and all other forms of data or communication.</li>
              <li><strong>"User Content"</strong> refers to Content that Users submit, upload, or transmit to the Service.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. Account Creation and Responsibilities</h2>
            <p>3.1 To use certain features of the Service, you must register for an account.</p>
            <p>3.2 You agree to provide accurate, current, and complete information during the registration process.</p>
            <p>3.3 You are responsible for safeguarding your account credentials and for all activities that occur under your account.</p>
            <p>3.4 You must notify us immediately of any breach of security or unauthorized use of your account.</p>
            <p>3.5 You agree not to create more than one account per person, unless expressly permitted by us.</p>
          </div>

          <div className="terms-section">
            <h2>4. User Content</h2>
            <p>4.1 You retain all rights in, and are solely responsible for, the User Content you post to the Service.</p>
            <p>4.2 By posting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display your User Content in connection with the Service.</p>
            <p>4.3 You represent and warrant that your User Content:</p>
            <ul>
              <li>Will not violate any third-party rights, including copyright, trademark, privacy, or publicity rights.</li>
              <li>Will not contain libelous or otherwise unlawful, abusive, or obscene material.</li>
              <li>Will not violate any laws or regulations.</li>
              <li>Will not contain any viruses, malware, or other harmful code.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Prohibited Conduct</h2>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul>
              <li>Using the Service for any illegal purpose or in violation of any laws or regulations.</li>
              <li>Violating or infringing other people's intellectual property, privacy, or other rights.</li>
              <li>Interfering with or disrupting the Service or servers connected to the Service.</li>
              <li>Attempting to gain unauthorized access to any part of the Service.</li>
              <li>Using automated means to access or collect data from the Service without our prior written consent.</li>
              <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with a person or entity.</li>
              <li>Using the Service to transmit unsolicited communications, promotions, or advertisements.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Fees and Payment</h2>
            <p>6.1 Some aspects of the Service may be offered for a fee. You agree to pay all fees in accordance with the pricing and payment terms presented to you.</p>
            <p>6.2 Payments are non-refundable except as required by law or as explicitly stated in our refund policy.</p>
            <p>6.3 We may change our fees at any time, but will provide reasonable notice of any such changes.</p>
          </div>

          <div className="terms-section">
            <h2>7. Termination</h2>
            <p>7.1 We reserve the right to suspend or terminate your access to the Service at any time, with or without notice, for any reason.</p>
            <p>7.2 You may terminate your account at any time by following the instructions on the Service.</p>
            <p>7.3 Upon termination, your right to use the Service will immediately cease, and we may delete or disable your account and all associated information and files.</p>
          </div>

          <div className="terms-section">
            <h2>8. Disclaimers</h2>
            <p>8.1 THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND.</p>
            <p>8.2 WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p>8.3 We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.</p>
          </div>

          <div className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>9.1 TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.</p>
            <p>9.2 Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed the greater of $100 or the amount you have paid us in the past 12 months.</p>
          </div>

          <div className="terms-section">
            <h2>10. Changes to Terms</h2>
            <p>10.1 We may modify these Terms at any time. If we do so, we will provide notice either by updating the "Last Updated" date at the top of these Terms or by a more specific method.</p>
            <p>10.2 Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
          </div>

          <div className="terms-section">
            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions.</p>
          </div>

          <div className="terms-section">
            <h2>12. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>Email: legal@ems-example.com</p>
            <p>Mail: EMS Legal Department, 123 Event Street, Tech City, CA 98765</p>
          </div>
        </div>

        <div className="terms-footer">
          <p>By using our Service, you acknowledge that you have read and understand these Terms and agree to be bound by them.</p>
          <div className="terms-actions">
            <Link to="/privacy" className="btn-secondary">Privacy Policy</Link>
            <Link to="/" className="btn-primary">Return to Home</Link>
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

export default TermsPage;