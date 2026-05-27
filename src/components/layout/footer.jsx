import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tight text-primary mb-4 block"> <img src="/src/assets/logo.png" alt="" /> NMSuperMarket</Link>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              Hệ thống siêu thị mini cung cấp thực phẩm tươi sạch, nhu yếu phẩm thiết yếu. Giao hàng nhanh chóng 2h.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Chăm Sóc Khách Hàng</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="#" className="hover:text-primary transition-colors">Trung tâm hỗ trợ</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Hướng dẫn mua hàng</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Hướng dẫn thanh toán</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Về NMSuperMarket</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Tuyển dụng</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Điều khoản</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Liên Hệ</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>📍 99 Tô Hiến Thành, Sơn Trà, Đà Nẵng</li>
              <li>📞 Hotline: 0933380408</li>
              <li>✉️ Email: [EMAIL_ADDRESS]</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2026 NMSuperMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
