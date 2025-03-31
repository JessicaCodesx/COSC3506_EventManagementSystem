# Event Management System (EMS)

A full-stack web application for creating, managing, and tracking events — built with React 18 + Vite on the frontend and Spring Boot on the backend.

---

## Project Structure

event-management-system/
├── frontend/    → React 18 + Vite  
└── backend/     → Spring Boot + Java 17 + Spring Security + JPA

---

## How to Run

### Prerequisites

Make sure you have the following installed:

- Node.js (v18+): https://nodejs.org/
- Java JDK 17: https://adoptium.net/
- Maven: https://maven.apache.org/
- Git: https://git-scm.com/
- MySQL Community Server: https://dev.mysql.com/downloads/mysql/

---

### Pull Repository
1. Open your folder in terminal or IDE
2. Run:
   ```bash
   git clone https://github.com/JessicaCodesx/COSC3506_EventManagementSystem.git
   ```

---

### MySQL Database Setup (Required)

Before running the backend, set up the local database:

1. Open a terminal 
2. Run the following SQL commands:

```sql
mysql -u root -p

CREATE DATABASE `ems-db`;  
CREATE USER 'emsuser'@'localhost' IDENTIFIED BY 'password';  
GRANT ALL PRIVILEGES ON `ems-db`.* TO 'emsuser'@'localhost';  
FLUSH PRIVILEGES;
```

3. Make sure MySQL is running on localhost:3306

---

### Backend Setup (Spring Boot)

1. Open the root `event-management-system` folder in IntelliJ or your preferred IDE
2. Navigate to: `src/main/java/com/event/backend/BackendApplication.java`
3. Right-click the file and choose Run 'BackendApplication'
4. The backend will start on: http://localhost:8080

Alternatively, from the command line:
```bash
cd backend
mvn spring-boot:run
```

---

### Frontend Setup (React + Vite)

```bash
cd frontend  
npm install            # Install dependencies  
npm run dev            # Run the dev server (http://localhost:5173)
```

> The frontend will run on http://localhost:5173 by default.

---

## Testing the Application

### Login Credentials

You can use the following pre-configured accounts to test different user roles:

| Role  | Email             | Password  | Description                               |
|-------|-------------------|-----------|-------------------------------------------|
| Admin | admin@example.com | Admin123  | Full access to all system features        |
| Client| client@example.com| Client123 | Can create events and manage their events |
| Vendor| vendor@example.com| Vendor123 | Can manage services for assigned events   |
| Staff | staff@example.com | Staff123  | Can view and assist with assigned events  |

### Testing Flow for Different Roles

#### Admin User
1. Log in as admin@example.com / Admin123
2. You'll have access to:
   - View all events, users, and invoices
   - Create any type of user
   - Assign vendors and staff to events
   - Generate reports
   - Manage all system aspects

#### Client User
1. Log in as client@example.com / Client123
2. Test the following features:
   - Create new events
   - Manage your own events
   - View invoices related to your events
   - Simulate paying invoices (payment processing is simulated)
   - Update your profile

#### Vendor User
1. Log in as vendor@example.com / Vendor123
2. Test the following features:
   - View events assigned to you
   - Update service details
   - Manage your vendor profile

#### Staff User
1. Log in as staff@example.com / Staff123
2. Test the following features:
   - View events you're assigned to
   - Update your profile
   - View schedules

### Important Testing Notes

- **Payment Processing**: The system simulates payment processing. When you "pay" an invoice, it simply updates the status to "PAID".
- **Email Notifications**: Email notifications are simulated and not actually sent.
- **Data Persistence**: All data is stored in the local MySQL database, so changes will persist between sessions.

---

## 🛠 Tech Stack

Frontend:
- React 18 (via Vite)
- TypeScript
- React Router
- Context API for state management

Backend:
- Java 17
- Spring Boot
- Spring Security with JWT
- Spring Data JPA
- MySQL
- Maven

---

## Troubleshooting

- **Backend won't start**: Make sure MySQL is running and the database and user credentials are set up correctly.
- **Frontend can't connect to backend**: Check that backend is running on port 8080 and that there are no CORS issues.
- **Login fails**: Verify that the backend is properly seeding the initial users. Check console for any error messages.
