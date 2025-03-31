import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/StaticPages.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setFormSubmitted(true);
        setFormError(false);
      } else {
        setFormError(true);
      }
    }, 1000);
  };

  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page-container">
        <div className="static-page-header">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any questions or support needs</p>
        </div>

        <div className="contact-container">
          <div className="contact-info-panel">
            <div className="contact-info-card">
              <h2>We're Here to Help</h2>
              <p>Our team is available to answer your questions and help you get the most out of our platform.</p>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3>Email Us</h3>
                  <p>support@ems-example.com</p>
                  <p>sales@ems-example.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Monday - Friday, 9AM - 5PM EST</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">
                  <i className="fa fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h3>Visit Us</h3>
                  <p>123 Event Street, Suite 456</p>
                  <p>Tech City, CA 98765</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            {formSubmitted ? (
              <div className="contact-success">
                <div className="success-icon">
                  <i className="fa fa-check-circle"></i>
                </div>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      subject: '',
                      message: ''
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>
                
                {formError && (
                  <div className="form-error">
                    <p>There was an error sending your message. Please try again.</p>
                  </div>
                )}
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company (Optional)</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary btn-full">Send Message</button>
              </form>
            )}
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly can I expect a response?</h3>
              <p>We aim to respond to all inquiries within 24 business hours.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer emergency support?</h3>
              <p>Yes, our Enterprise plan includes 24/7 emergency support for critical issues.</p>
            </div>
            <div className="faq-item">
              <h3>Can I schedule a demo?</h3>
              <p>Absolutely! Contact our sales team or use the form above to request a personalized demo.</p>
            </div>
            <div className="faq-item">
              <h3>Where can I find documentation?</h3>
              <p>Our comprehensive documentation and tutorials are available in our Knowledge Base.</p>
            </div>
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

export default ContactPage;