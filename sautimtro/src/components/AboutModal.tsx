import React, { useEffect } from "react";
import {
  X,
  GraduationCap,
  ShieldCheck,
  Wallet,
  Map,
  Users,
  Eye,
  Ruler,
  ArrowRight,
  Check,
  Search,
  MessageSquare,
} from "lucide-react";

import wormMascot from "@/assets/worm-mascot.png";
import caterpillar from "@/assets/caterpillar.png";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSearch: () => void;
};

export function AboutModal({ isOpen, onClose, onNavigateToSearch }: AboutModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-bg"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:max-w-6xl md:rounded-[32px] bg-[#fdfdfd] shadow-2xl flex flex-col overflow-hidden animate-modal-content"
        style={{ border: "1px solid rgba(26,58,42,0.08)" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoa/5 bg-white">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-yellow" style={{ backgroundColor: "#ffc72c" }} />
            <span className="text-sm font-bold text-cocoa/60 uppercase tracking-wider">Vì sao chọn chúng tôi</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cocoa/5 text-cocoa transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 space-y-20 bg-gradient-to-b from-[#f8f9fa] to-white scrollbar-thin">
          
          {/* SECTION 1: HERO */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-cocoa leading-[1.1] tracking-tight">
                Vì sao sinh viên chọn <span style={{ color: "#8B5A2B" }}>Sâu Tìm Trọ</span>?
              </h1>
              <p className="text-lg text-cocoa/80 leading-relaxed max-w-xl">
                Nền tảng giúp sinh viên Đà Nẵng tìm phòng gần trường nhanh hơn, minh bạch hơn và an tâm hơn với sự hỗ trợ từ đội ngũ xác thực.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToSearch();
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#5c4033] hover:bg-[#4a3227] text-white font-bold transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Tìm phòng ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToSearch();
                  }}
                  className="px-6 py-3.5 rounded-full border border-[#5c4033] text-[#5c4033] font-bold hover:bg-[#5c4033]/5 transition-all"
                >
                  Xem phòng đã xác minh
                </button>
              </div>
            </div>

            {/* Mascot Right */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Speech bubble */}
              <div className="absolute top-0 right-10 bg-white border border-cocoa/5 shadow-lg rounded-2xl px-4 py-2.5 text-xs font-bold text-cocoa bubble-float flex items-center gap-1.5 z-10">
                <span>Để Sâu tìm phòng cho bạn nhé! 🐛</span>
              </div>
              <div className="relative w-[280px] h-[280px] bg-white rounded-full flex items-center justify-center shadow-xl border border-cocoa/5">
                <img
                  src={wormMascot}
                  alt="Sâu Tìm Trọ Mascot"
                  className="w-[200px] h-auto object-contain animate-float"
                  onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: LỢI ÍCH VƯỢT TRỘI */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-bold text-cocoa tracking-tight">Lợi ích vượt trội cho người đi thuê</h2>
              <div className="w-16 h-1 bg-[#8B5A2B] mx-auto rounded" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group bg-white p-6 rounded-2xl border border-cocoa/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#fff9e6" }}>
                  <GraduationCap className="h-6 w-6 text-[#ffc72c] icon-wiggle-effect" />
                </div>
                <h3 className="text-lg font-bold text-cocoa mb-2">Tìm phòng gần trường</h3>
                <p className="text-sm text-cocoa/70 leading-relaxed">
                  Lọc phòng theo từng trường đại học, khu vực và khoảng cách di chuyển chính xác.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-white p-6 rounded-2xl border border-cocoa/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#fff9e6" }}>
                  <ShieldCheck className="h-6 w-6 text-[#ffc72c] icon-wiggle-effect" />
                </div>
                <h3 className="text-lg font-bold text-cocoa mb-2">Tin đăng được xác minh</h3>
                <p className="text-sm text-cocoa/70 leading-relaxed">
                  Ưu tiên phòng có thông tin rõ ràng, hình ảnh thực tế và quy trình kiểm tra nghiêm ngặt.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-white p-6 rounded-2xl border border-cocoa/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#fff9e6" }}>
                  <Wallet className="h-6 w-6 text-[#ffc72c] icon-wiggle-effect" />
                </div>
                <h3 className="text-lg font-bold text-cocoa mb-2">Giá minh bạch</h3>
                <p className="text-sm text-cocoa/70 leading-relaxed">
                  Hiển thị giá thuê, tiền cọc, chi phí điện nước và tiện ích rõ ràng ngay từ đầu.
                </p>
              </div>

              {/* Card 4 */}
              <div className="group bg-white p-6 rounded-2xl border border-cocoa/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 lg:col-start-2 lg:col-span-1">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#fff9e6" }}>
                  <Map className="h-6 w-6 text-[#ffc72c] icon-wiggle-effect" />
                </div>
                <h3 className="text-lg font-bold text-cocoa mb-2">Xem vị trí trên bản đồ</h3>
                <p className="text-sm text-cocoa/70 leading-relaxed">
                  Dễ dàng kiểm tra khoảng cách từ phòng đến trường, chợ, siêu thị và các tiện ích công cộng.
                </p>
              </div>

              {/* Card 5 */}
              <div className="group bg-white p-6 rounded-2xl border border-cocoa/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-5" style={{ backgroundColor: "#fff9e6" }}>
                  <Users className="h-6 w-6 text-[#ffc72c] icon-wiggle-effect" />
                </div>
                <h3 className="text-lg font-bold text-cocoa mb-2">Hỗ trợ phụ huynh</h3>
                <p className="text-sm text-cocoa/70 leading-relaxed">
                  Giúp phụ huynh kiểm tra thông tin phòng, khu vực, mức giá và độ an toàn trước khi con em mình thuê.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: QUY TRÌNH TÌM PHÒNG */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-bold text-cocoa tracking-tight">Quy trình tìm phòng đơn giản</h2>
              <div className="w-16 h-1 bg-[#8B5A2B] mx-auto rounded" />
            </div>

            <div className="grid gap-8 md:grid-cols-3 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full border-2 border-brand-yellow bg-white text-[#ffc72c] flex items-center justify-center text-xl font-bold shadow-md">
                  1
                </div>
                <h3 className="text-lg font-bold text-cocoa">Chọn trường đại học</h3>
                <p className="text-sm text-cocoa/70 max-w-xs">
                  Chúng tôi liệt kê các phòng xung quanh trường bạn đang học.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full border-2 border-brand-yellow bg-white text-[#ffc72c] flex items-center justify-center text-xl font-bold shadow-md">
                  2
                </div>
                <h3 className="text-lg font-bold text-cocoa">Lọc khu vực & mức giá</h3>
                <p className="text-sm text-cocoa/70 max-w-xs">
                  Tinh chỉnh kết quả theo nhu cầu tài chính và khu vực yêu thích.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full border-2 border-brand-yellow bg-white text-[#ffc72c] flex items-center justify-center text-xl font-bold shadow-md">
                  3
                </div>
                <h3 className="text-lg font-bold text-cocoa">Xem chi tiết & liên hệ</h3>
                <p className="text-sm text-cocoa/70 max-w-xs">
                  Trao đổi trực tiếp với chủ trọ hoặc đặt lịch xem phòng ngay.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: KHÁC BIỆT THƯƠNG HIỆU */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-bold text-cocoa tracking-tight">Khác biệt tạo nên sự an tâm</h2>
              <div className="w-16 h-1 bg-[#8B5A2B] mx-auto rounded" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Traditional */}
              <div className="bg-white p-8 rounded-3xl border border-cocoa/5 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-cocoa/50">Tìm trọ truyền thống</h3>
                <ul className="space-y-4">
                  {[
                    "Thông tin rải rác, khó kiểm chứng thật giả.",
                    "Khó ước lượng khoảng cách tới trường học.",
                    "Giá cả mập mờ, thường phát sinh chi phí phụ.",
                    "Mất nhiều thời gian đi thực tế mà không ưng ý.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-cocoa/70">
                      <span className="h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sau Tim Tro */}
              <div className="bg-[#112419] p-8 rounded-3xl text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-yellow text-cocoa text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full" style={{ backgroundColor: "#ffc72c" }}>
                  Khuyên dùng
                </div>
                <h3 className="text-xl font-bold text-[#ffc72c]">Sâu Tìm Trọ</h3>
                <ul className="space-y-4">
                  {[
                    "Tìm kiếm tập trung theo trường đại học.",
                    "Bản đồ trực quan, đo lường chính xác khoảng cách.",
                    "Phòng đã được đội ngũ xác thực thực tế.",
                    "Bảng giá chi tiết tất cả dịch vụ (điện, nước, wifi...).",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/95">
                      <span className="h-5 w-5 rounded-full bg-[#ffc72c] text-cocoa flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 5: PHỤ HUYNH */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center bg-[#f0f4f8] p-8 md:p-12 rounded-[32px] border border-cocoa/5">
            {/* Left Tablet Map */}
            <div className="relative flex justify-center bg-white p-4 rounded-2xl shadow-md border border-cocoa/5">
              <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] w-full">
                {/* Simulated Map View */}
                <div className="absolute inset-0 bg-[#e3eaef] flex items-center justify-center">
                  <div className="absolute top-1/4 left-1/4 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white shadow animate-pulse" />
                  <div className="absolute top-1/2 left-2/3 h-3.5 w-3.5 rounded-full bg-[#ffc72c] border-2 border-white shadow animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white shadow animate-pulse" />
                  <span className="text-xs font-bold text-cocoa/40">Bản đồ đo lường khoảng cách</span>
                </div>
              </div>
            </div>

            {/* Right details */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-cocoa leading-tight">An tâm tuyệt đối cho Phụ huynh</h2>
              <p className="text-sm text-cocoa/80 leading-relaxed">
                Chúng tôi hiểu rằng việc tìm chỗ ở cho con em xa nhà là nỗi lo lớn nhất của phụ huynh. Sâu Tìm Trọ không chỉ cung cấp thông tin phòng, mà còn đánh giá:
              </p>
              <div className="space-y-3">
                {[
                  { icon: Eye, text: "Đánh giá an ninh khu vực xung quanh." },
                  { icon: ShieldCheck, text: "Xác nhận chính chủ, tránh lừa đảo tiền cọc." },
                  { icon: Ruler, text: "Đo lường quãng đường đi bộ an toàn tới trường." },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-white/60 p-3.5 rounded-xl border border-cocoa/5">
                      <div className="h-8 w-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-[#ffc72c]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-cocoa/80">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 6: STATS */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 text-center max-w-4xl mx-auto py-8 border-y border-cocoa/10">
            <div>
              <div className="text-4xl font-extrabold text-[#8B5A2B]">200.000+</div>
              <div className="text-xs font-bold text-cocoa/50 mt-1 uppercase tracking-wider">Lượt tìm kiếm phòng trọ hàng tháng</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[#8B5A2B]">15.000+</div>
              <div className="text-xs font-bold text-cocoa/50 mt-1 uppercase tracking-wider">Phòng trọ đã được đội ngũ xác thực</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-[#8B5A2B]">100%</div>
              <div className="text-xs font-bold text-cocoa/50 mt-1 uppercase tracking-wider">Thông tin minh bạch, chính xác</div>
            </div>
          </div>

          {/* SECTION 7: CTA */}
          <div className="bg-gradient-to-r from-[#faf5e8] to-[#fffaee] border border-[#ffc72c]/30 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
              <img src={caterpillar} alt="caterpillar" className="h-20 w-auto object-contain animate-float" />
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-cocoa">Sẵn sàng tìm phòng gần trường chưa?</h3>
                <p className="text-sm text-cocoa/70 max-w-md">
                  Gia nhập cộng đồng 20.000+ sinh viên Đà Nẵng đã tìm thấy "tổ ấm" ưng ý qua Sâu Tìm Trọ.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToSearch();
                }}
                className="px-6 py-3 rounded-xl bg-[#5c4033] text-white text-xs font-bold hover:bg-[#4a3227] transition-all"
              >
                Tìm phòng ngay
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-[#5c4033] text-[#5c4033] text-xs font-bold hover:bg-[#5c4033]/5 transition-all"
              >
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
