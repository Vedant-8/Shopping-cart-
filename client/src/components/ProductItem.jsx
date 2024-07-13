import React from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dummyImage from "../images/dummy.jpg"; // Import your dummy image

const ProductItem = ({ product, isAuthenticated }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleProductClick = () => {
    navigate(`/product/${product.id}`); // Navigate to product detail page using product ID
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please log in to add products to the cart.");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/cart/add`, {
        productId: product.id,
      });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          minWidth: 250, // Adjusted minimum width
          margin: "auto", // Center align within Grid item
        }}
      >
        <img
          src={dummyImage}
          alt={product.name}
          style={{
            objectFit: "contain",
            height: 150,
            width: "100%", // Ensure full width
            cursor: "pointer",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          onClick={handleProductClick}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.brand}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Size: {product.size}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Rating: {product.rating.toFixed(1)}
          </Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          sx={{ borderRadius: 0 }}
        >
          Add to Cart
        </Button>
      </Card>
    </Grid>
  );
};

export default ProductItem;
