// src/components/UserDashboard.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import webSocketService from "../services/webSocketService";

const UserDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState({ username: "User", role: "USER" });

  useEffect(() => {
    // Fetch profile information from the server
    // This is just a placeholder. Replace with actual API call
    // Example: fetchProfile().then(data => setProfile(data));
    setProfile({ username: "John Doe", role: "USER" });

    // Set the message handler for WebSocket messages
    webSocketService.setMessageHandler((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar>{profile.username.charAt(0)}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{profile.username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.role}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sales Messages</Typography>
              {messages.length === 0 ? (
                <Typography>No messages yet.</Typography>
              ) : (
                messages.map((msg, index) => (
                  <Typography key={index}>{msg}</Typography>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;
