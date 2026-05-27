import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const hasSale = product.sale_price && product.sale_price < product.price;
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { token } = useAuthStore();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
      navigate('/login');
      return;
    }

    try {
      setAdding(true);
      await addToCart(product.id, 1);
      alert('Đã thêm vào giỏ hàng');
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {hasSale && (
          <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
            Giảm {Math.round((1 - product.sale_price / product.price) * 100)}%
          </div>
        )}
        <img 
          src={product.thumbnail || 'https://placehold.co/400x400?text=No+Image'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-text font-medium text-sm line-clamp-2 hover:text-primary min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2 flex flex-col min-h-[48px] justify-end">
          {hasSale ? (
            <>
              <div className="text-primary font-bold text-lg">{product.sale_price.toLocaleString('vi-VN')}đ<span className="text-sm font-normal text-text-muted">/{product.unit}</span></div>
              <div className="text-text-muted text-xs line-through">{product.price.toLocaleString('vi-VN')}đ</div>
            </>
          ) : (
            <div className="text-primary font-bold text-lg">{product.price.toLocaleString('vi-VN')}đ<span className="text-sm font-normal text-text-muted">/{product.unit}</span></div>
          )}
        </div>
        
        <Button 
          className="w-full mt-3 gap-2 py-2" 
          variant="primary"
          onClick={handleAddToCart}
          disabled={adding}
        >
          <ShoppingCart size={18} />
          {adding ? 'Đang thêm...' : 'Thêm'}
        </Button>
      </div>
    </div>
  );
}
