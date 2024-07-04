import React from "react";
import { Container, Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome to the Shopping Website
        </Typography>
        <Typography variant="h5">
          Browse our products and enjoy shopping!
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
