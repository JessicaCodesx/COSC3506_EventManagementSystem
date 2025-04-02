import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { InvoiceService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/FormPages.css";

interface Invoice {
  id: number;
  totalAmount: number;
  status: string;
  dueDate: string;
  event: {
    id: number;
    eventName: string;
  };
  client: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

const PaymentPage: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { role, user } = useAuth();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    amountPaid: "",
    paymentMethod: "CREDIT_CARD",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!invoiceId) return;

      setLoading(true);
      try {
        const invoiceData = await InvoiceService.getInvoiceById(
          parseInt(invoiceId)
        );
        setInvoice(invoiceData);

        // Pre-fill the amount
        setFormData((prev) => ({
          ...prev,
          amountPaid: invoiceData.totalAmount.toString(),
        }));

        // Check if user has permission
        if (role !== "ADMIN" && user?.id !== invoiceData.client.id) {
          setError("You do not have permission to pay this invoice");
        }

        // Check if invoice is already paid
        if (invoiceData.status === "PAID") {
          setError("This invoice has already been paid");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch invoice details");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId, role, user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!invoice) return;

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate updating the invoice status
      const updatedInvoice = {
        ...invoice,
        status: "PAID",
      };

      // Update invoice status
      await InvoiceService.updateInvoice(invoice.id, updatedInvoice);

      setSuccess("Payment processed successfully!");

      // Redirect to invoice list after a short delay
      setTimeout(() => {
        navigate("/invoices");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Payment processing failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="form-page-container">
            <div className="form-page-header">
              <h1>Make Payment</h1>
              {invoice && (
                <p>
                  Invoice #{invoice.id} for {invoice.event.eventName}
                </p>
              )}
            </div>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            {loading ? (
              <div className="loading-spinner">Loading invoice details...</div>
            ) : invoice ? (
              <div className="payment-container">
                <div className="invoice-summary">
                  <h2>Invoice Summary</h2>
                  <div className="invoice-details">
                    <div className="invoice-detail-item">
                      <span className="detail-label">Invoice #:</span>
                      <span className="detail-value">
                        INV-{invoice.id.toString().padStart(4, "0")}
                      </span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Event:</span>
                      <span className="detail-value">
                        {invoice.event.eventName}
                      </span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Amount Due:</span>
                      <span className="detail-value amount">
                        {formatCurrency(invoice.totalAmount)}
                      </span>
                    </div>
                    <div className="invoice-detail-item">
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="form-container payment-form"
                >
                  <h2>Payment Information</h2>

                  <div className="form-group">
                    <label htmlFor="amountPaid">Payment Amount *</label>
                    <input
                      type="number"
                      id="amountPaid"
                      name="amountPaid"
                      value={formData.amountPaid}
                      onChange={handleChange}
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method *</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="PAYPAL">PayPal</option>
                    </select>
                  </div>

                  {/* Credit Card Details - shown only when Credit Card is selected */}
                  {formData.paymentMethod === "CREDIT_CARD" && (
                    <div className="credit-card-details">
                      <div className="form-group">
                        <label htmlFor="cardholderName">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          id="cardholderName"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleChange}
                          placeholder="Name on card"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number *</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date *</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv">CVV *</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-info">
                    <p>
                      <strong>Note:</strong> This is a demonstration payment
                      form. No real payments will be processed, and your credit
                      card details will not be stored or transmitted.
                    </p>
                  </div>

                  <div className="form-actions">
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="btn-secondary"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={
                        processing ||
                        error === "This invoice has already been paid"
                      }
                    >
                      {processing
                        ? "Processing..."
                        : `Pay ${formatCurrency(
                            parseFloat(formData.amountPaid || "0")
                          )}`}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="empty-state">
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

export default PaymentPage;
