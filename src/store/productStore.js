import { create } from 'zustand';
import client from '../api/client';

export const useProductStore = create((set) => ({
  products: [],
  categories: [],
  isLoading: false,
  fetchProducts: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await client.get('/products', { params });
      // API Laravel paginate returns data in response.data.data.data 
      // but in ProductController we used `paginate(12)` which means `data.data.data` is the array.
      // Let's handle both cases.
      const productsData = response.data.data.data || response.data.data;
      set({ products: productsData, isLoading: false });
    } catch (error) {
      console.error('Lỗi khi fetch sản phẩm:', error);
      set({ isLoading: false });
    }
  },
  fetchCategories: async () => {
    try {
      const response = await client.get('/categories');
      set({ categories: response.data.data });
    } catch (error) {
      console.error('Lỗi khi fetch danh mục:', error);
    }
  }
}));
