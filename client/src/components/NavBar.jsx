import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate(); // Using useNavigate hook from react-router-dom
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the authentication token from local storage
    navigate("/login"); // Navigate to the login page
    authService.logout(); // Call the logout function from your authService
    onLogout(); // Call any additional logout logic passed as a prop
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Shopping Cart
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isAuthenticated && userRole === "ADMIN" && (
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        )}
        {isAuthenticated && userRole === "USER" && (
          <Button color="inherit" component={Link} to="/user">
            Dashboard
          </Button>
        )}
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        )}
        {isAuthenticated && (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
