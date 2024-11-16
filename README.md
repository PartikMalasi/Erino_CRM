# Contact Management System

A comprehensive contact management solution built with React, Material UI, and Node.js/Express. This application provides a robust interface for managing contacts with features like pagination, sorting, and form validation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 📝 Complete CRUD operations (Create, Read, Update, Delete)
- 🔍 Advanced sorting and filtering capabilities
- 📱 Responsive design powered by Tailwind CSS
- 🔔 Toast notifications for user actions
- 📄 Pagination for efficient data handling
- ✅ Input validation using Zod
- 🎨 Material UI components for a polished look

## 🛠️ Tech Stack

- **Frontend:** React, Material UI, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Validation:** Zod
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version)
- MongoDB (local or Atlas account)
- npm or Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contact-management.git
   cd contact-management
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact-management?retryWrites=true&w=majority
   ```

5. **Start the application**

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   npm start
   ```

   The application will be available at `http://localhost:3000`

## 💾 Database Schema

```javascript
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});
```

## 🏗️ Architecture

### Frontend
- React for component-based UI development
- Material UI for pre-built components
- Tailwind CSS for custom styling
- Axios for API communication
- React Router for navigation (optional)

### Backend
- Express.js for REST API endpoints
- MongoDB for data persistence
- Mongoose for data modeling
- Zod for input validation

## 🚧 Common Issues & Solutions

### 1. Material UI Component Customization
**Issue:** Difficulty in modifying MUI components for custom requirements
**Solution:** Utilize MUI's style overrides and Tailwind CSS utilities for customization

### 2. MongoDB Connection
**Issue:** Special characters in MongoDB credentials causing connection failures
**Solution:** Use proper URL encoding:
```javascript
const mongoUri = `mongodb+srv://<username>:${encodeURIComponent('<password>')}@cluster0.mongodb.net/test`;
```

### 3. CORS Configuration
**Issue:** CORS errors during development
**Solution:** Implement CORS middleware:
```javascript
const cors = require('cors');
app.use(cors());
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
