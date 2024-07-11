import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import authService from "../services/authService";
import WebSocketService from "../services/webSocketService";

const UserDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authService.getProfile().then((data) => {
      setProfile(data);
    });

    const webSocketService = new WebSocketService((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  if (!profile) return null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="h6">Welcome, {profile.username}</Typography>
      <Typography variant="h5" gutterBottom>
        Real-time Messages
      </Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserDashboard;
