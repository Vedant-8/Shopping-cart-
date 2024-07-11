import React from "react";
import { Typography, Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to the Shopping Cart
      </Typography>
      <Typography variant="body1">
        Browse our products and enjoy a seamless shopping experience.
      </Typography>
    </Container>
  );
};

export default HomePage;
