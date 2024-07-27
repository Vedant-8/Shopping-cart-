import axios from "axios";

class ProductService {
  getAllProducts() {
    return axios.get("http://localhost:8080/api/products");
  }

  updateProduct(id, updatedProduct) {
    return axios.put(
      `http://localhost:8080/api/products/${id}`,
      updatedProduct
    );
  }

  addProduct(newProduct) {
    return axios.post("http://localhost:8080/api/products", newProduct);
  }
}

export default new ProductService();
