import React from "react";
import { Container, Typography, Box } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">Admin functionalities go here.</Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
