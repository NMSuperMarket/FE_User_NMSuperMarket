import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CategoryNav from '../components/layout/CategoryNav';
import { ShieldCheck, Leaf, Truck, Star, Users, MapPin } from 'lucide-react';

const VALUES = [
  {
    icon: <Leaf size={32} className="text-green-600" />,
    title: 'Tươi sạch, an toàn',
    desc: 'Tất cả sản phẩm đều được kiểm định chất lượng, đảm bảo nguồn gốc xuất xứ rõ ràng.',
  },
  {
    icon: <Truck size={32} className="text-blue-600" />,
    title: 'Giao hàng nhanh 2h',
    desc: 'Đội ngũ giao hàng chuyên nghiệp, đảm bảo thực phẩm tươi ngon đến tay bạn trong 2 giờ.',
  },
  {
    icon: <ShieldCheck size={32} className="text-orange-500" />,
    title: 'Đảm bảo chất lượng',
    desc: 'Cam kết hoàn tiền 100% nếu sản phẩm không đạt chất lượng như mô tả.',
  },
  {
    icon: <Star size={32} className="text-yellow-500" />,
    title: 'Khách hàng là trên hết',
    desc: 'Đội ngũ chăm sóc khách hàng 24/7, sẵn sàng hỗ trợ mọi thắc mắc của bạn.',
  },
];

const MILESTONES = [
  { year: '2020', title: 'Thành lập', desc: 'NMSuperMarket ra đời với sứ mệnh mang thực phẩm sạch đến mọi gia đình.' },
  { year: '2021', title: 'Mở rộng', desc: 'Ra mắt nền tảng mua sắm trực tuyến, phục vụ hàng nghìn khách hàng mỗi ngày.' },
  { year: '2023', title: 'Tăng trưởng', desc: 'Đạt 50.000+ đơn hàng, mở rộng danh mục lên 1.000+ sản phẩm.' },
  { year: '2025', title: 'Hiện tại', desc: 'Đang phục vụ khắp thành phố Đà Nẵng với đội ngũ 50+ nhân viên tận tâm.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80&fit=crop"
            alt="NMSuperMarket"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-white">
          <span className="bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 inline-block">
            Về chúng tôi
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-2xl">
            Chúng tôi mang<br />
            <span className="text-green-300">Tươi ngon</span> đến tay bạn
          </h1>
          <p className="text-lg text-green-100 max-w-xl mb-8 leading-relaxed">
            NMSuperMarket là hệ thống siêu thị mini hiện đại tại Đà Nẵng, chuyên cung cấp
            thực phẩm tươi sạch và nhu yếu phẩm thiết yếu với dịch vụ giao hàng nhanh chóng.
          </p>
          <Link to="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg">
            Mua sắm ngay →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '50.000+', label: 'Đơn hàng thành công' },
              { num: '1.000+', label: 'Sản phẩm đa dạng' },
              { num: '2h', label: 'Giao hàng nhanh nhất' },
              { num: '50+', label: 'Nhân viên tận tâm' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold text-green-600 mb-1">{s.num}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Sứ mệnh</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6 leading-tight">
              Kết nối người tiêu dùng với<br />nguồn thực phẩm chất lượng
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Chúng tôi tin rằng mỗi gia đình xứng đáng được tiếp cận với thực phẩm tươi ngon,
              an toàn và tiện lợi. NMSuperMarket ra đời để hiện thực hóa điều đó — với nền tảng
              công nghệ hiện đại và đội ngũ tận tâm.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Từ rau củ hữu cơ, thịt cá tươi sống đến đồ dùng hàng ngày, chúng tôi đảm bảo
              mỗi sản phẩm đều được kiểm soát chặt chẽ trước khi đến tay khách hàng.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&q=80&fit=crop"
              alt="Sứ mệnh"
              className="rounded-3xl shadow-2xl w-full object-cover h-80"
            />
            <div className="absolute -bottom-4 -left-4 bg-green-600 text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold">5+</div>
              <div className="text-sm text-green-100">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Giá trị cốt lõi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Cam kết của chúng tôi</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Hành trình</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Những cột mốc đáng nhớ</h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-green-200 hidden md:block" />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="text-green-600 font-bold text-xl mb-1">{m.year}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-600 border-4 border-white shadow-md flex items-center justify-center shrink-0 z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <MapPin size={40} className="mx-auto mb-4 text-green-200" />
          <h2 className="text-3xl font-extrabold mb-3">Tìm chúng tôi ở đâu?</h2>
          <p className="text-green-100 text-lg mb-2">99 Tô Hiến Thành, Sơn Trà, Đà Nẵng</p>
          <p className="text-green-100 mb-6">Hotline: <strong>0933 380 408</strong> · Mở cửa 7:00 – 22:00 mỗi ngày</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/products"
              className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg">
              Mua sắm trực tuyến
            </Link>
            <Link to="/careers"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              Gia nhập đội ngũ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
