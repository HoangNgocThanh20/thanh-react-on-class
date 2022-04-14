import apiClient from "./apiService";

const getData = {
  getProducts() {
    return apiClient.get("products");
  },

  addProduct(data) {
    return apiClient.post("products", data);
  },

  deleteProduct(id) {
    return apiClient.delete(`products/${id}`);
  },
};

export default getData;
