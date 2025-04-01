# 📝 Simple Todo App

A **Task Manager App** built with **React.js** (frontend) and **Django** (backend). This app allows users to manage tasks with functionalities like adding, editing, deleting, and filtering tasks based on their completion status. Axios is used for seamless communication between the frontend and backend.

## 🚀 Features  
- View tasks (filter by completed and incomplete).
- Add new tasks. 
- Edit existing tasks.
- Delete tasks.

## 🛠️ Technologies Used
- **Frontend**: React.js   
  - Reactstrap for UI components.
  - Axios for HTTP requests.
- **Backend**: Django REST Framework
  - RESTful API to handle task operations.
- **Database**: SQLite (default Django database).

## 🖥️ Setup Instructions
Follow these steps to set up and run the project locally:

### Backend (Django)
1. Clone the repository:
   ```bash
   git clone https://github.com/Parvezkhan0/myToDo.git
   cd myToDo
   ```
2. Navigate to the backend directory and set up the virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations and start the backend server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   The backend will run on **http://localhost:8000**.

### Frontend (React.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on **http://localhost:3000**.

### API Integration
The frontend communicates with the backend using Axios. Ensure both servers are running to enable seamless data exchange.

