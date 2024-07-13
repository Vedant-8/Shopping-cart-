// cartService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

const addToCart = async (productId) => {
  try {
    const response = await axios.post(API_URL, { productId });
    console.log("Product added to cart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

const getCart = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Cart retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
    console.log("Product removed from cart:", productId);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export default {
  addToCart,
  getCart,
  removeFromCart,
};
