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
        console.log(response); // Optional: Log the response for debugging
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="product-list">
      <h2>Products</h2>
      <Grid container spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isAuthenticated={isAuthenticated} // Pass isAuthenticated prop
          />
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
