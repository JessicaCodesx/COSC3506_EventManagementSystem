import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useAuth } from "../contexts/AuthContext";
import {
  EventService,
  UserService,
  InvoiceService,
} from "../services/apiService";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PendingIcon from "@mui/icons-material/Pending";

interface Event {
  id: number;
  eventName: string;
  location: string;
  eventDate: string;
  status: string;
  client?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface Invoice {
  id: number;
  status: string;
  totalAmount: number;
}

const ReportPage = () => {
  const { user, role } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let eventData;
        eventData = await EventService.getAllEvents();
        setEvents(eventData);
      } catch (err: any) {}
    };

    fetchEvents();

    const fetchUsers = async () => {
      try {
        let userData;
        userData = await UserService.getAllUsers();
        setUsers(userData);
      } catch (err: any) {}
    };

    fetchUsers();

    const fetchInvoice = async () => {
      try {
        let invoiceData;
        invoiceData = await InvoiceService.getAllInvoices();
        setInvoices(invoiceData);
      } catch (err: any) {}
    };

    fetchInvoice();
  }, [role, user?.id]);

  return (
    <>
      <div className="dashboard-page">
        <Sidebar userRole={role} />
        <div className="dashboard-content">
          <DashboardHeader userRole={role} />
          <main className="dashboard-main">
            <div className="px-5">
              <div className="form-page-header">
                <h1>Report Analytics</h1>
                <div className="row">
                  <div className="col-6">
                    <h3> Lifetime Report Statistics </h3>
                    <div className="summary-card">
                      <div className="summary-icon">
                        <GroupIcon />
                      </div>
                      <div className="summary-details">
                        <h3> {users.length} </h3>
                        <p>Total Registered Users</p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <GroupIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          {users.filter((x) => x.role === "CLIENT").length}
                        </h3>
                        <p>Total Registered Clients</p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <GroupIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          {users.filter((x) => x.role === "VENDOR").length}
                        </h3>
                        <p>Total Registered Vendors</p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <CalendarTodayIcon />
                      </div>
                      <div className="summary-details">
                        <h3> {events.length} </h3>
                        <p>Total Events Hosted on EMS</p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <AttachMoneyIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          $
                          {(
                            Math.round(
                              (invoices
                                .filter((x) => x.status === "PAID")
                                .reduce(
                                  (n, { totalAmount }) => n + totalAmount,
                                  0
                                ) /
                                invoices.filter((x) => x.status === "PAID")
                                  .length) *
                                100
                            ) / 100
                          ).toFixed(2)}
                        </h3>
                        <p> Average Revenue Per Event </p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <AttachMoneyIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          $
                          {(
                            Math.round(
                              invoices.reduce(
                                (n, { totalAmount }) => n + totalAmount,
                                0
                              ) * 100
                            ) / 100
                          ).toFixed(2)}{" "}
                        </h3>
                        <p>Total Lifetime Revenue Generated by EMS</p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <InsertEmoticonIcon />
                      </div>
                      <div className="summary-details">
                        <h3> 4/5 </h3>
                        <p>Total Lifetime Average Client Satisfaction</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <h3> Live Report Statistics </h3>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <PendingActionsIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          {" "}
                          {
                            events.filter((x) => x.status === "SCHEDULED")
                              .length
                          }{" "}
                        </h3>
                        <p>Number of Upcoming Events </p>
                      </div>
                    </div>

                    <div className="summary-card mt-2">
                      <div className="summary-icon">
                        <PendingIcon />
                      </div>
                      <div className="summary-details">
                        <h3>
                          {
                            invoices.filter((x) => x.status === "PENDING")
                              .length
                          }
                        </h3>
                        <p>Number of Pending Invoices </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
