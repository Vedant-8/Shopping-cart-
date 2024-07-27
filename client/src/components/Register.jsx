import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    try {
      await authService.register(username, password, role);
      navigate("/login"); 
    } catch (error) {
      console.error(error);
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
        padding: 0,
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
          Register
        </Typography>
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN,USER">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
