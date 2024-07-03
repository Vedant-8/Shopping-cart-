// Login.js

import React, { useState } from "react";
import authService from "../services/authService";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(username, password);
      onLogin(userData); // Handle login success in parent component
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
      {error && (
        <Alert severity="error" style={{ marginTop: "10px" }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Login;
