import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Get filter options
  getFilterOptions: () => api.get('/products/filters'),
  
  // Get all products with filters
  getProducts: (params = {}) => api.get('/products', { params }),
  
  // Get single product by ID
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Create new product
  createProduct: (formData) => api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Update product
  updateProduct: (id, formData) => api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Delete product
  deleteProduct: (id) => api.delete(`/products/${id}`)
};

// Image API functions
export const imageAPI = {
  // Get image URL
  getImageUrl: (imagePath) => imagePath ? `http://localhost:5000/${imagePath}` : null
};

export default api;
