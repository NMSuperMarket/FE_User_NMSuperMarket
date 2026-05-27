import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNav from '@/components/layout/CategoryNav';
import ProductCard from '@/components/customer/ProductCard';
import { useProductStore } from '@/store/productStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
  const { products, categories, fetchProducts, fetchCategories, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const featuredProducts = products.filter(p => p.is_featured);
  const flashSaleProducts = products.filter(p => p.sale_price);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        {/* Hero Banner Slider */}
        <section className="mb-8">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="w-full"
          >
            <SwiperSlide>
              <div className="relative w-full h-[300px] md:h-[500px]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" alt="Banner 1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-4 md:px-12 text-white">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">Thực phẩm tươi sạch 100%</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Mua sắm tiện lợi,<br/>Tươi ngon mỗi ngày!</h1>
                    <p className="text-lg md:text-xl mb-6 max-w-lg">Miễn phí giao hàng cho đơn từ 300K. Đặt ngay, giao tận tay trong 2 giờ!</p>
                    <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg text-lg">Mua Sắm Ngay</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[300px] md:h-[500px]">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1600" alt="Banner 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-4 md:px-12 text-white">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">Flash Sale Cuối Tuần</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Giảm tới 50%<br/>Rau củ hữu cơ</h1>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition shadow-lg text-lg">Xem Khuyến Mãi</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[300px] md:h-[500px]">
                <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1600" alt="Banner 3" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center text-center items-center">
                  <div className="container mx-auto px-4 text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Thịt Tươi Sống Trong Ngày</h1>
                    <p className="text-lg md:text-xl mb-6 mx-auto max-w-xl">Đảm bảo vệ sinh an toàn thực phẩm, nguồn gốc xuất xứ rõ ràng.</p>
                    <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg text-lg">Mua Ngay</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* Quick Categories */}
        <section className="container mx-auto px-4 mb-12 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-green-500 pl-3">Danh Mục Sản Phẩm</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(0, 8).map(cat => (
              <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer border border-gray-100 group transition-all">
                <div className="h-24 w-full bg-gray-100 overflow-hidden relative">
                  <img src={cat.image || `https://ui-avatars.com/api/?name=${cat.name}&background=random&size=200`} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors">{cat.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sale */}
        {flashSaleProducts.length > 0 && (
          <section className="container mx-auto px-4 mb-12">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                    ⚡ FLASH SALE
                  </h2>
                  <span className="text-sm text-red-500 font-medium hidden sm:inline">Giảm giá cực sốc mỗi ngày!</span>
                </div>
                <div className="text-sm font-bold bg-white text-red-600 px-4 py-2 rounded-full shadow-sm border border-red-100 w-max">
                  ⏳ Kết thúc trong: 23:59:59
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {flashSaleProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Sản Phẩm Nổi Bật</h2>
            <button className="text-primary font-medium hover:underline bg-green-50 px-4 py-1.5 rounded-full text-sm">Xem tất cả</button>
          </div>
          {isLoading ? (
            <div className="text-center py-20 text-text-muted">Đang tải sản phẩm...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
