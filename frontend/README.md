# Event Management System - Frontend

This is the frontend application for the Event Management System (EMS). It's built with React, TypeScript, and React Router, and it communicates with a Spring Boot backend.

## Features

- User authentication and registration
- Role-based access control (Admin, Client, Vendor, Staff)
- Dashboard for each user role
- Event management
- Vendor and staff assignment
- Invoice and payment tracking
- Reporting and analytics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A running backend server (or you can use the mock API for development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/event-management-system.git
   cd event-management-system/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Configure environment variables:
   - Copy the `.env.example` file to `.env` (or create a new `.env` file)
   - Set `VITE_API_URL` to your backend API URL (e.g., `http://localhost:8080/api`)
   - Set `VITE_USE_MOCK_API` to `true` for development without a backend, or `false` to use the real backend

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Mock Credentials

When using the mock API (`REACT_APP_USE_MOCK_API=true`), you can use the following test accounts:

| Role   | Email                | Password  |
|--------|----------------------|-----------|
| Admin  | admin@example.com    | Admin123  |
| Client | client@example.com   | Client123 |
| Vendor | vendor@example.com   | Vendor123 |
| Staff  | staff@example.com    | Staff123  |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard components for different roles
│   └── ...
├── contexts/            # React contexts for state management
├── pages/               # Full page components
├── services/            # API services and utilities
├── styles/              # CSS styles
├── App.tsx              # Main application component
└── index.tsx            # Entry point
```

## Connecting to the Backend

The frontend is designed to work with the Spring Boot backend. To connect to the real backend:

1. Make sure your Spring Boot application is running
2. Set `REACT_APP_USE_MOCK_API=false` in your `.env` file
3. Set `REACT_APP_API_URL` to your backend API URL (e.g., `http://localhost:8080/api`)
4. Restart the development server

## Building for Production

To create a production build:

```
npm run build
```
or
```
yarn build
```

This will create optimized files in the `build` directory that can be deployed to a web server.

## License

[MIT License](LICENSE)