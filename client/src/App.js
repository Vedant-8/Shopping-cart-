// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    // Redirect or manage logged-in state
  };

  const handleRegister = () => {
    // Handle registration success, e.g., show login form
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          {/* Add more routes for other components */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
