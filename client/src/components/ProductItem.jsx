import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import productService from "../services/productService";
import dummyImage from "../images/dummy.jpg"; // Import your dummy image

const ProductItem = ({ product, onAddToCart }) => {
  const handleAddToCart = async () => {
    try {
      await productService.addToCart(product.id);
      onAddToCart();
    } catch (error) {
      console.error(error);
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
            objectFit: "scale-down",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
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
