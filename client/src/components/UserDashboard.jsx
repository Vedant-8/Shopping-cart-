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
  Button,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import authService from "../services/authService";
import WebSocketService from "../services/webSocketService";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const Notification = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: 20,
  right: 20,
  width: 300,
  padding: 16,
  boxShadow: theme.shadows[3],
  borderRadius: 8,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  zIndex: 1300,
  transition: "opacity 0.5s ease-in-out",
}));

const UserDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    authService.getProfile().then((data) => {
      setProfile(data);
      setEditedProfile(data);
    });

    const webSocketService = new WebSocketService((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await authService.updateProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
          <Avatar
            alt={profile?.username}
            src={profile?.profileImage || ""}
            sx={{
              width: 100,
              height: 100,
              cursor: isEditing ? "pointer" : "default",
            }}
            onClick={isEditing ? () => {} : undefined}
          />
          <Box>
            {isEditing ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={editedProfile.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  name="number"
                  value={editedProfile.number}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom sx={{ color: "#00274d" }}>
                  {profile.username}
                </Typography>
                <Typography variant="h6" sx={{ color: "#003366" }}>
                  {profile.email}
                </Typography>
                <Typography variant="body1" sx={{ color: "#003366" }}>
                  Phone Number: {profile.number}
                </Typography>
              </>
            )}
            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={isEditing ? handleSaveProfile : handleEditToggle}
                sx={{ borderRadius: 0 }}
              >
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleEditToggle}
                  sx={{ borderRadius: 0 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
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
