import { create } from 'zustand';
import client from '../api/client';
import useAuthStore from './authStore';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  cartId: null,
  totalItems: 0,
  isLoading: false,

  fetchCart: async () => {
    // Only fetch if user is logged in
    if (!useAuthStore.getState().token) return;

    set({ isLoading: true });
    try {
      const res = await client.get('/customer/cart');
      if (res.data.success) {
        set({ 
          cartItems: res.data.data.items, 
          cartId: res.data.data.cart_id,
          totalItems: res.data.data.total_items,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Lỗi khi fetch giỏ hàng:', error);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    if (!useAuthStore.getState().token) {
      throw new Error('Vui lòng đăng nhập');
    }

    try {
      await client.post('/customer/cart', { product_id: productId, quantity });
      // Refresh cart
      get().fetchCart();
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ:', error);
      throw error;
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    try {
      await client.put(`/customer/cart/${cartItemId}`, { quantity });
      get().fetchCart();
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      throw error;
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      await client.delete(`/customer/cart/${cartItemId}`);
      get().fetchCart();
    } catch (error) {
      console.error('Lỗi khi xóa khỏi giỏ:', error);
      throw error;
    }
  },
  
  clearCart: () => {
    set({ cartItems: [], totalItems: 0, cartId: null });
  }
}));
