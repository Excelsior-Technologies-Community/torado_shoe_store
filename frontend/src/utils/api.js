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
  getFilterOptions: () => api.get("/products/filters"),

  getProducts: (params = {}) => api.get("/products", { params }),

  getProductById: (id) => api.get(`/products/${id}`),

  createProduct: (formData) =>
    api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateProduct: (id, formData) =>
    api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Image for products
export const imageAPI = {
  // Get image URL
  getImageUrl: (imagePath) =>
    imagePath ? `http://localhost:5000/${imagePath}` : null,
};

export const testimonialsAPI = {
  getTestimonials: (params = {}) => api.get("/testimonials", { params }),

  getTestimonialById: (id) => api.get(`/testimonials/${id}`),

  createTestimonial: (formData) =>
    api.post("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateTestimonial: (id, formData) =>
    api.put(`/testimonials/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateTestimonialStatus: (id, status) =>
    api.patch(`/testimonials/${id}/status`, { status }),

  toggleFeatured: (id) => api.patch(`/testimonials/${id}/featured`),

  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
};

export default api;
