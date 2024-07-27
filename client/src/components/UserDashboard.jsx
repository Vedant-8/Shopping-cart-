import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Fade,
} from "@mui/material";
import authService from "../services/authService";
import WebSocketService from "../services/webSocketService";
import { styled } from "@mui/material/styles";

const Notification = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: 20,
  right: 20,
  width: 300,
  padding: 16,
  boxShadow: theme.shadows[3],
  borderRadius: 8,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  zIndex: 1300, // Ensure it appears above other elements
  transition: "opacity 0.5s ease-in-out",
}));

const UserDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    authService.getProfile().then((data) => {
      setProfile(data);
    });

    const webSocketService = new WebSocketService((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000); // Hide notification after 5 seconds
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  if (!profile) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)",
        padding: 20,
        margin: 0,
      }}
    >
      <Container
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 8,
          padding: 4,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            alt={profile?.username}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: "#00274d" }}>
              {profile.username}
            </Typography>
            <Typography variant="h6" sx={{ color: "#003366" }}>
              {profile.email}
            </Typography>
            <Typography variant="body1" sx={{ color: "#003366" }}>
              Joined: {new Date(profile.joinedDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom sx={{ color: "#00274d" }}>
          Real-time Messages
        </Typography>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
            >
              <ListItemText primary={msg} sx={{ color: "#003366" }} />
            </ListItem>
          ))}
        </List>
      </Container>
      {showNotification && (
        <Fade in={showNotification}>
          <Notification>
            <Typography variant="body1" sx={{ color: "#003366" }}>
              🎉 New Sales Message!
            </Typography>
          </Notification>
        </Fade>
      )}
    </div>
  );
};

export default UserDashboard;
