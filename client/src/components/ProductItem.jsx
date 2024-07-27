import React from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dummyImage from "../images/dummy.jpg";
import StarRatings from "react-star-ratings"; 

const ProductItem = ({ isAuthenticated, product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please log in to add products to the cart.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/cart",
        { productId: product.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.7)", 
          transition: "transform 0.3s ease-in-out, background-color 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          minWidth: 240,
          maxWidth: 320, 
          margin: "auto",
        }}
      >
        <img
          src={dummyImage}
          alt={product.name}
          style={{
            objectFit: "contain",
            height: 180, 
            width: "100%",
            cursor: "pointer",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          onClick={handleProductClick}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.brand} {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Size: {product.size}
          </Typography>
          <StarRatings
            rating={product.rating}
            starRatedColor="blue"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
            name="rating"
          />
          <Typography variant="body1" gutterBottom>
            Price: ${product.price}
          </Typography>
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
