// import React from "react";

// function ProductItem({ product }) {
//   return (
//     <div className="product-item">
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price}</p>
//       <p>Stock: {product.stock}</p>
//     </div>
//   );
// }

// export default ProductItem;
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import productService from "../services/productService";

const ProductItem = ({ product, onAddToCart }) => {
  const handleAddToCart = async () => {
    try {
      await productService.addToCart(product.id);
      onAddToCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.stock}
        </Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
