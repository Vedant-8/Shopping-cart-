import axios from "axios";

class ProductService {
  getAllProducts() {
    return axios.get("http://localhost:8080/api/products");
  }
}

export default new ProductService();
