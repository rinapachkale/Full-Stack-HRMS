import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Employees from "./Employees";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogin = () => {
    fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true); // Update login status
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/employees" replace />
            ) : (
              <div className="App">
                <div className="background-image"></div>
                <div>
                  <h1>Welcome to Human Resource Management System</h1>
                  <h5>Empowering Your Workforce with Efficient Tools, Streamlining Success and Driving Growth for Your Organization.</h5>
                  <div className="login-container">
                    <h2>Admin Login</h2>
                    <div className="login-form">
                      <input
                        className="login-form-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        className="login-form-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className="login-form-button" onClick={handleLogin} disabled={!username || !password}>
                        Login
                      </button>
                    </div>
                  </div>
                  <h5>A Human Resource Management System is a straightforward CRUD application designed to manage employee data efficiently. It allows users to add new employee records, view existing details, update information, and delete records when necessary. The system ensures streamlined operations by organizing critical employee information such as names, roles, and contact details in an intuitive and user-friendly interface. With its minimalistic design and functionality, the app is ideal for small to medium-sized organizations seeking a simple yet effective HR management tool.</h5>
                </div>
              </div>
            )
          }
        />
        {/* Employees Route */}
        <Route
          path="/employees"
          element={isLoggedIn ? <Employees /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
