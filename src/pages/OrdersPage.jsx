import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useAuthStore from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';

export default function OrdersPage() {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Đơn hàng của tôi</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Bạn chưa có đơn hàng nào</h2>
          <p className="text-gray-500 mb-6">Hãy khám phá các sản phẩm tươi ngon của chúng tôi ngay hôm nay!</p>
          <Link to="/" className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition shadow-md">
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
