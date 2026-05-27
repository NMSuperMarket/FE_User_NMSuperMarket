import React from 'react';
import { ShoppingCart, Search, User, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import client from '@/api/client';

export default function Header() {
  const { user, token, logout } = useAuthStore();
  const { totalItems, fetchCart } = useCartStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await client.post('/logout');
    } catch (e) {
      console.error(e);
    }
    logout();
    navigate('/login');
  };
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:opacity-90 transition">
          <Store size={32} />
          <span>NMSuperMarket</span>
        </Link>
        
        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm, danh mục..." 
            className="w-full pl-4 pr-10 py-2 rounded-full text-text focus:outline-none shadow-inner"
          />
          <Search className="absolute right-4 top-2.5 text-gray-400 cursor-pointer" size={20} />
        </div>

        <div className="flex items-center gap-6">
          {token && user ? (
            <div className="group relative">
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-100 transition-colors">
                <img src={user.avatar || 'https://via.placeholder.com/40'} alt="Avatar" className="w-8 h-8 rounded-full border border-white" />
                <span className="hidden sm:inline font-medium">{user.name}</span>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white text-text rounded-md shadow-lg py-2 hidden group-hover:block z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Thông tin tài khoản</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Đơn hàng của tôi</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 font-medium">Đăng xuất</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <User size={24} />
              <span className="hidden sm:inline font-medium">Đăng nhập</span>
            </Link>
          )}
          <Link to="/checkout" className="flex items-center gap-2 hover:text-green-100 transition-colors relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline font-medium">Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
