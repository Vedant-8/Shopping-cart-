import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate("/products");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)", // Smooth gradient from white to light blue
        padding: 0,
        margin: 0,
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          padding: 4,
          maxWidth: "sm", // Adjust width as needed
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ mb: 2, fontWeight: "bold", color: "#00274d" }}
        >
          Welcome to the Shopping Cart
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#003366" }}>
          Browse our products and enjoy a seamless shopping experience.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewProducts}
          sx={{
            background: "#007bff",
            "&:hover": {
              background: "#0056b3",
            },
            transition: "background 0.3s ease",
          }}
        >
          View Products
        </Button>
      </Container>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Almost transparent background
          color: "#00274d", // Text color
          textAlign: "center",
          padding: 2,
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease", // Smooth transition for background color
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Slightly less transparent on hover
          },
        }}
      >
        <Typography
          variant="body1" // Use a larger variant for bigger text
          sx={{ fontSize: "1.2rem", fontWeight: "bold" }} // Adjust size as needed
        >
          Made by Vedant Kulkarni
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
