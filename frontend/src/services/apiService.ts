import axios from 'axios';
import { MockAuthService, MockInvoiceService, MockUserService as MockUserServiceImpl, MockEventService, MockAssignmentService, MockPaymentService, MockVendorAvailabilityService } from './mockApiService';

const useMockServices = true;

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

export interface Event {
  id: number;
  eventName: string;
  location: string;
  eventDate: string;
  status: string;
  description?: string;
  client?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  rating?: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
};

export interface Availibility {
  id: number;
  vendorID: number;
  start: string;
  end: string
}

export interface Invoice {
  id: number;
  status: string;
  totalAmount: number;
};

export interface Assignment {
  id: number;
  event: {
    id: number;
  };
  vendor?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  staff?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  role: string;
  status: string;
}

export interface Payment {
  id: number;
  eventId: number;
  eventName: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: string;
  vendor?: {
    id: number;
    firstName: string;
    lastNnme: string;
    email: string;
  }
}


export const AuthService = {
  login: async (email: string, password: string) => {
    if(useMockServices)
        return MockAuthService.login(email, password);

    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: any) => {
    if(useMockServices)
      return MockAuthService.register(userData);

    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  verifyToken: async () => {
    if(useMockServices)
      return MockAuthService.verifyToken();

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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  availability?: {
    id: number;
    date: string;
    isAvailable: boolean;
  }[];
}

interface UserServiceInterface {
  getCurrentUser(email: string): Promise<User>;
  createUser(userData: Partial<User>): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<void>;
  updateProfile(id: number, userData: Partial<User>): Promise<User>;
}

interface MockUserServiceInterface extends UserServiceInterface {
  getUserById(id: number): Promise<User>;
}

const mockUsers: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'admin' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', role: 'user' },
];

export const MockUserService: MockUserServiceInterface = {
  getUserById: async (id: number): Promise<User> => {
    const user = mockUsers.find(user => user.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },
  getCurrentUser: async (email: string): Promise<User> => {
    const mockUser = mockUsers.find(user => user.email === email);
    return mockUser || {} as User;
  },
  createUser: async (userData: Partial<User>): Promise<User> => {
    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    } as User;
    mockUsers.push(newUser);
    return newUser;
  },
  updateProfile: async (id: number, userData: Partial<User>): Promise<User> => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      return mockUsers[userIndex];
    }
    throw new Error('User not found');
  },
  getAllUsers: async (): Promise<User[]> => {
    return mockUsers;
  },
  deleteUser: async (id: number): Promise<void> => {
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    mockUsers.splice(userIndex, 1);
  }
};

export const UserService: UserServiceInterface = {
  getCurrentUser: async (email: string) => {
    if(useMockServices)
      return MockUserServiceImpl.getCurrentUser(email);
    try {
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      return {} as User;
    }
  },
  createUser: async (userData: Partial<User>) => {
    if(useMockServices)
      return MockUserServiceImpl.createUser(userData);
    const response = await api.post("/users", userData);
    return response.data;
  },
  getAllUsers: async () => {
    if(useMockServices)
      return MockUserServiceImpl.getAllUsers();

    const response = await api.get("/users");
    return response.data;
  },
  deleteUser: async (id: number) => {
    if(useMockServices)
      return MockUserServiceImpl.deleteUser(id);
    await api.delete(`/users/${id}`);
  },
  updateProfile: async (id: number, userData: Partial<User>) => {
    if(useMockServices)
      return MockUserServiceImpl.updateProfile(id, userData);
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
};

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  assignedTo: number;
  eventId?: number;
}

export const TaskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTasksByUserId: async (userId: number): Promise<Task[]> => {
    const response = await api.get(`/tasks/user/${userId}`);
    return response.data;
  },

  createTask: async (task: Partial<Task>): Promise<Task> => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};

export interface Schedule {
  id: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  eventId?: number;
  description?: string;
}

export const ScheduleService = {
  getScheduleByUserId: async (userId: number): Promise<Schedule[]> => {
    const response = await api.get(`/schedules/user/${userId}`);
    return response.data;
  },

  createSchedule: async (schedule: Partial<Schedule>): Promise<Schedule> => {
    const response = await api.post('/schedules', schedule);
    return response.data;
  },

  updateSchedule: async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
    const response = await api.put(`/schedules/${id}`, schedule);
    return response.data;
  },

  deleteSchedule: async (id: number): Promise<void> => {
    await api.delete(`/schedules/${id}`);
  }
};

export const VendorAvailabilityService = {
  getAll: async(userID: number) => {
    return MockVendorAvailabilityService.getAll(userID);
  },

  add: async(userID: number, start: string, end: string) => {
    return MockVendorAvailabilityService.add(userID, start, end);
  },

  remove: async(id: number) => {
    return MockVendorAvailabilityService.remove(id);
  }
}

export const EventService = {
  createEvent: async (eventData: any) => {
    if(useMockServices)
      return MockEventService.createEvent(eventData);

    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  getAllEvents: async () => {
    if(useMockServices)
      return MockEventService.getAllEvents();
    // const response = await api.get('/events');
    // return response.data;
  },
  
  getEventById: async (id: number) => {
    if(useMockServices)
      return MockEventService.getEventById(id);

    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  getEventsByClientId: async (clientId: number) => {
    if(useMockServices)
      return MockEventService.getEventsByClientId(clientId);

    const response = await api.get(`/events/client/${clientId}`);
    return response.data;
  },
  
  updateEvent: async (id: number, eventData: any) => {
    if(useMockServices)
      return MockEventService.updateEvent(id, eventData);
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  rateEvent: async (id: number, rating: number) => {
    if(useMockServices)
      return MockEventService.rateEvent(id, rating);

    const response = await api.put(`/events/${id}/rating`, rating);
    return response.data;
  },
  
  deleteEvent: async (id: number) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};

export const AssignmentService = {
  createAssignment: async (assignmentData: any) => {
    if(useMockServices)
      return MockAssignmentService.createAssignment(assignmentData);

    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },
  
  getAssignmentsByEvent: async (eventId: number) => {
    if(useMockServices)
      return MockAssignmentService.getAssignmentsByEvent(eventId);

    const response = await api.get(`/assignments/event/${eventId}`);
    return response.data;
  },
  
  getAssignmentsByVendor: async (vendorId: number) => {
    if(useMockServices)
      return MockAssignmentService.getAssignmentsByVendor(vendorId);

    const response = await api.get(`/assignments/vendor/${vendorId}`);
    return response.data;
  },
  
  getAssignmentsByStaff: async (staffId: number) => {
    if(useMockServices)
      return MockAssignmentService.getAssignmentsByStaff(staffId);

    const response = await api.get(`/assignments/staff/${staffId}`);
    return response.data;
  },
  
  deleteAssignment: async (id: number) => {
        if(useMockServices)
      return MockAssignmentService.deleteAssignment(id);

    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  },

  setAssignmentStatus: async (id: number, status: string) => {
    MockAssignmentService.setAssignmentStatus(id, status);
  }
};

export const InvoiceService = {
  createInvoice: async (invoiceData: any) => {
    if(useMockServices)
      return MockInvoiceService.createInvoice(invoiceData);
      const response = await api.post('/invoices', invoiceData);
      return response.data;
  },
  
  getAllInvoices: async () => {
    if(useMockServices)
      return MockInvoiceService.getAllInvoices();

    const response = await api.get('/invoices');
    return response.data;
  },
  
  getInvoiceById: async (id: number) => {
    if(useMockServices)
      return MockInvoiceService.getInvoiceById(id);

    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },
  
  getInvoicesByClient: async (clientId: number) => {
    if(useMockServices)
      return MockInvoiceService.getInvoicesByClient(clientId);

    const response = await api.get(`/invoices/client/${clientId}`);
    return response.data;
  },
  
  getInvoicesByEvent: async (eventId: number) => {
    if(useMockServices)
      return MockInvoiceService.getInvoicesByEvent(eventId);

    const response = await api.get(`/invoices/event/${eventId}`);
    return response.data;
  },
  
  updateInvoice: async (id: number, invoiceData: any) => {
    if(useMockServices)
      return MockInvoiceService.updateInvoice(id, invoiceData);

    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },
  
  deleteInvoice: async (id: number) => {
    if(useMockServices)
      return MockInvoiceService.deleteInvoice(id);

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

export const PaymentService = {
 getAllPayments: async () => {
  return MockPaymentService.getAllPayments();
 },

  getPaymentsByVendor: async (vendorId: number) => {
  return MockPaymentService.getPaymentsByVendor(vendorId);
}
};