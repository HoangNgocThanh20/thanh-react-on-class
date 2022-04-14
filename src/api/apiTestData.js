import apiClient from "./apiService";

const handleApi = {
  getProducts() {
    return apiClient.get("products");
  },

  addProduct(product) {
    return apiClient.post("products", product);
  },

  deleteProduct(id) {
    return apiClient.delete(`products/${id}`);
  },

  updateProduct(id, product) {
    return apiClient.put(`products/${id}`, product);
  },

  searchProduct(params) {
    return apiClient.get(`products/?name=${params}`);
  },

  login() {
    return apiClient.get("accounts");
  },

  register(account) {
    return apiClient.post("accounts", account);
  },
};

export default handleApi;
