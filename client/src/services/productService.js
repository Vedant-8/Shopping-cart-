import axios from "axios";

class ProductService {
  getAllProducts() {
    return axios.get("http://localhost:8080/api/products");
  }

  // Assuming you want to add functionality to update products, you can extend the service as follows:
  updateProduct(id, updatedProduct) {
    return axios.put(
      `http://localhost:8080/api/products/${id}`,
      updatedProduct
    );
  }

  // Adding new product functionality if needed
  addProduct(newProduct) {
    return axios.post("http://localhost:8080/api/products", newProduct);
  }
}

export default new ProductService();
