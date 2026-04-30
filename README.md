# Smart Study Planner

A full-stack web application for managing study tasks with progress tracking.

## Tech Stack

- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Database: MongoDB (local)

## Project Structure

```text
project 1/
|-- client/              # React frontend (Vite)
|   |-- src/
|   |   |-- components/
|   |   |   |-- TaskForm.jsx
|   |   |   |-- TaskItem.jsx
|   |   |   |-- TaskList.jsx
|   |   |   `-- ProgressBar.jsx
|   |   |-- services/
|   |   |   `-- api.js
|   |   |-- App.jsx
|   |   |-- App.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|-- server/              # Node.js backend
|   |-- models/
|   |   `-- Task.js
|   |-- routes/
|   |   `-- tasks.js
|   |-- server.js
|   `-- package.json
`-- README.md
```

## Features

- Add, edit, and delete study tasks
- Task properties: title, description, deadline, status
- Clean dashboard UI
- Progress tracking (completed vs pending tasks)
- REST API for all CRUD operations
- Responsive design for mobile and desktop

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/status | Toggle status |

## How to Run

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Step 1: Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run mongod directly
mongod
```

### Step 2: Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Start the Frontend

Open a new terminal and run:

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser to `http://localhost:3000`
2. Add a new study task using the form on the left
3. View all tasks in the task list on the right
4. Track your progress with the progress bar
5. Click "Complete" to mark tasks as done
6. Click "Edit" to modify existing tasks
7. Click "Delete" to remove tasks

## Git Setup (Optional)

If you want to push to GitHub, follow these steps:

```bash
# Initialize git repository
git init

# Add all files (excluding node_modules)
git add .

# Create initial commit
git commit -m "Initial commit: Smart Study Planner"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```
