import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderCode = searchParams.get('order_code');
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="bg-surface p-8 md:p-12 rounded-3xl shadow-lg border border-border text-center max-w-lg w-full mx-4">
          {isSuccess ? (
            <>
              <CheckCircle size={80} className="text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-text mb-2">Đặt hàng thành công!</h1>
              <p className="text-text-muted mb-6">Cảm ơn bạn đã mua sắm tại NMSuperMarket. Mã đơn hàng của bạn là <strong className="text-primary">{orderCode}</strong>.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/orders" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full">Xem đơn hàng</Button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full">Tiếp tục mua sắm</Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <XCircle size={80} className="text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-text mb-2">Thanh toán thất bại</h1>
              <p className="text-text-muted mb-6">Đã có lỗi xảy ra trong quá trình thanh toán cho đơn hàng <strong className="text-text">{orderCode}</strong>. Vui lòng thử lại.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/checkout" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full">Thử lại</Button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full">Về trang chủ</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
