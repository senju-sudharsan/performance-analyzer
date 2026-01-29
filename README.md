# Full-Stack Application: JSON File Storage and Performance Report Analyzer

This repository contains two main parts: a **backend API** for storing and retrieving JSON data and a **frontend application** for analyzing and visualizing web page performance using the Google PageSpeed Insights API.

## Overview

### Backend: JSON File Storage API
The backend is a simple API that allows you to store, retrieve, and manage JSON files based on keys and IDs. It includes endpoints for saving JSON data, retrieving it by key or ID, and serving static files for the frontend.

### Frontend: Performance Report Analyzer
The frontend is a React application that allows users to analyze and monitor web page performance using the Google PageSpeed Insights API. It visualizes historical performance trends and provides an interactive UI for users to input URLs for performance analysis.

## Project Structure

```
.
├── backend/               # Backend API for JSON file storage
│   ├── data/              # JSON files storage
│   ├── logs/              # Request logs
│   ├── build/             # React build files for static serving
│   ├── server.js          # Main server file for the backend
│   └── ...                # Other backend files
│
├── frontend/              # React application for performance report
│   ├── public/            # Public assets (e.g., favicon, index.html)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-specific components
│   │   ├── utils/         # Utility functions (e.g., cookie helpers, validation)
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json       # Project metadata and dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
│
├── .env                   # Environment variables for backend
├── LICENSE                # Project license
└── README.md              # This file
```

## Backend: JSON File Storage API

The backend provides several features for storing, retrieving, and managing JSON data.

### Features

- **Save JSON**: Save JSON data associated with a unique key.
- **Get All JSON by Key**: Retrieve all JSON files associated with a key.
- **Get JSON by Key and ID**: Retrieve a specific JSON file based on its key and ID.
- **Health Check**: A simple health check endpoint for server monitoring.
- **Static File Serving**: Serves static files (React build) when requested.

### Endpoints

#### Health Check
- **URL**: `/health`
- **Method**: `POST`
- **Response**: `OK` with status code `200`

#### Save JSON
- **URL**: `/api/save`
- **Method**: `POST`
- **Request Body**:
```
{
  "key": "uniqueKey",
  "json": { "field": "value" }
}
```
- **Response**:
```
{
  "id": "uniqueId",
  "key": "uniqueKey"
}
```

#### Get All JSON by Key
- **URL**: `/api/get/{key}`
- **Method**: `GET`
- **Response**:
```
{
  "key": "uniqueKey",
  "files": [
    { "id": "fileId1", "data": { /* JSON content */ } },
    { "id": "fileId2", "data": { /* JSON content */ } }
  ]
}
```

#### Get JSON by Key and ID
- **URL**: `/api/getById/{key}/{id}`
- **Method**: `GET`
- **Response**:
```
{
  "id": "fileId",
  "data": { /* JSON content */ }
}
```

#### Static File Serving
- **URL**: `/` or any path matching your React build files
- **Method**: `GET`
- **Response**: Serves static React files from the `build` directory, including `index.html`.

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/full-stack-project.git
   cd full-stack-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the `.env` file:
   - `PORT`: Port for the backend server (default: `3001`).
   - `BUILD_DIR`: Path to the React build directory (default: `./build`).
   - `BASE_DIR`: Directory where JSON files are stored (default: `./data`).
   - `LOG_DIR`: Directory where log files are stored (default: `./logs`).

4. Run the backend:
   ```
   npm start
   ```

---

## Frontend: Performance Report Analyzer

This React app integrates with the Google PageSpeed Insights API to analyze web page performance and visualize trends.

### Features

- **URL Analysis**: Enter a URL to analyze its performance using the PageSpeed Insights API.
- **Interactive UI**: A responsive full-width URL input field.
- **Validation**: Real-time URL validation with error messages.
- **Loading State**: Spinner to indicate when analysis is in progress.
- **Toast Notifications**: Success or error feedback.
- **Graph Visualization**: Historical performance data visualized using D3.js.
- **Tailwind CSS**: Modern styling for a responsive UI.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/indrajithc/performance-analyzer.git
   cd performance-analyzer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### API Integration

The frontend app uses the Google PageSpeed Insights API. Ensure to configure the API keys and any necessary backend endpoints.

### Scripts

- `npm start`: Starts the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Runs tests using React Testing Library.

---

## Dependencies

- **Backend**:
  - `bun`: Fast JavaScript runtime.
  - `dotenv`: Loads environment variables.
  - `fs`: Node.js file system module.
  
- **Frontend**:
  - **React**: Core UI framework.
  - **React Hook Form**: Form validation.
  - **D3.js**: Data visualization.
  - **React Toastify**: Toast notifications.
  - **Tailwind CSS**: For responsive styling.

---

## License


******************************************************************************************************************************************************************
STEPS FOR MIGRATION : 
Repo: https://github.com/senju-sudharsan/performance-analyzer

Project has frontend (React) + backend (Node/Express)

No API keys required (UI-driven simulation)

🚀 Performance Analyzer – Setup & Migration Guide
1️⃣ Prerequisites (Install These First)
✅ Node.js (Required)

Version: Node 18+ recommended

Download: https://nodejs.org/

Verify installation:

node -v
npm -v

✅ Git (Required)

Download: https://git-scm.com/

Verify:

git --version

2️⃣ Clone the Repository

Open a terminal / PowerShell and run:

git clone https://github.com/senju-sudharsan/performance-analyzer.git
cd performance-analyzer

3️⃣ Project Structure (Important)

After cloning, you should see:

performance-analyzer/
│
├── frontend/        # React UI
├── server/          # Node.js backend (mock / realism layer)
└── README.md

4️⃣ Backend Setup (Node / Express)
📁 Move into backend folder
cd server

📦 Install backend dependencies
npm install


⚠️ No .env file needed
⚠️ No API keys required

▶️ Start backend server
node server.js


You should see:

Backend running at http://localhost:3001


✅ Keep this terminal open

5️⃣ Frontend Setup (React)
📁 Open a NEW terminal window

(do not stop backend)

cd performance-analyzer/frontend

📦 Install frontend dependencies
npm install

▶️ Start frontend
npm start


Expected output:

Local: http://localhost:3000


Your browser should open automatically.

6️⃣ Using the Application

Enter any URL:

https://example.com
https://youtube.com
https://amazon.in


Click Analyze

The UI will display:

Lighthouse category gauges

Core Web Vitals

Performance Breakdown

Network Waterfall

Dependency Matrix

Opportunities & Diagnostics



9️⃣ Common Issues & Fixes
❌ Backend not responding

Fix:

cd server
node server.js


Make sure it’s running on port 3001

❌ npm start fails in root

You must be inside frontend:

cd frontend
npm start

❌ Scores not changing after code update

Clear browser storage:

localStorage.clear();

🔟 Migration Checklist (TL;DR)
# Clone
git clone https://github.com/senju-sudharsan/performance-analyzer.git

# Backend
cd server
npm install
node server.js

# Frontend (new terminal)
cd frontend
npm install
npm start

***************************************************************************************************************************************************************
