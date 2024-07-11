import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
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
      <Typography variant="h6">Username: {profile.username}</Typography>
      <Typography variant="h6">Role: {profile.role}</Typography>
    </Container>
  );
};

export default Profile;
