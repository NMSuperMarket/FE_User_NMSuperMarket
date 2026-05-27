import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import useAuthStore from '../store/authStore';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Thông tin tài khoản</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 mb-4">
              <img src={user?.avatar || 'https://ui-avatars.com/api/?name=' + (user?.name || 'User') + '&background=random'} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="text-green-600 font-medium hover:underline text-sm">Thay đổi ảnh đại diện</button>
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Họ và tên</label>
                <div className="font-medium text-lg">{user?.name}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Username</label>
                <div className="font-medium text-lg">@{user?.username || 'Chưa thiết lập'}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <div className="font-medium text-lg">{user?.email}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Số điện thoại</label>
                <div className="font-medium text-lg">{user?.phone || 'Chưa thiết lập'}</div>
              </div>
            </div>
            
            <div className="pt-6 mt-4 border-t border-gray-100 flex gap-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">Cập nhật thông tin</button>
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">Đổi mật khẩu</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
