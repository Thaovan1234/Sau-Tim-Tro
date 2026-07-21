import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Search, MapPin, Heart, ShieldCheck, Sparkles,
  ArrowRight, Star, Home, Users, CheckCircle, Clock, BookOpen, Share2, MessageCircle,
  Wallet
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WormMascot } from "@/components/WormMascot";
import { RoomCard } from "@/components/RoomCard";
import { rooms } from "@/lib/rooms";
import { useEffect, useRef, useState } from "react";
import { SurveyOverlay } from "@/components/SurveyOverlay";



// Import images from assets (copied from original resources)
import heroImg from "@/assets/hero.jpg";
import caterpillarImg from "@/assets/caterpillar.png";
import fptUniversityImg from "@/assets/fpt-university.jpg";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Sâu Tìm Trọ — Tìm phòng trọ xinh ở Đà Nẵng" },
      {
        name: "description",
        content:
          "Sâu Tìm Trọ giúp bạn khám phá phòng trọ, căn hộ mini đáng yêu khắp Đà Nẵng — tìm nhanh, lọc dễ, lưu yêu thích.",
      },
      { property: "og:title", content: "Sâu Tìm Trọ — Tổ ấm xinh ở Đà Nẵng" },
      { property: "og:description", content: "Tìm phòng trọ Đà Nẵng nhanh, dễ và ngọt như mật." },
    ],
  }),
  component: HomePage,
} as any));

const districts = ["Hải Châu", "Sơn Trà", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Cẩm Lệ"];

const stats = [
  { value: "5.000+", label: "Phòng trọ", icon: Home },
  { value: "20.000+", label: "Sinh viên", icon: Users },
  { value: "100%", label: "Xác thực", icon: CheckCircle },
  { value: "Hỗ trợ 24/7", label: "Tận tâm", icon: Clock },
];

const popularUniversities = [
  {
    name: "ĐH Bách Khoa",
    count: "1.200+ phòng trọ",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "ĐH Kinh tế",
    count: "850+ phòng trọ",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "ĐH FPT",
    count: "450+ phòng trọ",
    image: fptUniversityImg,
  },
  {
    name: "ĐH Ngoại Ngữ",
    count: "600+ phòng trọ",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Xác thực 100%",
    desc: "Mọi thông tin về phòng trọ và chủ nhà đều được đội ngũ chúng tôi xác thực thực tế trước khi đăng tải.",
  },
  {
    icon: MapPin,
    title: "Gần trường học",
    desc: "Hệ thống gợi ý phòng trọ thông minh dựa trên vị trí trường đại học của bạn, tiết kiệm thời gian đi lại.",
  },
  {
    icon: Sparkles,
    title: "Giá minh bạch",
    desc: "Không phí môi giới, không nâng giá. Giá thuê và các chi phí điện nước luôn được niêm yết rõ ràng.",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ hỗ trợ nhiệt tình giúp sinh viên giải quyết mọi thắc mắc trong quá trình tìm và đặt phòng.",
  },
];

const testimonials = [
  {
    name: "Minh Tú",
    role: "Sinh viên năm 2 - ĐHBK",
    quote: "Nhờ Sâu mà mình tìm được phòng ngay sát trường Bách Khoa chỉ trong 2 ngày. Hình ảnh thực tế giống hệt trên web, không bị treo đầu dê bán thịt chó.",
    initial: "T",
  },
  {
    name: "Cô Mai Hạnh",
    role: "Phụ huynh sinh viên",
    quote: "Lần đầu con đi học xa nhà, tôi rất lo lắng. May nhờ trang web này tìm được ký túc xá an ninh, sạch sẽ. Quy trình làm việc rất chuyên nghiệp.",
    initial: "H",
  },
  {
    name: "Hoàng Long",
    role: "Sinh viên năm 1 - FPT",
    quote: "Giao diện dễ dùng, bộ lọc trường học rất tiện. Mình cực kỳ thích tính năng xem phòng xác thực. Rất recommend cho các bạn tân sinh viên.",
    initial: "L",
  },
];

/* ── Image with fade-in helper ── */
function FadeImg({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (img.complete) img.style.opacity = "1";
    else img.addEventListener("load", () => { img.style.opacity = "1"; });
  }, [src]);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={{ opacity: 0, transition: "opacity 0.3s ease-in", ...style }}
    />
  );
}

function HomePage() {
  // We customize the first 3 rooms to have specific badges from the user's drawing:
  // Card 1 -> "Mới nhất", Card 2 -> "Verified", Card 3 -> "Highlight"
  const badges = ["Mới nhất", "Verified", "Highlight"];
  const featured = rooms.slice(0, 3).map((r, i) => ({
    ...r,
    customBadge: badges[i % badges.length],
  }));

  const [university, setUniversity] = useState("");
  const [district, setDistrict] = useState("Thanh Khê");
  const [price, setPrice] = useState("Tất cả mức giá");
  const [showSurvey, setShowSurvey] = useState(false);
  const [displayRooms, setDisplayRooms] = useState(featured);

  const applySurveyPersonalization = (answers: any) => {
    // Q2: school name
    const schoolChoice = answers[2];
    let selectedUni = "";
    let selectedDist = "Thanh Khê";
    if (schoolChoice) {
      if (schoolChoice.includes("FPT")) {
        selectedUni = "ĐH FPT";
        selectedDist = "Ngũ Hành Sơn";
      } else if (schoolChoice.includes("Bách Khoa")) {
        selectedUni = "ĐH Bách Khoa";
        selectedDist = "Liên Chiểu";
      } else if (schoolChoice.includes("Kinh Tế") || schoolChoice.includes("Kinh tế")) {
        selectedUni = "ĐH Kinh tế";
        selectedDist = "Ngũ Hành Sơn";
      } else if (schoolChoice.includes("Ngoại Ngữ") || schoolChoice.includes("Ngoại ngữ")) {
        selectedUni = "ĐH Ngoại Ngữ";
        selectedDist = "Hải Châu";
      } else if (schoolChoice.includes("Duy Tân")) {
        selectedUni = "ĐH Duy Tân";
        selectedDist = "Hải Châu";
      }
      setUniversity(selectedUni);
      setDistrict(selectedDist);
    }

    // Q4: budget limit
    const budgetLimit = answers[4];
    if (budgetLimit) {
      if (budgetLimit < 2000000) {
        setPrice("Dưới 2 triệu");
      } else if (budgetLimit <= 3000000) {
        setPrice("2 triệu - 3 triệu");
      } else if (budgetLimit <= 5000000) {
        setPrice("3 triệu - 5 triệu");
      } else {
        setPrice("Trên 5 triệu");
      }

      // Filter featured rooms under this budget limit
      const filtered = rooms
        .filter((r) => r.price <= budgetLimit)
        .slice(0, 3)
        .map((r, i) => ({
          ...r,
          customBadge: badges[i % badges.length],
        }));

      if (filtered.length > 0) {
        setDisplayRooms(filtered);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("sau_user_logged_in") === "true";
    const userEmail = localStorage.getItem("sau_user_email") || "default";
    const isCompleted = sessionStorage.getItem(`sau_survey_completed_${userEmail}`) === "true" || localStorage.getItem(`sau_survey_completed_${userEmail}`) === "true";
    
    if (!logged || !isCompleted) {
      setShowSurvey(true);
    }

    const stored = localStorage.getItem(`sau_survey_answers_${userEmail}`) || localStorage.getItem("sau_survey_answers");
    if (stored) {
      try {
        const answers = JSON.parse(stored);
        applySurveyPersonalization(answers);
      } catch (e) {
        console.error(e);
      }
    }

    const handleOpenLogin = () => {
      setShowSurvey(true);
    };
    window.addEventListener("sau_open_login", handleOpenLogin);
    return () => {
      window.removeEventListener("sau_open_login", handleOpenLogin);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <SiteHeader />

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════════
            BAND 1 — HERO: Soft light blue-gray/cream theme with 3D Mascot and floating cards
        ══════════════════════════════════════════════════════ */}
        <section 
          className="relative overflow-hidden pt-16 pb-28 min-h-[600px] flex items-center"
          style={{
            background: "linear-gradient(135deg, #eef5f9 0%, #faf8f5 100%)",
            borderBottom: "1px solid rgba(26,58,42,0.04)"
          }}
        >
          {/* Subtle background abstract shapes */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-10 w-full z-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Text & Badges — Left 7 columns */}
              <div className="lg:col-span-7">
                {/* Badges row */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {[
                    { text: "An toàn – được xác thực", color: "var(--brand-green-text)", bg: "var(--brand-green-bg)", border: "rgba(21, 128, 61, 0.15)" },
                    { text: "Tiện nghi – gần trường", color: "var(--brand-blue-text)", bg: "var(--brand-blue-light)", border: "rgba(29, 78, 216, 0.15)" },
                    { text: "Giá minh bạch", color: "#8B5A2B", bg: "#fff9e6", border: "rgba(139, 90, 43, 0.15)" },
                  ].map(({ text, color, bg, border }) => (
                    <span
                      key={text}
                      className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        background: bg,
                        borderRadius: "50px",
                        border: `1px solid ${border}`,
                        color: color,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </div>

                {/* H1 heading */}
                <h1
                  className="font-display font-black leading-[1.1] text-slate-800"
                  style={{
                    fontSize: "clamp(2.5rem, 5.5vw, 3.8rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Tìm phòng trọ gần trường
                  <br />
                  <span style={{ color: "#8B5A2B" }}>dễ dàng hơn bao giờ hết</span>
                </h1>

                <p
                  className="mt-5 text-base md:text-lg leading-relaxed max-w-xl text-slate-500"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Hỗ trợ tân sinh viên và sinh viên các trường đại học tại Đà Nẵng
                  tìm kiếm nơi ở <span className="font-semibold text-slate-700">an toàn, tiện nghi</span> và <span className="font-semibold text-slate-700">giá minh bạch</span>.
                </p>
              </div>

              {/* Mascot & Speech Bubble — Right 5 columns */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
                
                {/* Speech Bubble */}
                <div
                  className="mb-4 px-5 py-3 text-sm font-semibold relative animate-bounce z-10"
                  style={{
                    background: "#ffffff",
                    color: "var(--cocoa)",
                    borderRadius: "16px",
                    boxShadow: "var(--shadow-hover)",
                    maxWidth: "240px",
                    animationDuration: "3s",
                    border: "1px solid rgba(0,0,0,0.03)"
                  }}
                >
                  Để Sâu tìm phòng cho bạn nhé!
                  {/* Bubble arrow */}
                  <div
                    className="absolute w-3 h-3 bg-white rotate-45"
                    style={{
                      bottom: "-6px",
                      right: "50px",
                      boxShadow: "2px 2px 2px rgba(0,0,0,0.02)",
                    }}
                  />
                </div>

                {/* Mascot Wrapper with Absolute Floating Cards */}
                <div className="w-[180px] md:w-[220px] relative">
                  <WormMascot
                    className="w-full h-auto animate-float"
                    alt="Sâu tìm trọ"
                    animate={false}
                  />

                  {/* Floating Card 1: Left side */}
                  <div
                    className="absolute left-[-40px] md:left-[-60px] top-[30%] bg-white px-3.5 py-2.5 rounded-2xl border border-slate-100 shadow-md animate-float flex items-center gap-2.5 z-20 select-none cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    style={{ animationDelay: "0s" }}
                    onClick={() => {
                      window.location.href = `/search?q=ĐH FPT`;
                    }}
                  >
                    <div className="h-7 w-7 rounded-lg bg-[#ffc700]/10 flex items-center justify-center text-[#ffc700] shrink-0" style={{ backgroundColor: "rgba(255, 199, 0, 0.1)" }}>
                      <MapPin className="h-4 w-4 text-[#ffc700]" />
                    </div>
                    <div className="text-left leading-none">
                      <span className="text-[10px] font-extrabold text-slate-800 block">Gần ĐH FPT Đà Nẵng</span>
                      <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Chỉ 500m đi bộ</span>
                    </div>
                  </div>

                  {/* Floating Card 2: Right side */}
                  <div
                    className="absolute right-[-20px] md:right-[-40px] bottom-[15%] bg-white px-3.5 py-2.5 rounded-2xl border border-slate-100 shadow-md animate-float flex items-center gap-2.5 z-20 select-none cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    style={{ animationDelay: "2s" }}
                    onClick={() => {
                      window.location.href = `/search?q=ĐH FPT&price=2 triệu - 3 triệu`;
                    }}
                  >
                    <div className="h-7 w-7 rounded-lg bg-[#ffc700]/10 flex items-center justify-center text-[#ffc700] shrink-0" style={{ backgroundColor: "rgba(255, 199, 0, 0.1)" }}>
                      <Wallet className="h-4 w-4 text-[#ffc700]" />
                    </div>
                    <div className="text-left leading-none">
                      <span className="text-[10px] font-extrabold text-[#5c4d1a] block">Giá: 2.5Tr/tháng</span>
                      <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Không phát sinh</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Search widget card overlaying the hero bottom ── */}
            <div className="mt-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/search?district=${encodeURIComponent(district)}&q=${encodeURIComponent(university)}&price=${encodeURIComponent(price)}`;
                }}
                className="grid gap-4 sm:grid-cols-12 items-center p-4 bg-white"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(26,58,42,0.08)",
                }}
              >
                {/* Field 1: University select */}
                <div className="sm:col-span-4 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cocoa/10">
                  <label htmlFor="uni-select" className="block text-[10px] font-bold uppercase tracking-widest text-cocoa/50 mb-1">
                    Trường đại học
                  </label>
                  <select
                    id="uni-select"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-transparent font-semibold text-cocoa outline-none text-sm cursor-pointer"
                  >
                    <option value="">Chọn trường của bạn</option>
                    <option value="ĐH Bách Khoa">ĐH Bách Khoa</option>
                    <option value="ĐH Kinh tế">ĐH Kinh tế</option>
                    <option value="ĐH FPT">ĐH FPT</option>
                    <option value="ĐH Sư phạm">ĐH Sư phạm</option>
                    <option value="ĐH Duy Tân">ĐH Duy Tân</option>
                    <option value="ĐH Ngoại Ngữ">ĐH Ngoại Ngữ</option>
                  </select>
                </div>

                {/* Field 2: District select */}
                <div className="sm:col-span-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-cocoa/10">
                  <label htmlFor="dist-select" className="block text-[10px] font-bold uppercase tracking-widest text-cocoa/50 mb-1">
                    Khu vực
                  </label>
                  <select
                    id="dist-select"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-transparent font-semibold text-cocoa outline-none text-sm cursor-pointer"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 3: Price range select */}
                <div className="sm:col-span-3 px-4 py-2">
                  <label htmlFor="price-select" className="block text-[10px] font-bold uppercase tracking-widest text-cocoa/50 mb-1">
                    Mức giá
                  </label>
                  <select
                    id="price-select"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-transparent font-semibold text-cocoa outline-none text-sm cursor-pointer"
                  >
                    <option value="Tất cả mức giá">Tất cả mức giá</option>
                    <option value="Dưới 2 triệu">Dưới 2 triệu</option>
                    <option value="2 triệu - 3 triệu">2 triệu - 3 triệu</option>
                    <option value="3 triệu - 5 triệu">3 triệu - 5 triệu</option>
                    <option value="Trên 5 triệu">Trên 5 triệu</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full btn btn-honey py-3.5 rounded-xl justify-center font-bold active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: "var(--honey)",
                      color: "var(--cocoa-deep)",
                      borderRadius: "12px",
                    }}
                  >
                    <Search className="h-4 w-4" />
                    <span>Tìm kiếm</span>
                  </button>
                </div>
              </form>

              {/* Suggestions chips below the widget */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-slate-600">Gợi ý nhanh:</span>
                {["ĐH Bách Khoa", "ĐH FPT", "ĐH Kinh tế", "ĐH Sư phạm", "ĐH Duy Tân"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      setUniversity(chip);
                    }}
                    className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 transition-all border border-slate-200 text-slate-600 font-semibold shadow-sm active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
                <button
                  onClick={() => setPrice("2 triệu - 3 triệu")}
                  className="px-3 py-1 rounded-full text-brand-brown font-extrabold transition-all hover:opacity-90 shadow-sm active:scale-95"
                  style={{ backgroundColor: "var(--brand-yellow)" }}
                >
                  Dưới 3 triệu
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BAND 2 — STATS STRIP: Dark Cocoa background, gold text
            espresso-dark band highlighting the 4 core trust signals
        ══════════════════════════════════════════════════════ */}
        <section
          aria-label="Thống kê lòng tin"
          style={{ backgroundColor: "var(--cocoa)", borderTop: "2px solid var(--honey)" }}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 py-6 md:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center text-center px-4">
                  <div
                    className="font-display font-bold flex items-center gap-1.5"
                    style={{ fontSize: "1.8rem", color: "var(--honey)", letterSpacing: "-0.02em" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BAND 3 — FEATURED ROOMS: White section with whisper shadow cards
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="featured-rooms-heading"
          className="bg-white py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            {/* Header row */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12 text-left">
              <div>
                <span className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-100 rounded-full shadow-sm mb-2.5 inline-block">Gợi ý cho bạn</span>
                <h2
                  id="featured-rooms-heading"
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)",
                    color: "var(--cocoa)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Phòng trọ nổi bật hôm nay
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Danh sách những phòng trọ được xác minh kỹ lưỡng, gần các trường đại học với mức giá tốt nhất.
                </p>
              </div>
              <Link
                to="/search"
                className="inline-flex items-center gap-1 text-sm font-semibold transition-all"
                style={{ color: "#8B5A2B" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")}
              >
                Xem tất cả →
              </Link>
            </div>

            {/* Room cards grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayRooms.map((room) => (
                <div key={room.id} className="relative">
                  <RoomCard room={room} />
                  {/* Custom status badge overlay (Mới nhất, Verified, Highlight) */}
                  {room.customBadge && (
                    <div
                      className="absolute top-3 left-16 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cocoa shadow-sm"
                      style={{
                        backgroundColor: "var(--honey)",
                        borderRadius: "4px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {room.customBadge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BAND 4 — POPULAR AREAS: Cream background, 4-up responsive grid
            Starbucks premium illustrated photograph layout
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="popular-heading"
          style={{ backgroundColor: "var(--cream)" }}
          className="py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2
                id="popular-heading"
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)",
                  color: "var(--cocoa)",
                  letterSpacing: "-0.03em",
                }}
              >
                Khu vực phổ biến
              </h2>
              <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
                Tìm kiếm phòng trọ tập trung theo các cụm trường đại học lớn tại Đà Nẵng
              </p>
            </div>

            {/* 4-up responsive grid */}
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {popularUniversities.map((uni) => (
                <Link
                  key={uni.name}
                  to="/search"
                  search={{ q: uni.name } as never}
                  className="group relative overflow-hidden h-64 flex items-end p-5 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-hover"
                  style={{
                    borderRadius: "16px",
                    border: "1px solid rgba(26,58,42,0.08)",
                  }}
                >
                  {/* Photo background */}
                  <FadeImg
                    src={uni.image}
                    alt={uni.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay for typography readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(17,36,25,0.90) 0%, rgba(17,36,25,0.30) 60%, transparent 100%)",
                    }}
                  />
                  {/* Text */}
                  <div className="relative z-10">
                    <h3
                      className="font-display font-bold text-lg text-white"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {uni.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">{uni.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BAND 5 — WHY US (Split layout): White background,
            Starbucks dark features & photography split pattern
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="why-us-heading"
          className="bg-white py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

              {/* Left Column — 7/12 width: Benefits list */}
              <div className="lg:col-span-7">
                <span className="section-eyebrow mb-3 block" style={{ color: "var(--honey)" }}>
                  Cam kết từ Sâu
                </span>
                <h2
                  id="why-us-heading"
                  className="font-display font-bold leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)",
                    color: "var(--cocoa)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Tại sao nên chọn Sâu Tìm Trọ?
                </h2>

                {/* Stacks of benefits */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {benefits.map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="p-5 flex gap-4 transition-all duration-300 bg-cream/30 hover:bg-cream/60"
                      style={{
                        borderRadius: "12px",
                        border: "1px solid rgba(26,58,42,0.06)",
                      }}
                    >
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "var(--honey)", color: "var(--cocoa-deep)" }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3
                          className="font-display font-bold text-sm"
                          style={{ color: "var(--cocoa)", letterSpacing: "-0.01em" }}
                        >
                          {title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column — 5/12 width: Mascot illustration with frame */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                {/* Visual content container */}
                <div
                  className="relative p-6 bg-cream overflow-hidden"
                  style={{
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    border: "1px solid rgba(26,58,42,0.08)",
                  }}
                >
                  <FadeImg
                    src={caterpillarImg}
                    alt="Mascot caterpillar illustration"
                    className="w-full max-w-[320px] h-auto object-contain rounded-xl"
                  />

                  {/* Trust overlay stats badge */}
                  <div
                    className="absolute bottom-4 right-4 bg-white p-4"
                    style={{
                      borderRadius: "16px",
                      boxShadow: "var(--shadow-hover)",
                      border: "1px solid rgba(26,58,42,0.08)",
                      minWidth: "120px",
                    }}
                  >
                    <div className="font-display font-extrabold text-lg text-leaf leading-none">
                      10k+
                    </div>
                    <div className="text-[10px] font-semibold text-cocoa/50 mt-1">
                      Sinh viên đã tìm được phòng ưng ý qua Sâu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BAND 6 — TESTIMONIALS: Cream background, 3-up cards
        ══════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="testimonials-heading"
          style={{ backgroundColor: "var(--cream)" }}
          className="py-20 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow mb-2 block">Đánh giá từ cộng đồng</span>
              <h2
                id="testimonials-heading"
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)",
                  color: "var(--cocoa)",
                  letterSpacing: "-0.03em",
                }}
              >
                Mấy bạn đã tìm được tổ nói gì?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.name}
                  className="flex flex-col p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(26,58,42,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
                  }}
                >
                  {/* Rating Stars (5) */}
                  <div className="flex items-center gap-1 mb-4 text-honey">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "rgba(26,58,42,0.85)", letterSpacing: "-0.01em" }}
                  >
                    "{t.quote}"
                  </p>

                  {/* User Profile */}
                  <footer className="mt-6 flex items-center gap-3 pt-4 border-t border-cocoa/5">
                    {/* Circle avatar */}
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{
                        backgroundColor: "var(--amber-soft)",
                        color: "var(--cocoa)",
                        border: "1px solid rgba(26,58,42,0.08)",
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-bold block" style={{ color: "var(--cocoa)" }}>
                        {t.name}
                      </cite>
                      <span className="text-xs block mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {t.role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />

      {showSurvey && (
        <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto pt-24 animate-fadeIn">
          <SurveyOverlay
            onComplete={(answers) => {
              const userEmail = localStorage.getItem("sau_user_email") || "default";
              sessionStorage.setItem(`sau_survey_completed_${userEmail}`, "true");
              localStorage.setItem(`sau_survey_completed_${userEmail}`, "true");
              localStorage.setItem(`sau_survey_answers_${userEmail}`, JSON.stringify(answers));

              sessionStorage.setItem("sau_survey_completed", "true");
              localStorage.setItem("sau_survey_completed", "true");
              localStorage.setItem("sau_survey_answers", JSON.stringify(answers));

              setShowSurvey(false);
              applySurveyPersonalization(answers);

              // Find best matching room based on school and budget answers
              const schoolChoice = answers[2] || "";
              let uniKey = "";
              if (schoolChoice.includes("FPT")) uniKey = "fpt";
              else if (schoolChoice.includes("Bách Khoa")) uniKey = "bachkhoa";
              else if (schoolChoice.includes("Kinh Tế") || schoolChoice.includes("Kinh tế")) uniKey = "kinhte";
              else if (schoolChoice.includes("Ngoại Ngữ") || schoolChoice.includes("Ngoại ngữ")) uniKey = "ngoaingu";
              else if (schoolChoice.includes("Duy Tân")) uniKey = "duytan";

              const budgetLimit = Number(answers[4]) || 5000000;

              let matchedRooms = rooms.filter(r => r.price <= budgetLimit);
              if (uniKey) {
                matchedRooms = matchedRooms.filter(r => r.uniKey === uniKey);
              }
              if (matchedRooms.length === 0) {
                matchedRooms = rooms.filter(r => r.price <= budgetLimit);
              }
              if (matchedRooms.length === 0) {
                matchedRooms = rooms;
              }

              const bestRoom = matchedRooms[0] || rooms[0];
              if (bestRoom) {
                navigate({ to: "/room/$id", params: { id: bestRoom.id } });
              }
            }}
          />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          FRAP FLOATING CTA BUTTON: 56px circular floating order entrance
          fixed bottom-right, layered shadow, scale micro-interaction
      ══════════════════════════════════════════════════════ */}
      <Link
        to="/search"
        aria-label="Tìm phòng ngay"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full flex items-center justify-center transition-all active:scale-95 z-40"
        style={{
          background: "var(--cocoa)",
          color: "#ffffff",
          boxShadow: "0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--leaf)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 6px rgba(0,0,0,0.30), 0 12px 20px rgba(0,0,0,0.20)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--cocoa)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)";
        }}
      >
        <Search className="h-6 w-6" />
      </Link>
    </div>
  );
}
