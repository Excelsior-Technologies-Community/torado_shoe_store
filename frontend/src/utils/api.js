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

//user apis
export const authAPI = {
  register: (userData) => api.post("/users/register", userData),
  login: (credentials) => api.post("/users/login", credentials),
};

//team member apis
export const TeamMemberAPI = {
  getTeamMembers: (params = {}) => api.get("/team-members", { params }),
  getTeamMemberById: (id) => api.get(`/team-members/${id}`),
  createTeamMember: (formData) =>
    api.post("/team-members", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateTeamMember: (id, formData) =>
    api.put(`/team-members/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateTeamMemberStatus: (id, status) =>
    api.patch(`/team-members/${id}/status`, { status }),
  deleteTeamMember: (id) => api.delete(`/team-members/${id}`),
};

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

export const TestimonialImageAPi = {
  getTestimonialImage: (imagePath) =>
    imagePath ? `http://localhost:5000/${imagePath}` : null,
};

export const reviewAPI = {
  createReview: (data) => api.post("/reviews", data),
  getProductReviews: (productId, params = {}) =>
    api.get(`/reviews/product/${productId}`, { params }),
  approveReview: (id) => api.patch(`/reviews/${id}/approve`),
};

export const blogsAPI = {
  // Blog CRUD
  getBlogs: (params = {}) => api.get("/blogs", { params }),
  getPublishedBlogs: (params = {}) => api.get("/blogs/published", { params }),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  getBlogBySlug: (slug) => api.get(`/blogs/slug/${slug}`),

  createBlog: (formData) =>
    api.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  createBlogJSON: (data) => api.post("/blogs/json", data),

  updateBlog: (id, formData) =>
    api.put(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateBlogJSON: (id, data) => api.put(`/blogs/${id}/json`, data),

  deleteBlog: (id) => api.delete(`/blogs/${id}`),

  // Blog Images
  getBlogImages: (id) => api.get(`/blogs/${id}/images`),
  addBlogImage: (id, data) => api.post(`/blogs/${id}/images`, data),
  uploadBlogImage: (id, formData) =>
    api.post(`/blogs/${id}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteBlogImage: (blogId, imageId) =>
    api.delete(`/blogs/${blogId}/images/${imageId}`),

  // Blog Comments
  getBlogComments: (id) => api.get(`/blogs/${id}/comments`),
  getAllComments: (id) => api.get(`/blogs/${id}/all-comments`),
  addComment: (id, data) => api.post(`/blogs/${id}/comments`, data),
  updateCommentStatus: (blogId, commentId, status) =>
    api.put(`/blogs/${blogId}/comments/${commentId}`, { status }),
  deleteComment: (blogId, commentId) =>
    api.delete(`/blogs/${blogId}/comments/${commentId}`),
};

export const faqAPI = {
  // Categories
  getCategories: () => api.get("/faqs/categories"),
  createCategory: (data) => api.post("/faqs/categories", data),
  updateCategory: (id, data) => api.put(`/faqs/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/faqs/categories/${id}`),

  // FAQs
  getFaqs: () => api.get("/faqs"),
  getFaqsByCategory: (categoryId) => api.get(`/faqs/category/${categoryId}`),
  getFaqById: (id) => api.get(`/faqs/${id}`),
  createFaq: (data) => api.post("/faqs", data),
  updateFaq: (id, data) => api.put(`/faqs/${id}`, data),
  deleteFaq: (id) => api.delete(`/faqs/${id}`),
};

export default api;
