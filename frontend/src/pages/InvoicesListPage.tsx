import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InvoiceService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/ListPages.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CreditCardIcon from "@mui/icons-material/CreditCard";

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

const InvoicesListPage: React.FC = () => {
  const { user, role } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        let invoiceData;

        // Different API calls based on user role
        if (role === "ADMIN") {
          invoiceData = await InvoiceService.getAllInvoices();
        } else if (role === "CLIENT" && user?.id) {
          invoiceData = await InvoiceService.getInvoicesByClient(user.id);
        } else {
          // For vendors and staff, they would see invoices related to their assignments
          // This would be implemented with a different API call
          invoiceData = [];
        }

        setInvoices(invoiceData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [role, user?.id]);

  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.event.eventName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${invoice.client.firstName} ${invoice.client.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      invoice.id.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PAID":
        return "status-completed";
      case "PENDING":
        return "status-scheduled";
      case "OVERDUE":
        return "status-canceled";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="list-page-container">
            <div className="list-page-header">
              <div className="list-title">
                <h1>Invoices</h1>
                <p>Manage your invoices</p>
              </div>
              {(role === "ADMIN" || role === "CLIENT") && (
                <Link to="/invoices/create" className="btn-primary">
                  <i className="fa fa-plus"></i> Create Invoice
                </Link>
              )}
            </div>

            <div className="list-filter-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa fa-search"></i>
              </div>

              <div className="filter-options">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </div>
            </div>

            {error && <div className="list-error">{error}</div>}

            {loading ? (
              <div className="loading-spinner">Loading invoices...</div>
            ) : filteredInvoices.length > 0 ? (
              <div className="list-table-container">
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Event</th>
                      {role === "ADMIN" && <th>Client</th>}
                      <th>Due Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>INV-{invoice.id.toString().padStart(4, "0")}</td>
                        <td>
                          <Link to={`/events/${invoice.event.id}`}>
                            {invoice.event.eventName}
                          </Link>
                        </td>
                        {role === "ADMIN" && (
                          <td>
                            {invoice.client.firstName} {invoice.client.lastName}
                          </td>
                        )}
                        <td>{formatDate(invoice.dueDate)}</td>
                        <td>{formatCurrency(invoice.totalAmount)}</td>
                        <td>
                          <span
                            className={`status-badge ${getStatusClass(
                              invoice.status
                            )}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <Link
                            to={`/invoices/${invoice.id}`}
                            className="action-button"
                            title="View Details"
                          >
                            <VisibilityIcon />
                          </Link>
                          {(role === "ADMIN" ||
                            (role === "CLIENT" &&
                              invoice.status === "PENDING")) && (
                            <Link
                              to={`/invoices/${invoice.id}/edit`}
                              className="action-button"
                              title="Edit"
                            >
                              <EditIcon />
                            </Link>
                          )}
                          {role === "CLIENT" &&
                            invoice.status === "PENDING" && (
                              <Link
                                to={`/invoices/${invoice.id}/pay`}
                                className="action-button"
                                title="Pay Now"
                              >
                                <CreditCardIcon />
                              </Link>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-file-invoice-dollar"></i>
                <h3>No invoices found</h3>
                <p>
                  {searchTerm || statusFilter !== "ALL"
                    ? "Try adjusting your search or filters"
                    : role === "CLIENT"
                    ? "You don't have any invoices yet"
                    : "No invoices have been created yet"}
                </p>
                {(role === "ADMIN" || role === "CLIENT") &&
                  !searchTerm &&
                  statusFilter === "ALL" && (
                    <Link to="/invoices/create" className="btn-primary">
                      Create Invoice
                    </Link>
                  )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvoicesListPage;
