import { productAPI } from '../utils/api';

export const fetchProducts = async (params = {}) => {
  try {
    const response = await productAPI.getProducts(params);
    return {
      products: response.data.products || [],
      total: response.data.pagination?.totalProducts || 0,
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0, pagination: null };
  }
};