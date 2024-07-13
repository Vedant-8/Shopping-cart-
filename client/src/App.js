import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import authService from "./services/authService";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Adding a loading state

  useEffect(() => {
    const authStatus = authService.isAuthenticated();
    const userRole = authService.getRole();
    setIsAuthenticated(authStatus);
    setRole(userRole);
    setLoading(false); // Set loading to false after checking auth status
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setRole(authService.getRole());
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setRole(null);
  };

  const checkRole = (requiredRole) => {
    const userRole = authService.getRole();
    return userRole === requiredRole;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavBar onLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/home"
          element={
            isAuthenticated && checkRole("ROLE_USER") ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/home"
          element={
            isAuthenticated && checkRole("ROLE_ADMIN") ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products"
          element={<ProductList isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
