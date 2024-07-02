import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);

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
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
