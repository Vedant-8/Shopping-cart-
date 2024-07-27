import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

function ProductList({ isAuthenticated }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const APIURL = "http://localhost:8080/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(APIURL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffffff 0%, #a3c2e1 100%)",
        padding: "20px",
        backgroundAttachment: "fixed", // Ensures the gradient stays fixed during scroll
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#00274d", // Match the homepage header color
        }}
      >
        Products
      </h2>
      <Grid container spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
