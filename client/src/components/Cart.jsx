import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import cartService from "../services/cartService";
import dummyImage from "../images/dummy.jpg";
import emptyCartImage from "../images/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const cartData = await cartService.getCart();
      if (cartData && cartData.products) {
        setCart(cartData);
      } else {
        console.log("Cart data is missing or products is not an array");
        setCart({ products: [] });
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to fetch cart. Please try again.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      fetchCart();
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setError("Failed to remove product from cart.");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCheckout = () => {
    alert("Checkout successfully done!");
  };

  const calculateTotal = () => {
    return cart.products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <Container
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)",
        padding: "20px",
        boxSizing: "border-box",
        color: "#003366",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {cart ? (
        cart.products && cart.products.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {cart.products.map((product) => (
                  <Grid item xs={12} sm={6} key={product.id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 8,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                        minWidth: 250,
                        margin: "auto",
                      }}
                    >
                      <img
                        src={dummyImage}
                        alt={product.name}
                        style={{
                          objectFit: "contain",
                          height: 150,
                          width: "100%",
                          cursor: "pointer",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                        onClick={() => handleProductClick(product.id)}
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
                        <Typography variant="body1">
                          Price: ${product.price}
                        </Typography>
                      </CardContent>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleRemoveFromCart(product.id)}
                        sx={{ borderRadius: 0 }}
                      >
                        Remove from Cart
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 8,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  padding: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 1 }} />
                {cart.products.map((product) => (
                  <Box key={product.id} sx={{ mb: 1 }}>
                    <Typography variant="body1">{product.name} x 1</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{ marginTop: 2 }}
                >
                  Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              style={{ width: "200px", height: "auto" }}
            />
            <Typography variant="h6" color="#003366">
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/products")}
              sx={{ marginTop: 2 }}
            >
              Continue Shopping
            </Button>
          </div>
        )
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default Cart;
