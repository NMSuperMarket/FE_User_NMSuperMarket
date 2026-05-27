import React from 'react';
import { ShoppingCart, User, Store, Package } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:opacity-90 transition shrink-0">
          <Store size={32} />
          <span>NMSuperMarket</span>
        </Link>

        {/* Nav links - center */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/products"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            <Package size={17} />
            Sản phẩm
          </Link>
          <Link to="/about" className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
            Giới thiệu
          </Link>
          <Link to="/careers" className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
            Tuyển dụng
          </Link>
          <Link to="/terms" className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
            Điều khoản
          </Link>
        </nav>

        {/* Right: User + Cart */}
        <div className="flex items-center gap-5 shrink-0">
          {token && user ? (
            <div className="group relative">
              <div className="flex items-center gap-2 cursor-pointer hover:text-green-100 transition-colors">
                <img src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=16a34a&color=fff'} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white/70" />
                <span className="hidden sm:inline font-medium">{user.name}</span>
              </div>
              <div className="absolute right-0 mt-2 w-52 bg-white text-text rounded-xl shadow-xl py-2 hidden group-hover:block z-50 border border-gray-100">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm">👤 Thông tin tài khoản</Link>
                <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-sm">📦 Đơn hàng của tôi</Link>
                <div className="border-t border-gray-100 my-1" />
                <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-500 font-medium text-sm">🚪 Đăng xuất</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-green-100 transition-colors">
              <User size={22} />
              <span className="hidden sm:inline font-medium text-sm">Đăng nhập</span>
            </Link>
          )}

          <Link to="/checkout" className="flex items-center gap-2 hover:text-green-100 transition-colors relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline font-medium text-sm">Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
