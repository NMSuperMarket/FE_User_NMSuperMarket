import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import client from '@/api/client';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalItems, fetchCart, clearCart } = useCartStore();
  const { token, user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shipping_name: user?.name || '',
    shipping_phone: user?.phone || '',
    shipping_address: '',
    shipping_province: '',
    shipping_district: ''
  });

  useEffect(() => {
    if (!token) {
      alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
      navigate('/login');
    } else {
      fetchCart();
    }
  }, [token]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 300000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        payment_method: paymentMethod
      };

      const res = await client.post('/customer/checkout', payload);

      if (res.data.success) {
        clearCart();
        const orderCode = res.data.data.order_code;

        if (paymentMethod === 'cod') {
          navigate(`/payment/return?status=success&order_code=${orderCode}`);
        } else {
          alert('Chuyển hướng cổng thanh toán (Giả lập)');
          setTimeout(() => {
            navigate(`/payment/return?status=success&order_code=${orderCode}`);
          }, 1000);
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Đã xảy ra lỗi khi tạo đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text mb-8">Thanh Toán</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl shadow-sm">
            <h2 className="text-xl mb-4">Giỏ hàng của bạn đang trống</h2>
            <Button onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-8">
              <section className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                <h2 className="text-xl font-bold text-text mb-4">Thông tin giao hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Họ và tên" name="shipping_name" value={formData.shipping_name} onChange={handleChange} placeholder="Nguyễn Văn A" required />
                  <Input label="Số điện thoại" name="shipping_phone" value={formData.shipping_phone} onChange={handleChange} placeholder="0901234567" required />
                  <Input label="Địa chỉ chi tiết" name="shipping_address" value={formData.shipping_address} onChange={handleChange} className="md:col-span-2" placeholder="Số nhà, Tên đường..." required />
                  <Input label="Tỉnh/Thành phố" name="shipping_province" value={formData.shipping_province} onChange={handleChange} placeholder="TP. Hồ Chí Minh" required />
                  <Input label="Quận/Huyện" name="shipping_district" value={formData.shipping_district} onChange={handleChange} placeholder="Quận 1" required />
                </div>
              </section>

              <section className="bg-surface p-6 rounded-2xl shadow-sm border border-border">
                <h2 className="text-xl font-bold text-text mb-4">Phương thức thanh toán</h2>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-green-50' : 'border-border hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-primary" />
                    <span className="ml-3 font-medium flex-1">Thanh toán khi nhận hàng (COD)</span>
                    <span className="text-xl">💵</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'vnpay' ? 'border-primary bg-green-50' : 'border-border hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="vnpay" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="w-5 h-5 text-primary" />
                    <span className="ml-3 font-medium flex-1">Thanh toán qua VNPay</span>
                    <span className="text-xl font-bold text-blue-600">VNPAY</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'momo' ? 'border-primary bg-green-50' : 'border-border hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="w-5 h-5 text-primary" />
                    <span className="ml-3 font-medium flex-1">Thanh toán qua ví MoMo</span>
                    <span className="text-xl font-bold text-pink-600">MoMo</span>
                  </label>
                </div>
              </section>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border sticky top-24">
                <h2 className="text-xl font-bold text-text mb-4">Tóm tắt đơn hàng ({totalItems} SP)</h2>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.product?.thumbnail} alt={item.product?.name} className="w-16 h-16 object-cover rounded-lg border" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-2">{item.product?.name}</h4>
                        <div className="text-sm text-text-muted">SL: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-primary">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-text-muted">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Phí giao hàng</span>
                    <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-text pt-2 mt-2 border-t border-border">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full mt-6 text-lg py-3 shadow-md" variant="primary">
                  {loading ? 'Đang xử lý...' : 'Đặt Hàng Ngay'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
