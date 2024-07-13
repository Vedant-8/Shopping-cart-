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
} from "@mui/material";
import dummyImage from "../images/dummy.jpg";

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
      await axios.post(`http://localhost:8080/api/cart`, { productId: id });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Card sx={{ display: "flex", marginTop: 2 }}>
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
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
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
          <Typography variant="body1" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ marginTop: 2 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
