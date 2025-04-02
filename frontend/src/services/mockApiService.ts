const MOCK_USERS = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Admin123',
    role: 'ADMIN'
  },
  {
    id: 2,
    firstName: 'Client',
    lastName: 'User',
    email: 'client@example.com',
    password: 'Client123',
    role: 'CLIENT'
  },
  {
    id: 3,
    firstName: 'Vendor',
    lastName: 'User',
    email: 'vendor@example.com',
    password: 'Vendor123',
    role: 'VENDOR'
  },
  {
    id: 4,
    firstName: 'Staff',
    lastName: 'User',
    email: 'staff@example.com',
    password: 'Staff123',
    role: 'STAFF'
  }
];

const MOCK_EVENTS = [
  {
    id: 1,
    eventName: 'Annual Corporate Retreat',
    location: 'Mountain View Resort',
    eventDate: '2025-06-15T14:00:00',
    status: 'SCHEDULED',
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User',
      email: 'client@example.com',
      role: 'CLIENT'
    },
    description: 'Annual team-building retreat for the company. Activities include workshops, team challenges, and evening social events.',
    rating: 0
  },
  {
    id: 2,
    eventName: 'Product Launch',
    location: 'Downtown Convention Center',
    eventDate: '2025-04-04T09:00:00',
    status: 'SCHEDULED',
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User',
      email: 'client@example.com',
      role: 'CLIENT'
    },
    description: 'Launch event for our new product line. Includes presentations, demos, and networking reception.',
    rating: 0
  },
  {
    id: 3,
    eventName: 'Team Building Workshop',
    location: 'Adventure Park',
    eventDate: '2025-04-22T10:00:00',
    status: 'COMPLETED',
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User',
      email: 'client@example.com',
      role: 'CLIENT'
    },
    description: 'Team building activities and workshops for the marketing department.',
    rating: 0
  }
];

const MOCK_INVOICES = [
  {
    id: 101,
    event: { 
      id: 1,
      eventName: 'Annual Corporate Retreat'
    },
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User'
    },
    totalAmount: 5200.00,
    status: 'PENDING',
    dueDate: '2025-05-15'
  },
  {
    id: 102,
    event: { 
      id: 2,
      eventName: 'Product Launch'
    },
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User'
    },
    totalAmount: 3750.00,
    status: 'PAID',
    dueDate: '2025-04-10'
  },
  {
    id: 103,
    event: { 
      id: 3,
      eventName: 'Team Building Workshop'
    },
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User'
    },
    totalAmount: 1500.00,
    status: 'PAID',
    dueDate: '2025-03-22'
  }
];

const MOCK_PAYMENTS = [
  {
    id: 101,
    eventId: 1,
    eventName: "Annual Corporate Retreat",
    amountPaid: 2500.0,
    paymentDate: "2025-04-15",
    paymentMethod: "Bank Transfer",
    vendor: {
      id: 1,
      firstName: "Catering",
      lastName: "Essentials",
      email: "catering.essentials@exsample.com",
    },
  },
  {
    id: 102,
    eventId: 2,
    eventName: "Product Launch",
    amountPaid: 1750.0,
    paymentDate: "2025-03-25",
    paymentMethod: "Credit Card",
    vendor: {
      id: 1,
      firstName: "Catering",
      lastName: "Essentials",
      email: "catering.essentials@exsample.com",
    },
  },

  {
    id: 102,
    eventId: 2,
    eventName: "Mixer",
    amountPaid: 20000.0,
    paymentDate: "2024-02-25",
    paymentMethod: "Credit Card",
    vendor: {
      id: 1,
      firstName: "Mixer",
      lastName: "For All",
      email: "mixer@exsample.com",
    },
  },

  {
    id: 102,
    eventId: 2,
    eventName: "TedTalk",
    amountPaid: 532.0,
    paymentDate: "2025-01-17",
    paymentMethod: "Credit Card",
    vendor: {
      id: 1,
      firstName: "ted",
      lastName: "talk",
      email: "tedtalk@exsample.com",
    },
  },
];

const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    event: {
      id: 2,
    },
    vendor: {
      id: 3,
      firstName: "Catering",
      lastName: "Essentials",
      email: "catering.essentials@exsample.com",
    },
    staff: {
      id: 1
    },
    role: "Catering", 
    status: "ASSIGNED"
  },

  {
    id: 2,
    event: {
      id: 1,
    },
    vendor: {
      id: 3,
      firstName: "Ski Bindings",
      lastName: "Winter",
      email: "skibindings.winters@exsample.com",
    },
    staff: {
      id: 1
    },
    role: "Ski Equipment",
    status: "ASSIGNED"
  },

  {
    id: 3,
    event: {
      id: 1,
    },
    vendor: {
      id: 3,
      firstName: "Butler & Maids",
      lastName: "Service",
      email: "butlerandmaids.service@exsample.com",
    },
    staff: {
      id: 1
    },
    role: "Service",
    status: "AVAILABLE"
  }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockAuthService = {
  login: async (email: string, password: string) => {
    await delay(500);
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const token = `mock-jwt-token-${user.id}-${user.role}`;
    
    return {
      token,
      role: user.role
    };
  },
  
  register: async (userData: any) => {
    await delay(500);
    
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData,
      password: userData.password
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    };
  },
  
  verifyToken: async () => {
    await delay(100);
    return { valid: true };
  }
};

export const MockUserService = {
  getCurrentUser: async (email: any) => {
    await delay(150);
    
    const index = MOCK_USERS.findIndex(u => u.email === email);
    
    return index == -1 ? {} : {
      id: MOCK_USERS[index].id,
      firstName: MOCK_USERS[index].firstName,
      lastName: MOCK_USERS[index].lastName,
      email: MOCK_USERS[index].email,
      role: MOCK_USERS[index].role
    };
  },

  createUser: async (userData: any) => {
    await delay(150);
    
    const newUser = {
      id: MOCK_USERS.length + 1,
      ...userData
    };
    
    MOCK_USERS.push(newUser);
    
    return newUser;
  },
  
  updateProfile: async (userData: any) => {
    await delay(150);
    
    const userIndex = MOCK_USERS.findIndex(u => u.id === userData.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    MOCK_USERS[userIndex] = {
      ...MOCK_USERS[userIndex],
      ...userData
    };
    
    return MOCK_USERS[userIndex];
  },
  
  getAllUsers: async () => {
    await delay(150);
    
    return MOCK_USERS.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role
    }));
  },
  
  getUserById: async (id: number) => {
    await delay(100);
    
    const user = MOCK_USERS.find(u => u.id === id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
  }
};

export const MockEventService = {
  createEvent: async (eventData: any) => {
    await delay(300);
    
    const newEvent = {
      id: MOCK_EVENTS.length + 1,
      ...eventData,
      status: 'SCHEDULED'
    };
    
    MOCK_EVENTS.push(newEvent);
    
    return newEvent;
  },
  
  getAllEvents: async () => {
    await delay(300);
    return [...MOCK_EVENTS];
  },
  
  getEventById: async (id: number) => {
    await delay(200);
    
    const event = MOCK_EVENTS.find(e => e.id === id);
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    return event;
  },
  
  getEventsByClientId: async (clientId: number) => {
    await delay(300);
    
    return MOCK_EVENTS.filter(e => e.client && e.client.id === clientId);
  },
  
  updateEvent: async (id: number, eventData: any) => {
    await delay(300);
    
    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    MOCK_EVENTS[eventIndex] = {
      ...MOCK_EVENTS[eventIndex],
      ...eventData
    };
    
    return MOCK_EVENTS[eventIndex];
  },

  rateEvent: async (id: number, rating: number) => {
    await delay(300);
    
    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    MOCK_EVENTS[eventIndex].rating = rating;
    
    return MOCK_EVENTS[eventIndex];
  },
  
  deleteEvent: async (id: number) => {
    await delay(300);
    
    const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    MOCK_EVENTS.splice(eventIndex, 1);
    
    return { success: true };
  }
};

export const MockInvoiceService = {
  createInvoice: async (invoiceData: any) => {
    await delay(150);
    
    const newInvoice = {
      id: MOCK_INVOICES.length + 1,
      ...invoiceData
    };
    
    MOCK_INVOICES.push(newInvoice);
    
    return newInvoice;
  },
  
  getAllInvoices: async () => {
    await delay(150);
    return [...MOCK_INVOICES];
  },
  
  getInvoiceById: async (id: number) => {
    await delay(100);
    
    const invoice = MOCK_INVOICES.find(e => e.id === id);
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    return invoice
  },
  
  getInvoicesByClient: async (clientId: number) => {
    await delay(150);
    
    return MOCK_INVOICES.filter(e => e.client && e.client.id === clientId);
  },

  getInvoicesByEvent: async (eventId: number) => {
    await delay(150);
    
    return MOCK_INVOICES.filter(e => e.event && e.event.id === eventId);
  },
  
  updateInvoice: async (id: number, invoiceData: any) => {
    await delay(150);
    
    const index = MOCK_INVOICES.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    MOCK_INVOICES[index] = {
      ...MOCK_INVOICES[index],
      ...invoiceData
    };
    
    return MOCK_EVENTS[index];
  },
  
  deleteInvoice: async (id: number) => {
    await delay(150);
    
    const index = MOCK_INVOICES.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error('Invoice not found');
    }
    
    MOCK_INVOICES.splice(index, 1);
    
    return { success: true };
  }
};

export const MockPaymentService = {
 getAllPayments: async () => {
  await delay(150)

  return MOCK_PAYMENTS;
 },

  getPaymentsByVendor: async (vendorId: number) => {
  await delay(150);
  
  return MOCK_PAYMENTS.filter(e => e.vendor && e.vendor.id === vendorId);
}
};



export const MockAssignmentService = {
  createAssignment: async (assignmentData: any) => {
    await delay(150);
    
    const newAssignment = {
      id: MOCK_INVOICES.length + 1,
      ...assignmentData
    };
    
    MOCK_ASSIGNMENTS.push(newAssignment);
    
    return newAssignment;
  },

  getAssignmentsByEvent: async (eventId: number) => {
    await delay(150);
    
    return MOCK_ASSIGNMENTS.filter(e => e.event && e.event.id === eventId);
  },

  getAssignmentsByVendor: async (vendorId: number) => {
    await delay(150);
    
    return MOCK_ASSIGNMENTS.filter(e => e.vendor && e.vendor.id === vendorId);
  },

  getAssignmentsByStaff: async (staffId: number) => {
    await delay(150);
    
    return MOCK_ASSIGNMENTS.filter(e => e.staff && e.staff.id === staffId);
  },
  
  deleteAssignment: async (id: number) => {
    await delay(150);
    
    const index = MOCK_ASSIGNMENTS.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error('Asignment not found');
    }
    
    MOCK_ASSIGNMENTS.splice(index, 1);
    
    return { success: true };
  }
};