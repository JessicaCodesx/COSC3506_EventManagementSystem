import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  InvoiceService,
  EventService,
  UserService,
} from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/FormPages.css";

interface Event {
  id: number;
  eventName: string;
  client: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const CreateInvoicePage: React.FC = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [selectedEventDetails, setSelectedEventDetails] =
    useState<Event | null>(null);

  const [formData, setFormData] = useState({
    eventId: "",
    clientId: "",
    totalAmount: "",
    dueDate: "",
    status: "PENDING",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsData = await EventService.getAllEvents();
        setEvents(eventsData);

        // If admin, fetch clients
        if (role === "ADMIN") {
          const usersData = await UserService.getAllUsers();
          // Filter clients only
          setClients(usersData.filter((user: User) => user.role === "CLIENT"));
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, [role]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // If event is selected, update selectedEventDetails and clientId
    if (name === "eventId" && value) {
      const selectedEvent = events.find(
        (event) => event.id.toString() === value
      );
      if (selectedEvent) {
        setSelectedEventDetails(selectedEvent);
        // Update clientId based on the selected event
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          clientId: selectedEvent.client.id.toString(),
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create invoice object
      const invoiceData = {
        event: { id: parseInt(formData.eventId) },
        client: { id: parseInt(formData.clientId) },
        totalAmount: parseFloat(formData.totalAmount),
        dueDate: formData.dueDate,
        status: formData.status,
        notes: formData.notes,
      };

      // Call API to create invoice
      const newInvoice = await InvoiceService.createInvoice(invoiceData);
      setSuccess("Invoice created successfully!");

      // Redirect to invoice details after a short delay
      setTimeout(() => {
        navigate(`/invoices/${newInvoice.id}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  // Set min due date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDueDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="dashboard-page">
      <Sidebar userRole={role} />
      <div className="dashboard-content">
        <DashboardHeader userRole={role} />
        <main className="dashboard-main">
          <div className="form-page-container">
            <div className="form-page-header">
              <h1>Create New Invoice</h1>
              <p>Fill in the details to create a new invoice</p>
            </div>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{success}</div>}

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="eventId">Event *</label>
                <select
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select an event --</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.eventName}
                    </option>
                  ))}
                </select>
              </div>

              {role === "ADMIN" && (
                <div className="form-group">
                  <label htmlFor="clientId">Client *</label>
                  <select
                    id="clientId"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    required
                    disabled={!!selectedEventDetails} // Disable if event is selected
                  >
                    <option value="">-- Select a client --</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName} ({client.email})
                      </option>
                    ))}
                  </select>
                  {selectedEventDetails && (
                    <small className="form-hint">
                      Client automatically selected from event:{" "}
                      {selectedEventDetails.client.firstName}{" "}
                      {selectedEventDetails.client.lastName}
                    </small>
                  )}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="totalAmount">Total Amount *</label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date *</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={minDueDate}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional details or line items"
                  rows={4}
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
