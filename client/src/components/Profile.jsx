import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Profile = () => {
  // Mock data, replace with actual user data
  const user = {
    username: "john_doe",
    role: "USER",
  };

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        <strong>Username:</strong> {user.username}
      </Typography>
      <Typography variant="body1">
        <strong>Role:</strong> {user.role}
      </Typography>
    </Paper>
  );
};

export default Profile;
