import axios from 'axios';
import { MOCK_INVOICES, MockUserService, MockEventService } from './mockApiService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      throw error;
    }
  }
};

export const UserService = {
  getCurrentUser: async () => {
    // for testing - return dummy data
    return {
      "id": 25,
      "firstName": "Test",
      "lastName": "Client",
      "email": "admin@example.com",
      "password": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0MzQ3NTQzNCwiZXhwIjoxNzQzNTYxODM0fQ.RGPa1narn9fovVaedkF5oYNHRHYQVQgJXr6PHlJKm5U",
      "role": "ADMIN"
  };
    const response = await api.get('/users/current');
    return response.data;
  },

  createUser: async (userData: any) => {
    // note - update when endpoint works
    return MockUserService.createUser(userData);

    const response = await api.post('/users', userData);
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    return MockUserService.updateProfile(userData);
    
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  getAllUsers: async () => {
    return MockUserService.getAllUsers();

    const response = await api.get('/users');
    return response.data;
  },
  
  getUserById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
};

export const EventService = {
  createEvent: async (eventData: any) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  getAllEvents: async () => {
    return MockEventService.getAllEvents();
    // const response = await api.get('/events');
    // return response.data;
  },
  
  getEventById: async (id: number) => {
    return MockEventService.getEventById(id);

    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  getEventsByClientId: async (clientId: number) => {
    const response = await api.get(`/events/client/${clientId}`);
    return response.data;
  },
  
  updateEvent: async (id: number, eventData: any) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: number) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};

export const AssignmentService = {
  createAssignment: async (assignmentData: any) => {
    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },
  
  getAssignmentsByEvent: async (eventId: number) => {
    const response = await api.get(`/assignments/event/${eventId}`);
    return response.data;
  },
  
  getAssignmentsByVendor: async (vendorId: number) => {
    const response = await api.get(`/assignments/vendor/${vendorId}`);
    return response.data;
  },
  
  getAssignmentsByStaff: async (staffId: number) => {
    const response = await api.get(`/assignments/staff/${staffId}`);
    return response.data;
  },
  
  deleteAssignment: async (id: number) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  }
};

export const InvoiceService = {
  createInvoice: async (invoiceData: any) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },
  
  getAllInvoices: async () => {
    return MOCK_INVOICES;
    const response = await api.get('/invoices');
    return response.data;
  },
  
  getInvoiceById: async (id: number) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },
  
  getInvoicesByClient: async (clientId: number) => {
    const response = await api.get(`/invoices/client/${clientId}`);
    return response.data;
  },
  
  getInvoicesByEvent: async (eventId: number) => {
    const response = await api.get(`/invoices/event/${eventId}`);
    return response.data;
  },
  
  updateInvoice: async (id: number, invoiceData: any) => {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },
  
  deleteInvoice: async (id: number) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  }
};

export const ReportService = {
  getRevenuePerEvent: async () => {
    const response = await api.get('/reports/revenue-per-event');
    return response.data;
  },
  
  getEventCountPerClient: async () => {
    const response = await api.get('/reports/event-count-per-client');
    return response.data;
  },
  
  getInvoiceStatusCounts: async () => {
    const response = await api.get('/reports/invoice-status');
    return response.data;
  },
  
  getOverdueInvoices: async () => {
    const response = await api.get('/reports/overdue-invoices');
    return response.data;
  }
};