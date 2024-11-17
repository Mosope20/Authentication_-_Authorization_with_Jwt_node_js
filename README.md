# 🚀 Authentication and Authorization with JWT in Node.js

This project demonstrates how to implement **authentication** and **authorization** in a Node.js application using **JSON Web Tokens (JWT)**. It provides a solid foundation for managing user authentication, securing routes, and implementing user roles.

---

## ✨ Features

- 🔒 **User Registration and Login**: Allows users to register and log in to the application.
- 🛡️ **JWT-Based Authentication**: Securely authenticate users with JWTs.
- 🎯 **Role-Based Authorization**: Control access to resources based on user roles.

---

## 📂 Project Structure

```plaintext
Authentication_-_Authorization_with_Jwt_node_js/
├── controllers/
│   ├── authController.js
├── middlewares/
│   ├── authMiddleware.js
├── routes/
│   ├── authRoutes.js
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
```

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mosope20/Authentication_-_Authorization_with_Jwt_node_js.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd Authentication_-_Authorization_with_Jwt_node_js
```

### 3️⃣ Install Dependencies

Make sure Node.js is installed on your system. Then, run:
```bash
npm install
```

### 4️⃣ Set Up Environment Variables

Create a .env file in the root directory to store sensitive information like JWT secret keys. For example:
```bash
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 5️⃣ Run the Application
start the server with:
```bash
npm start
```
### 🎉 The application should now be running, and you can interact with its endpoints as defined in the routes directory.

---

## 📡 API Endpoints
- POST /signup: Registers a new user.
- POST /login: Authenticates a user and returns a JWT.
- GET /users,/update,/logout,/delete: Protected routes that requires a valid JWT.

---

## 📦 Dependencies
- express: Web framework for Node.js.
- jsonwebtoken: Library to sign and verify JWTs.
- dotenv: Loads environment variables from a .env file.

---

## 🌟 Contribution Guidelines
I ❤️ contributions! If you'd like to contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of your changes.

---

## 📜 License
This project is licensed under the MIT License. Feel free to use it as you like!

---

## ✍️ Author
Mosope20
GitHub: [Mosope20](github.com/Mosope20/)




