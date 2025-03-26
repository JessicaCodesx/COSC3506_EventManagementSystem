# Event Management System (EMS)

A full-stack web application for creating, managing, and tracking events — built with React 18 + Vite + Material UI on the frontend and Spring Boot on the backend.

---

## Project Structure

event-management-system/
├── frontend/    → React 18 + Vite + Material UI  
└── backend/     → Spring Boot + Java 17 + Spring Security + JPA

---

### Prerequisites

Make sure you have the following installed:

- Node.js (v18+): https://nodejs.org/
- Java JDK 17: https://adoptium.net/
- Maven: https://maven.apache.org/
- Git: https://git-scm.com/
- MySQL Community Server: https://dev.mysql.com/downloads/mysql/

---

## Pull Repo
- Open your folder in terminal or ide
- run
    git clone https://github.com/JessicaCodesx/COSC3506_EventManagementSystem.git

## Frontend Setup (React + Vite)

cd frontend  
npm install            # Install dependencies  
npm run dev            # Run the dev server (http://localhost:5173)

> The frontend will run on http://localhost:5173 by default.

---

### 🔧 MySQL Database Setup (Required)

Before running the backend, set up the local database:

1. Open a terminal 
2. Run the following SQL commands:

MYSQL -u root -p

CREATE DATABASE `ems-db`;  
CREATE USER 'emsuser'@'localhost' IDENTIFIED BY 'password';  
GRANT ALL PRIVILEGES ON `ems-db`.* TO 'emsuser'@'localhost';  
FLUSH PRIVILEGES;

3. Make sure MySQL is running on localhost:3306

---

### IntelliJ Setup (running backend)

1. Open the root `event-management-system` folder in IntelliJ
2. Navigate to: src/main/java/com/event/backend/BackendApplication.java
3. Right-click the file and choose Run 'BackendApplication'
4. The backend will start on: http://localhost:8080

---

## 🛠 Tech Stack

Frontend:
- React 18 (via Vite)
- TypeScript
- Material UI (MUI)
- React Router

Backend:
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL
- Maven
