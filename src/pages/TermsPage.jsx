import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CategoryNav from '../components/layout/CategoryNav';
import { ScrollText, ChevronDown } from 'lucide-react';

const SECTIONS = [
  {
    id: 1,
    title: '1. Điều khoản chung',
    content: `Bằng việc truy cập và sử dụng website NMSuperMarket (nmsupermarket.vn), bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.

NMSuperMarket có quyền thay đổi, chỉnh sửa, bổ sung hoặc loại bỏ các điều khoản này vào bất kỳ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng tải trên website.`,
  },
  {
    id: 2,
    title: '2. Tài khoản người dùng',
    content: `Khi tạo tài khoản tại NMSuperMarket, bạn cam kết:
    
• Cung cấp thông tin chính xác, đầy đủ và cập nhật
• Bảo mật thông tin đăng nhập của tài khoản
• Chịu trách nhiệm về mọi hoạt động phát sinh qua tài khoản
• Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép

NMSuperMarket có quyền đình chỉ hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản.`,
  },
  {
    id: 3,
    title: '3. Đặt hàng và thanh toán',
    content: `Chính sách đặt hàng:
    
• Đơn hàng được xác nhận sau khi thanh toán thành công
• Giá sản phẩm có thể thay đổi mà không cần thông báo trước
• NMSuperMarket có quyền từ chối hoặc hủy đơn hàng trong trường hợp sản phẩm hết hàng hoặc có lỗi giá

Phương thức thanh toán chấp nhận: Tiền mặt khi nhận hàng (COD), Chuyển khoản ngân hàng, Ví điện tử (MoMo, ZaloPay), Thẻ tín dụng/ghi nợ.`,
  },
  {
    id: 4,
    title: '4. Giao hàng và đổi trả',
    content: `Giao hàng:
    
• Phí giao hàng: miễn phí cho đơn từ 300.000đ
• Thời gian giao hàng: 2 giờ trong nội thành Đà Nẵng
• Ngoài khu vực phục vụ: liên hệ hotline để được tư vấn

Đổi trả:
    
• Sản phẩm lỗi, hỏng, không đúng mô tả: đổi trả trong 24 giờ
• Hoàn tiền 100% trong trường hợp sản phẩm không đạt chất lượng
• Không hỗ trợ đổi trả với lý do cá nhân sau khi nhận hàng`,
  },
  {
    id: 5,
    title: '5. Quyền sở hữu trí tuệ',
    content: `Toàn bộ nội dung trên website NMSuperMarket bao gồm nhưng không giới hạn: hình ảnh, logo, văn bản, giao diện, mã nguồn đều thuộc quyền sở hữu của NMSuperMarket hoặc được sử dụng có phép.

Nghiêm cấm sao chép, phân phối, chỉnh sửa hoặc sử dụng bất kỳ nội dung nào từ website này cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản từ NMSuperMarket.`,
  },
  {
    id: 6,
    title: '6. Chính sách bảo mật',
    content: `Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn:
    
• Thông tin thu thập: Họ tên, địa chỉ, số điện thoại, email chỉ dùng để xử lý đơn hàng
• Không chia sẻ thông tin cá nhân cho bên thứ ba khi chưa có sự đồng ý của bạn
• Áp dụng các biện pháp bảo mật kỹ thuật để bảo vệ dữ liệu
• Bạn có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân bất kỳ lúc nào`,
  },
  {
    id: 7,
    title: '7. Giới hạn trách nhiệm',
    content: `NMSuperMarket không chịu trách nhiệm về:
    
• Thiệt hại gián tiếp, ngẫu nhiên phát sinh từ việc sử dụng dịch vụ
• Gián đoạn dịch vụ do sự cố kỹ thuật ngoài tầm kiểm soát
• Nội dung từ các website bên thứ ba được liên kết trên trang

Trách nhiệm tối đa của NMSuperMarket không vượt quá giá trị đơn hàng thực tế.`,
  },
  {
    id: 8,
    title: '8. Liên hệ và giải quyết tranh chấp',
    content: `Mọi khiếu nại hoặc tranh chấp phát sinh liên quan đến điều khoản này, vui lòng liên hệ:

📧 Email: hotro@nmsupermarket.vn
📞 Hotline: 0933 380 408 (7:00 – 22:00 mỗi ngày)
📍 Địa chỉ: 99 Tô Hiến Thành, Sơn Trà, Đà Nẵng

Các tranh chấp sẽ được giải quyết thông qua thương lượng trực tiếp. Nếu không đạt được thỏa thuận, các bên có quyền đưa ra Tòa án nhân dân có thẩm quyền tại Đà Nẵng để giải quyết.`,
  },
];

function AccordionItem({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${open ? 'border-green-400 shadow-md' : 'border-gray-200 hover:border-green-300'}`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <h2 className={`font-bold text-base md:text-lg ${open ? 'text-green-700' : 'text-gray-900'}`}>
          {section.title}
        </h2>
        <ChevronDown size={22} className={`text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180 text-green-600' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 bg-white border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line pt-4">{section.content}</p>
        </div>
      )}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ScrollText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Điều khoản sử dụng</h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Vui lòng đọc kỹ các điều khoản và điều kiện trước khi sử dụng dịch vụ của NMSuperMarket.
          </p>
          <p className="text-gray-500 text-sm mt-4">Cập nhật lần cuối: 01/01/2026</p>
        </div>
      </section>

      {/* Summary chips */}
      <section className="bg-white border-b border-gray-100 py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {['✅ Cam kết bảo mật', '🔄 Đổi trả dễ dàng', '💳 Thanh toán an toàn', '🚀 Giao hàng nhanh', '📞 Hỗ trợ 24/7'].map((t, i) => (
              <span key={i} className="bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-gray-500 text-sm mb-8 leading-relaxed bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-4">
          ⚠️ <strong>Lưu ý:</strong> Khi tạo tài khoản hoặc thực hiện mua hàng trên NMSuperMarket, bạn đã đồng ý với toàn bộ các điều khoản được nêu dưới đây. Nhấn vào từng mục để xem chi tiết.
        </p>

        <div className="space-y-3">
          {SECTIONS.map(s => <AccordionItem key={s.id} section={s} />)}
        </div>

        <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-2">Bạn có câu hỏi về điều khoản?</p>
          <p className="text-gray-500 text-sm mb-4">Liên hệ ngay với đội ngũ hỗ trợ của chúng tôi</p>
          <a href="mailto:hotro@nmsupermarket.vn"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors text-sm">
            📧 hotro@nmsupermarket.vn
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
