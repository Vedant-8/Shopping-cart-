import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import cartService from "../services/cartService";
import emptyCartImage from "../images/empty-cart.png";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData.products || []);
      calculateTotalPrice(cartData.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotalPrice = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Please log in to checkout.");
      navigate("/login");
      return;
    }

    // Implement checkout logic here
    // Example: Call cartService to initiate checkout process
    try {
      // await cartService.checkout();
      alert("Checkout successful!");
      setCart([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {cart.length === 0 ? (
          <Card sx={{ padding: 2 }}>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              style={{
                objectFit: "contain",
                height: 150,
                width: "100%", // Ensure full width
                cursor: "pointer",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            <CardContent>
              <Typography variant="body1" align="center">
                Your cart is empty.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <List>
            {cart.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`$${product.price}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1">${totalPrice}</Typography>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </ListItem>
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default Cart;
