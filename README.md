# Contact Management System

## Description

This project is a Contact Management System built using **React**, **MUI (Material UI)**, and **Node.js/Express** for the backend. The application allows users to manage a list of contacts with details like name, email, phone number, company, and job title. It supports CRUD operations (Create, Read, Update, Delete) and incorporates features such as pagination, sorting, and form validation.

### Features:
- Add, Edit, Delete, and View Contacts
- Sort and filter contacts by different fields
- Responsive design with **Tailwind CSS**
- **Toast Notifications** for successful or failed actions
- Pagination to manage large datasets
- Input validation using **Zod**

## Setup Instructions

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (optional, can use npm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contact-management.git
   cd contact-management
Install dependencies:

For the backend:
bash
Copy code
cd backend
npm install
For the frontend:
bash
Copy code
cd frontend
npm install
Configure the MongoDB connection:

Create a .env file in the backend directory and add the following line with your MongoDB URI (ensure proper URL encoding):
bash
Copy code
MONGO_URI=mongodb://<username>:<password>@localhost:27017/contact-management
Or, if using MongoDB Atlas, the connection URL might look like:
bash
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact-management?retryWrites=true&w=majority
Start the backend server:

bash
Copy code
cd backend
npm run dev
Start the frontend server:

bash
Copy code
cd frontend
npm start
The app should now be running on http://localhost:3000 for the frontend and the API on http://localhost:8000.

Database Schema
The database uses MongoDB with the following schema for storing contacts:

js
Copy code
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
How It Works
Frontend (React)

Uses React for rendering the contact list and managing state.
MUI components (such as tables, buttons, and dialogs) are used for UI elements.
Tailwind CSS is used for styling the layout.
Axios handles API requests to the backend.
React Router can be added if necessary to manage routes.
Backend (Node.js/Express)

The backend is built with Node.js and Express for handling API routes.
MongoDB is used to store contact data.
Mongoose is used to interact with MongoDB.
Input validation is done using Zod on the backend for robust data validation.
Challenges and Solutions
1. Handling and Modifying MUI Components
Challenge: I encountered issues with modifying MUI components (such as TextField and Table) to fit the design and functionality requirements, especially when dealing with editable fields and form validation.

Solution: I carefully explored MUI’s API documentation and used TextField with conditional rendering for editable cells. For the table, I utilized the TableSortLabel and TablePagination components for sorting and pagination. Additionally, I customized the styles using Tailwind CSS for better integration.

2. URL Encoding in MongoDB Connection URL
Challenge: When connecting to MongoDB using a connection string, special characters in the username or password caused issues with the connection.

Solution: I encoded the MongoDB credentials properly by using the encodeURIComponent() method in JavaScript to handle special characters in the username and password of the MongoDB URI.

Example:

js
Copy code
const mongoUri = `mongodb+srv://<username>:${encodeURIComponent('<password>')}@cluster0.mongodb.net/test`;
3. CORS Error
Challenge: I faced CORS (Cross-Origin Resource Sharing) errors when the frontend made requests to the backend during development.

Solution: I resolved this by using the cors middleware in the backend. This middleware allows the frontend to communicate with the backend during development on different ports (React on 3000 and backend on 8000).

bash
Copy code
npm install cors
In the server.js (or app.js) file, I added:

js
Copy code
const cors = require('cors');
app.use(cors());
Conclusion
This Contact Management System is a simple yet powerful tool for managing contacts with a user-friendly UI and robust backend. The project demonstrates how to build a full-stack application with React, MUI, and MongoDB. It also addresses common issues encountered during development such as component customization, URL encoding, and CORS handling.
