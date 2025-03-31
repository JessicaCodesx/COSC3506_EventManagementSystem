import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/StaticPages.css';

const PrivacyPage: React.FC = () => {
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page-container terms-container">
        <div className="static-page-header">
          <h1>Privacy Policy</h1>
          <p>Last Updated: March 1, 2025</p>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Introduction</h2>
            <p>At Event Management System ("EMS", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.</p>
            <p>Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our platform.</p>
          </div>

          <div className="terms-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Data</h3>
            <p>We may collect personal identification information from you, including but not limited to:</p>
            <ul>
              <li>Name, email address, and contact details</li>
              <li>Billing information and payment details</li>
              <li>Profile information such as username and password</li>
              <li>Company information for business accounts</li>
              <li>User preferences and settings</li>
            </ul>
            
            <h3>2.2 Usage Data</h3>
            <p>We may also collect information about how you access and use our platform:</p>
            <ul>
              <li>Log data and device information</li>
              <li>IP address and browser type</li>
              <li>Pages you visit and features you use</li>
              <li>Time spent on pages and interaction information</li>
              <li>Referring websites and search terms</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>3. How We Collect Information</h2>
            <p>We collect information through various methods including:</p>
            <ul>
              <li>Direct interactions when you register, create events, or communicate with us</li>
              <li>Automated technologies or interactions, such as cookies and similar tracking technologies</li>
              <li>Third parties or publicly available sources</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>4. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our platform and services</li>
              <li>Process transactions and manage your account</li>
              <li>Personalize user experience and deliver content relevant to your interests</li>
              <li>Send administrative information, updates, and marketing communications</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Protect our rights, your safety, and the safety of others</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Analyze usage patterns and trends to improve our platform</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Disclosure of Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Event organizers and participants as necessary for event management</li>
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Potential buyers in connection with a business transaction such as a merger or acquisition</li>
            </ul>
            
            <p>We do not sell your personal information to third parties.</p>
          </div>

          <div className="terms-section">
            <h2>6. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments and testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure data storage practices</li>
              <li>Employee training on data privacy and security</li>
            </ul>
            
            <p>However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </div>

          <div className="terms-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.</p>
          </div>

          <div className="terms-section">
            <h2>8. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to or restrict processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            
            <p>To exercise these rights, please contact us using the information provided in Section 12.</p>
          </div>

          <div className="terms-section">
            <h2>9. Children's Privacy</h2>
            <p>Our platform is not intended for children under 18 years of age, and we do not knowingly collect personal information from children under 18. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.</p>
          </div>

          <div className="terms-section">
            <h2>10. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that differ from your country. By using our platform, you consent to the transfer of your information to these countries.</p>
            <p>We take steps to ensure that your information receives an adequate level of protection in the countries in which we process it.</p>
          </div>

          <div className="terms-section">
            <h2>11. Changes to Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
          </div>

          <div className="terms-section">
            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p>Email: privacy@ems-example.com</p>
            <p>Mail: EMS Privacy Office, 123 Event Street, Tech City, CA 98765</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="terms-footer">
          <p>By using our platform, you acknowledge that you have read and understand this Privacy Policy and agree to its terms.</p>
          <div className="terms-actions">
            <Link to="/terms" className="btn-secondary">Terms of Service</Link>
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

export default PrivacyPage;