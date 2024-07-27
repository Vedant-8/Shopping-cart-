import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
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
      console.log("User role:", role); 
      if (role === "ROLE_ADMIN") {
        onLogin(); 
        navigate("/admin/home");
      } else if (role === "ROLE_USER") {
        onLogin(); 
        navigate("/user/home");
      } else {
        setError("Invalid role. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)", 
        margin: 0,
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.9)", 
          borderRadius: 4,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          padding: 4,
          maxWidth: 400,
          width: "100%",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)", 
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", 
          },
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 2, color: "#00274d" }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              background: "#007bff",
              "&:hover": {
                background: "#0056b3",
              },
              transition: "background 0.3s ease",
            }}
          >
            Login
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
