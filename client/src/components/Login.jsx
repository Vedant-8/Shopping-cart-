import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      const role = response.role;
      console.log("User role:", role); // For debugging purposes
      if (role === "ROLE_ADMIN") {
        onLogin(); // Call onLogin to update authentication state
        navigate("/admin/home");
      } else if (role === "ROLE_USER") {
        onLogin(); // Call onLogin to update authentication state
        navigate("/user/home");
      } else {
        setError("Invalid role. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
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
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Login;
