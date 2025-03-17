# MERN Stack Admin & Agent Management System

## Overview
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based application that allows an admin to log in, create and manage agents, upload CSV files, and distribute tasks among agents.

## Features

### 1. **Admin User Login**
- Login with Email and Password
- Authentication using JSON Web Tokens (JWT)
- Redirect to Dashboard upon successful login
- Error messages for invalid credentials

### 2. **Agent Management**
- Add new agents with the following details:
  - Name
  - Email
  - Mobile Number (with country code)
  - Password
- View and manage agent details

### 3. **CSV Upload & Task Distribution**
- Upload a CSV file with the following columns:
  - First Name (Text)
  - Phone Number (Number)
  - Notes (Text)
- Only supports `.csv`, `.xlsx`, and `.xls` formats
- Validate and parse the CSV file
- Distribute tasks equally among 5 agents
- Save the distributed data in MongoDB
- Display distributed lists on the frontend

## Tech Stack
- **Frontend:** React.js, tailwindcss
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Installation

### 1. **Clone the Repository**
```sh
 git clone https://github.com/UtkarshPal45/Admin-Panel.git
 cd Admin-Panel
```

### 2. **Backend Setup**
```sh
 cd server
 npm install
```
- Create a `.env` file in the backend directory and add:
  ```env
  DATABASE_URL=your_mongodb_connection_string
  JWT_SECRET_KEY=your_jwt_secret_key
  ```
- Start the backend server:
  ```sh
  npm run dev
  ```

### 3. **Frontend Setup**
```sh
 cd client
 npm install
 npm run dev
```

## API Endpoints

### **Authentication**
| Method | Endpoint           |  Description          |
|--------|--------------------|-----------------------|
| POST   | `/api/admin/login` |  Admin login          |

### **Agents**
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/agents/add`    | Create a new agent     |
| GET    | `/api/agents`        | Get all agents         |
| GET    | `/api/agents/:id`    | Get agent by Id        |

### **CSV Upload & Distribution**
| Method | Endpoint               |  Description            |
|--------|------------------------|-------------------------|
| POST   | `/api/tasks/upload`    |  Upload and process CSV |
| GET    | `/api/tasks/:agentId`  |  Get tasks by agentId   |

## Running the Application
1. Start the backend server
2. Start the frontend server
3. Open `http://localhost:5173` in your browser

## Error Handling
- Invalid login credentials return appropriate error messages.
- CSV files with incorrect format are rejected.
- Agents cannot have duplicate emails.

## Contact
For any queries, reach out at `palutkarsh821@gmail.com`.


