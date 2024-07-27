import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const cartService = {
  addToCart: async (productId) => {
    try {
      const response = await axios.post(
        API_URL,
        { productId },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`, getAuthHeaders());
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw error;
    }
  },

  checkout: async () => {
    try {
      await axios.post(`${API_URL}/checkout`, {}, getAuthHeaders());
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  },
};

export default cartService;
