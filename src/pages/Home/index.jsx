import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

// Banner images từ Unsplash
const BANNERS = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80&fit=crop',
];

// Map tên danh mục → ảnh minh hoạ
const CAT_IMAGES = {
  'thịt': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80&fit=crop',
  'cá': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80&fit=crop',
  'rau': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80&fit=crop',
  'củ': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80&fit=crop',
  'sữa': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80&fit=crop',
  'trứng': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80&fit=crop',
  'đồ uống': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80&fit=crop',
  'nước': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80&fit=crop',
  'ăn vặt': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80&fit=crop',
  'bánh': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop',
  'gia vị': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80&fit=crop',
  'khô': 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&q=80&fit=crop',
  'mì': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80&fit=crop',
  'hải sản': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80&fit=crop',
  'trái cây': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80&fit=crop',
  'hoa quả': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80&fit=crop',
  'đông lạnh': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80&fit=crop',
  'chăm sóc': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80&fit=crop',
};

const DEFAULT_CAT_IMG = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80&fit=crop';

function getCatImage(cat) {
  if (cat.image) return cat.image;
  const nameLower = (cat.name || '').toLowerCase();
  for (const [key, url] of Object.entries(CAT_IMAGES)) {
    if (nameLower.includes(key)) return url;
  }
  return DEFAULT_CAT_IMG;
}

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
                <img src={BANNERS[0]} alt="Banner 1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                  <div className="container mx-auto px-4 md:px-12 text-white">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">Thực phẩm tươi sạch 100%</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">Mua sắm tiện lợi,<br/>Tươi ngon mỗi ngày!</h1>
                    <p className="text-lg md:text-xl mb-6 max-w-lg drop-shadow">Miễn phí giao hàng cho đơn từ 300K. Đặt ngay, giao tận tay trong 2 giờ!</p>
                    <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg text-lg">Mua Sắm Ngay</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[300px] md:h-[500px]">
                <img src={BANNERS[1]} alt="Banner 2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                  <div className="container mx-auto px-4 md:px-12 text-white">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">Flash Sale Cuối Tuần</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">Giảm tới 50%<br/>Rau củ hữu cơ</h1>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition shadow-lg text-lg">Xem Khuyến Mãi</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[300px] md:h-[500px]">
                <img src={BANNERS[2]} alt="Banner 3" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex justify-start items-center">
                  <div className="container mx-auto px-4 md:px-12 text-white">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4 inline-block">Thực phẩm cao cấp</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-md">Thịt Tươi Sống<br/>Trong Ngày</h1>
                    <p className="text-lg md:text-xl mb-6 mx-auto max-w-xl drop-shadow">Đảm bảo vệ sinh an toàn thực phẩm, nguồn gốc xuất xứ rõ ràng.</p>
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
              <Link to={`/categories/${cat.slug}`} key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer border border-gray-100 group transition-all block">
                <div className="h-24 w-full bg-gray-100 overflow-hidden relative">
                  <img
                    src={getCatImage(cat)}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = DEFAULT_CAT_IMG; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-3 text-center">
                  <div className="text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors">{cat.name}</div>
                </div>
              </Link>
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
            <Link to="/products" className="text-primary font-medium hover:underline bg-green-50 px-4 py-1.5 rounded-full text-sm">Xem tất cả</Link>
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
