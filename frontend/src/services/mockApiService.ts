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
    description: 'Annual team-building retreat for the company. Activities include workshops, team challenges, and evening social events.'
  },
  {
    id: 2,
    eventName: 'Product Launch',
    location: 'Downtown Convention Center',
    eventDate: '2025-05-10T09:00:00',
    status: 'SCHEDULED',
    client: {
      id: 2,
      firstName: 'Client',
      lastName: 'User',
      email: 'client@example.com',
      role: 'CLIENT'
    },
    description: 'Launch event for our new product line. Includes presentations, demos, and networking reception.'
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
    description: 'Team building activities and workshops for the marketing department.'
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
    await delay(200);
    return { valid: true };
  }
};

export const MockUserService = {
  getCurrentUser: async () => {
    await delay(300);
    
    const user = MOCK_USERS[0];
    
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
  },
  
  updateProfile: async (userData: any) => {
    await delay(300);
    
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
    await delay(300);
    
    return MOCK_USERS.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role
    }));
  },
  
  getUserById: async (id: number) => {
    await delay(200);
    
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