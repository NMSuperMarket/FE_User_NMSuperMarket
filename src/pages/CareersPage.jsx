import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CategoryNav from '../components/layout/CategoryNav';
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Send } from 'lucide-react';

const JOBS = [
  {
    id: 1,
    title: 'Nhân Viên Bán Hàng',
    dept: 'Kinh doanh',
    type: 'Toàn thời gian',
    location: 'Sơn Trà, Đà Nẵng',
    salary: '6 – 9 triệu',
    desc: 'Chúng tôi tìm kiếm nhân viên bán hàng nhiệt tình, năng động, sẵn sàng phục vụ khách hàng với thái độ chuyên nghiệp.',
    requirements: [
      'Tốt nghiệp THPT trở lên',
      'Có kinh nghiệm bán lẻ là một lợi thế',
      'Giao tiếp tốt, thân thiện với khách hàng',
      'Sẵn sàng làm ca xoay',
    ],
    benefits: ['Lương cơ bản + thưởng KPI', 'BHXH đầy đủ', 'Cơm ca miễn phí', 'Môi trường trẻ, năng động'],
  },
  {
    id: 2,
    title: 'Nhân Viên Giao Hàng',
    dept: 'Vận chuyển',
    type: 'Toàn thời gian / Bán thời gian',
    location: 'Toàn thành phố Đà Nẵng',
    salary: '7 – 12 triệu',
    desc: 'Tham gia đội ngũ giao hàng chuyên nghiệp, đảm bảo thực phẩm tươi ngon đến tay khách hàng trong 2 giờ.',
    requirements: [
      'Có xe máy, GPLX hạng A',
      'Biết đường tại Đà Nẵng',
      'Chịu khó, đúng giờ',
      'Sức khỏe tốt',
    ],
    benefits: ['Thu nhập hấp dẫn theo đơn hàng', 'Hỗ trợ xăng xe', 'Thưởng theo hiệu suất', 'Giờ làm linh hoạt'],
  },
  {
    id: 3,
    title: 'Lập Trình Viên Frontend',
    dept: 'Công nghệ',
    type: 'Toàn thời gian',
    location: 'Remote / Đà Nẵng',
    salary: '15 – 25 triệu',
    desc: 'Xây dựng và phát triển giao diện người dùng cho nền tảng thương mại điện tử của NMSuperMarket.',
    requirements: [
      'Thành thạo ReactJS / Next.js',
      'Hiểu biết về REST API, Zustand, TailwindCSS',
      '1+ năm kinh nghiệm thực tế',
      'Tư duy sáng tạo về UI/UX',
    ],
    benefits: ['Lương cạnh tranh theo năng lực', 'Remote linh hoạt', 'Thiết bị làm việc được hỗ trợ', 'Cơ hội phát triển nhanh'],
  },
  {
    id: 4,
    title: 'Chuyên Viên Marketing',
    dept: 'Marketing',
    type: 'Toàn thời gian',
    location: 'Đà Nẵng',
    salary: '10 – 18 triệu',
    desc: 'Lên kế hoạch và triển khai các chiến dịch marketing online/offline để phát triển thương hiệu NMSuperMarket.',
    requirements: [
      'Tốt nghiệp đại học chuyên ngành Marketing',
      'Kinh nghiệm Social Media, Content Marketing',
      'Kỹ năng phân tích dữ liệu',
      'Sáng tạo, chủ động',
    ],
    benefits: ['Lương hấp dẫn + hoa hồng', 'Budget marketing tự chủ', 'Cơ hội thăng tiến rõ ràng', 'Team trẻ, năng động'],
  },
];

const DEPT_COLORS = {
  'Kinh doanh': 'bg-green-100 text-green-700',
  'Vận chuyển': 'bg-blue-100 text-blue-700',
  'Công nghệ': 'bg-purple-100 text-purple-700',
  'Marketing': 'bg-orange-100 text-orange-700',
};

function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${open ? 'border-green-400 shadow-md' : 'border-gray-100 hover:border-green-300 hover:shadow-md'}`}>
      <button onClick={() => setOpen(v => !v)} className="w-full text-left p-6">
        <div className="flex flex-wrap items-start gap-4 justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${DEPT_COLORS[job.dept] || 'bg-gray-100 text-gray-600'}`}>
                {job.dept}
              </span>
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {job.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
              <span className="font-semibold text-green-600">💰 {job.salary}/tháng</span>
            </div>
          </div>
          <div className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
            <ChevronDown size={24} />
          </div>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-5">
          <p className="text-gray-600 mb-5 leading-relaxed">{job.desc}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">📋 Yêu cầu</h4>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">🎁 Quyền lợi</h4>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-orange-500 mt-0.5">★</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {applied ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-5 py-3 rounded-xl w-max">
              ✅ Đã gửi hồ sơ thành công! Chúng tôi sẽ liên hệ bạn sớm.
            </div>
          ) : (
            <button
              onClick={() => setApplied(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
              <Send size={16} /> Ứng tuyển ngay
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&fit=crop"
            alt="Tuyển dụng"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-white">
          <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 inline-block">
            Cơ hội nghề nghiệp
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 max-w-2xl">
            Gia nhập đội ngũ<br />
            <span className="text-green-300">NMSuperMarket</span>
          </h1>
          <p className="text-lg text-green-100 max-w-xl mb-8 leading-relaxed">
            Chúng tôi đang tìm kiếm những người tài năng, nhiệt huyết để cùng nhau xây dựng
            hệ thống siêu thị online hàng đầu Đà Nẵng.
          </p>
          <div className="flex flex-wrap gap-6 text-green-100 text-sm">
            {['🌟 Môi trường năng động', '📈 Cơ hội phát triển rõ ràng', '💰 Thu nhập cạnh tranh', '🎁 Phúc lợi hấp dẫn'].map((t, i) => (
              <span key={i} className="flex items-center gap-1">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '👥', num: '50+', label: 'Thành viên' },
              { icon: '🏆', num: '5+', label: 'Năm kinh nghiệm' },
              { icon: '⭐', num: '4.8/5', label: 'Điểm hài lòng NV' },
              { icon: '🚀', num: '100%', label: 'Tỉ lệ thăng tiến nội bộ' },
            ].map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-2xl font-extrabold text-green-600">{s.num}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Vị trí tuyển dụng</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            {JOBS.length} vị trí đang tuyển
          </h2>
          <p className="text-gray-500 mt-3">Nhấn vào từng vị trí để xem chi tiết và ứng tuyển</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {JOBS.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-3">Không tìm thấy vị trí phù hợp?</h2>
          <p className="text-green-100 mb-6 max-w-md mx-auto">
            Gửi CV của bạn đến chúng tôi. Chúng tôi sẽ liên hệ khi có cơ hội phù hợp!
          </p>
          <a href="mailto:tuyendung@nmsupermarket.vn"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg">
            <Briefcase size={18} /> Gửi CV tự ứng tuyển
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
