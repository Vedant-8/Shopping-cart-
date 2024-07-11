import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import authService from "../services/authService";
import { Navigate } from "react-router-dom"; // Make sure to import Navigate

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem("token", response.data.token);
      onLogin();
    } catch (error) {
      console.error(error);
      setLoginError(true);
      return;
    }
  };

  // Redirect logic based on role after successful login
  const redirectToDashboard = () => {
    const role = authService.getRole();
    switch (role) {
      case "ADMIN":
        return <Navigate to="/admin" />;
      case "USER":
        return <Navigate to="/user" />;
      default:
        return null;
    }
  };

  // Check if authenticated and redirect accordingly
  if (authService.isAuthenticated()) {
    return redirectToDashboard();
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {loginError && (
        <Typography variant="body2" color="error">
          Invalid username or password.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
