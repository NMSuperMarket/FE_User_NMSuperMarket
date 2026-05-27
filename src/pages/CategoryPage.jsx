import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CategoryNav from '../components/layout/CategoryNav';
import ProductCard from '../components/customer/ProductCard';
import { useProductStore } from '../store/productStore';

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, categories, fetchProducts, fetchCategories, isLoading } = useProductStore();
  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && slug) {
      const foundCat = categories.find(c => c.slug === slug);
      if (foundCat) {
        setCategory(foundCat);
        setCategoryProducts(products.filter(p => p.category_id === foundCat.id));
      } else {
        // Fallback if category not found
        setCategory({ name: 'Danh mục không tồn tại' });
      }
    }
  }, [slug, categories, products]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <CategoryNav />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-green-600">Trang chủ</button>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">{category?.name || 'Đang tải...'}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          {category?.icon} {category?.name}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoryProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-gray-400 mb-4 text-5xl">🛒</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
            <p className="text-gray-500 mb-6">Chúng tôi đang cập nhật thêm sản phẩm cho danh mục này.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
