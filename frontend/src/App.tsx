import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

// Dashboard pages
import DashboardPage from './pages/DashboardPage';

// Event pages
import EventsListPage from './pages/EventsListPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EditEventPage from './pages/EditEventPage';
import EventAssignmentPage from './pages/EventAssignmentPage';

// Invoice pages
import InvoicesListPage from './pages/InvoicesListPage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import PaymentPage from './pages/PaymentPage';

// Profile page
import ProfilePage from './pages/ProfilePage';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            
            {/* Dashboard route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Event routes */}
            <Route 
              path="/events" 
              element={
                <ProtectedRoute>
                  <EventsListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/create" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CLIENT']}>
                  <CreateEventPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/:eventId" 
              element={
                <ProtectedRoute>
                  <EventDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/:eventId/assign" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CLIENT']}>
                  <EventAssignmentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/:eventId/edit" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CLIENT']}>
                  <EditEventPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Invoice routes */}
            <Route 
              path="/invoices" 
              element={
                <ProtectedRoute>
                  <InvoicesListPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices/create" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'CLIENT']}>
                  <CreateInvoicePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices/:invoiceId" 
              element={
                <ProtectedRoute>
                  <InvoiceDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices/:invoiceId/pay" 
              element={
                <ProtectedRoute allowedRoles={['CLIENT']}>
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Profile route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route - 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;