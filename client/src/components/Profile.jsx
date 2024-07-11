import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import authService from "../services/authService";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    authService.getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  if (!profile) return null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Username" secondary={profile.username} />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Profile;
