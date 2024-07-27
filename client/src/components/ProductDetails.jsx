// src/components/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import StarRatings from "react-star-ratings";
import dummyImage from "../images/dummy.jpg"; // Update with actual image path

const ProductDetails = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!product) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          borderRadius: 8,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly more opaque
          maxWidth: 1200,
          width: "90%", // Adjust for responsiveness
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          image={dummyImage} // Replace with product image URL
          alt={product.name}
          sx={{
            objectFit: "contain",
            height: "auto",
            maxWidth: 400,
            borderRadius: 8,
            marginRight: 2,
          }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.brand}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Size:</strong> {product.size}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <StarRatings
              rating={product.rating}
              starRatedColor="blue"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              name="rating"
            />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            <strong>Price:</strong> ${product.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ marginTop: 2, borderRadius: 0 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
