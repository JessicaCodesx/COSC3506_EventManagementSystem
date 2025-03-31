import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InvoiceService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/DetailPages.css';

interface Invoice {
  id: number;
  totalAmount: number;
  status: string;
  dueDate: string;
  notes?: string;
  event: {
    id: number;
    eventName: string;
  };
  client: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Payment {
  id: number;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: string;
}

// Mock payments data for simulation
const mockPayments: Payment[] = [
  { 
    id: 1001, 
    amountPaid: 2500.00, 
    paymentDate: '2025-04-05', 
    paymentMethod: 'Credit Card' 
  },
  { 
    id: 1002, 
    amountPaid: 1750.00, 
    paymentDate: '2025-03-20', 
    paymentMethod: 'Bank Transfer' 
  }
];

const InvoiceDetailsPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { user, role } = useAuth();
  
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (!invoiceId) return;
      
      setLoading(true);
      try {
        const invoiceData = await InvoiceService.getInvoiceById(parseInt(invoiceId));
        setInvoice(invoiceData);
        
        // Simulate payment data based on invoice status
        if (invoiceData.status === 'PAID') {
          setPayments([{
            id: 1000 + parseInt(invoiceId),
            amountPaid: invoiceData.totalAmount,
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod: 'Credit Card'
          }]);
        } else if (invoiceData.status === 'PENDING' && Math.random() > 0.7) {
          // Sometimes show partial payment for pending invoices
          setPayments([{
            id: 1000 + parseInt(invoiceId),
            amountPaid: invoiceData.totalAmount * 0.5,
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod: 'Bank Transfer'
          }]);
        } else {
          setPayments([]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch invoice details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoiceData();
  }, [invoiceId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'status-completed';
      case 'PENDING':
        return 'status-scheduled';
      case 'OVERDUE':
        return 'status-canceled';
      default:
        return '';
    }
  };

  const calculateAmountPaid = () => {
    return payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
  };

  const calculateBalance = () => {
    if (!invoice) return 0;
    return invoice.totalAmount - calculateAmountPaid();
  };
  
  const canEdit = () => {
    if (role === 'ADMIN') return true;
    if (role === 'CLIENT' && invoice?.client.id === user?.id && invoice?.status === 'PENDING') return true;
    return false;
  };
  
  const canPay = () => {
    return role === 'CLIENT' && invoice?.client.id === user?.id && invoice?.status === 'PENDING';
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="detail-page-container">
            {loading ? (
              <div className="loading-spinner">Loading invoice details...</div>
            ) : error ? (
              <div className="detail-error">
                <p>{error}</p>
                <Link to="/invoices" className="btn-primary">
                  Back to Invoices
                </Link>
              </div>
            ) : invoice ? (
              <>
                <div className="detail-header">
                  <div className="detail-title">
                    <h1>Invoice #{invoice.id.toString().padStart(4, '0')}</h1>
                    <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="detail-actions">
                    {canEdit() && (
                      <Link to={`/invoices/${invoiceId}/edit`} className="btn btn-secondary">
                        <i className="fa fa-edit"></i> Edit
                      </Link>
                    )}
                    {canPay() && (
                      <Link to={`/invoices/${invoiceId}/pay`} className="btn btn-primary">
                        <i className="fa fa-credit-card"></i> Pay Now
                      </Link>
                    )}
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-section">
                    <h2>Invoice Details</h2>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Invoice Number</span>
                        <span className="detail-value">INV-{invoice.id.toString().padStart(4, '0')}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Event</span>
                        <span className="detail-value">
                          <Link to={`/events/${invoice.event.id}`}>
                            {invoice.event.eventName}
                          </Link>
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Due Date</span>
                        <span className="detail-value">{formatDate(invoice.dueDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                      {role === 'ADMIN' && (
                        <div className="detail-item">
                          <span className="detail-label">Client</span>
                          <span className="detail-value">
                            {invoice.client.firstName} {invoice.client.lastName} ({invoice.client.email})
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {invoice.notes && (
                      <div className="detail-description">
                        <h3>Notes</h3>
                        <p>{invoice.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <h2>Payment Summary</h2>
                    <div className="invoice-summary">
                      <div className="summary-row">
                        <span>Total Amount:</span>
                        <span className="summary-amount">{formatCurrency(invoice.totalAmount)}</span>
                      </div>
                      <div className="summary-row">
                        <span>Amount Paid:</span>
                        <span className="summary-amount">{formatCurrency(calculateAmountPaid())}</span>
                      </div>
                      <div className="summary-row summary-balance">
                        <span>Balance Due:</span>
                        <span className="summary-amount balance">{formatCurrency(calculateBalance())}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h2>Payment History</h2>
                    
                    {payments.length > 0 ? (
                      <div className="detail-table-container">
                        <table className="detail-table">
                          <thead>
                            <tr>
                              <th>Payment ID</th>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Method</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map(payment => (
                              <tr key={payment.id}>
                                <td>PAY-{payment.id.toString().padStart(4, '0')}</td>
                                <td>{formatDate(payment.paymentDate)}</td>
                                <td>{formatCurrency(payment.amountPaid)}</td>
                                <td>{payment.paymentMethod}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="detail-empty-state">
                        <p>No payments have been made yet.</p>
                        {canPay() && (
                          <Link to={`/invoices/${invoiceId}/pay`} className="btn-primary">
                            <i className="fa fa-credit-card"></i> Make Payment
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-footer">
                  <Link to="/invoices" className="btn btn-secondary">
                    <i className="fa fa-arrow-left"></i> Back to Invoices
                  </Link>
                </div>
              </>
            ) : (
              <div className="detail-error">
                <p>Invoice not found.</p>
                <Link to="/invoices" className="btn-primary">
                  Back to Invoices
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;