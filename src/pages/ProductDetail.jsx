import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '@/api/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import useAuthStore from '@/store/authStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await client.get(`/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await client.post('/customer/cart', {
        product_id: product.id,
        quantity: quantity
      });
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary hover:underline mb-6 font-medium">
          <ArrowLeft size={20} /> Quay lại
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 flex flex-col md:flex-row gap-10">
          {/* Images */}
          <div className="md:w-1/2">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mb-4">
              <img 
                src={product.thumbnail || 'https://placehold.co/600x600'} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-lg border border-gray-200 cursor-pointer overflow-hidden">
                    <img src={img.url} alt={`gallery-${idx}`} className="w-full h-full object-cover hover:opacity-80" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="mb-2 text-sm text-primary font-medium">{product.category?.name}</div>
            <h1 className="text-3xl font-bold text-text mb-2">{product.name}</h1>
            <div className="text-gray-500 mb-6 flex items-center gap-4">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span>Thương hiệu: {product.brand || 'Đang cập nhật'}</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
              {product.sale_price ? (
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-extrabold text-red-500">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.sale_price)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                    -{Math.round((1 - product.sale_price / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-extrabold text-primary">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </span>
              )}
              <div className="text-gray-500 mt-2">Đơn vị tính: {product.unit}</div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-text mb-4">Số lượng</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center py-2 focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >+</button>
                </div>
                <span className="text-sm text-gray-500">
                  Kho: {product.inventory?.quantity || 0} sản phẩm
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1 flex justify-center items-center gap-2 py-3 text-lg" disabled={addingToCart}>
                <ShoppingCart size={20} /> 
                {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
              </Button>
              <Button variant="outline" className="px-4">
                <Heart size={24} className="text-gray-500 hover:text-red-500" />
              </Button>
            </div>

            {/* Description */}
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h3 className="text-lg font-bold mb-4">Mô tả sản phẩm</h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description || 'Chưa có mô tả cho sản phẩm này.'}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
