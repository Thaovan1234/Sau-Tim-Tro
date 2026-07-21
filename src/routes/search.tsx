import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { 
  Search as SearchIcon, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Plus, 
  Info,
  GraduationCap,
  Sliders,
  DollarSign,
  Bookmark,
  Bell,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Map,
  Compass,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  BookmarkCheck,
  Check,
  Smartphone
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatVND } from "@/lib/rooms";
import { vanminhRooms, CrawledRoom } from "@/lib/crawled_vanminh_rooms";

// Import local simulated room card images and map background
import roomCard1 from "@/assets/room-card-1.png";
import roomCard2 from "@/assets/room-card-2.png";
import roomCard3 from "@/assets/room-card-3.png";
import roomCard4 from "@/assets/room-card-4.png";
import mapBg from "@/assets/map-bg.png";
import fptUniversityImg from "@/assets/fpt-university.jpg";
import droneViewImg from "@/assets/drone-view.png";


export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Tìm kiếm phòng trọ quanh trường học Đà Nẵng — Sâu tìm trọ" },
      { name: "description", content: "Lọc phòng trọ theo trường Bách Khoa, FPT, Kinh Tế... giá rẻ, xác thực 100%." },
    ],
  }),
  component: SearchPage,
});

// Mock database for rooms based on price category to fulfill simulated images matching price levels

interface PopularArea {
  title: string;
  desc: string;
  img: string;
}

interface UniConfig {
  name: string;
  shortName: string;
  district: string;
  priceRange: string;
  image: string;
  avgPrice: string;
  verifiedRate: string;
  streets: string[];
  popularAreas: PopularArea[];
}

const uniConfigs: Record<string, UniConfig> = {
  bachKhoa: {
    name: "Đại học Bách Khoa",
    shortName: "Bách Khoa",
    district: "Liên Chiểu",
    priceRange: "1.2tr - 2tr VND",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    avgPrice: "1.8 Tr / tháng",
    verifiedRate: "89%",
    streets: ["Đường Nguyễn Lương Bằng", "Đường Ngô Sỹ Liên", "Đường Lạc Long Quân", "Đường Âu Cơ", "Đường Đống Đa", "Đường Tô Hiệu"],
    popularAreas: [
      { title: "Đường Nguyễn Lương Bằng", desc: "Ngay trước cổng trường, tiện lợi đi lại học tập", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=120&q=80" },
      { title: "Khu vực Ngô Sỹ Liên", desc: "Sầm uất, tập trung nhiều quán ăn & nhà trọ sinh viên", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  fpt: {
    name: "Đại học FPT Đà Nẵng",
    shortName: "FPT",
    district: "Ngũ Hành Sơn",
    priceRange: "1.5tr - 3.5tr VND",
    image: fptUniversityImg,
    avgPrice: "2.2 Tr / tháng",
    verifiedRate: "85%",
    streets: ["Nam Kỳ Khởi Nghĩa", "Huỳnh Văn Nghệ", "Tôn Thất Thiệp", "Trần Đại Nghĩa", "Mai Đăng Chơn", "Võ Chí Công"],
    popularAreas: [
      { title: "Khu vực Nam Kỳ Khởi Nghĩa", desc: "Sát bên trường, khu căn hộ & trọ mới chất lượng cao", img: droneViewImg },
      { title: "Khu vực Huỳnh Văn Nghệ", desc: "Khoảng cách 2km, nơi tập trung nhiều tổ hợp trọ sinh viên", img: droneViewImg }
    ]
  },
  supham: {
    name: "Đại học Sư Phạm",
    shortName: "Sư Phạm",
    district: "Liên Chiểu",
    priceRange: "1.5tr - 3tr VND",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    avgPrice: "1.9 Tr / tháng",
    verifiedRate: "90%",
    streets: ["Tôn Đức Thắng", "Phạm Như Xương", "Ngô Sỹ Liên", "Âu Cơ", "Hoàng Văn Thái"],
    popularAreas: [
      { title: "Đường Phạm Như Xương", desc: "Nhà trọ giá bình dân, đông đúc sinh viên", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=120&q=80" },
      { title: "Đường Tôn Đức Thắng", desc: "Trục chính sầm uất, di chuyển nhanh tới trường", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  duytan: {
    name: "Đại học Duy Tân",
    shortName: "Duy Tân",
    district: "Hải Châu & Thanh Khê",
    priceRange: "2tr - 4tr VND",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    avgPrice: "2.5 Tr / tháng",
    verifiedRate: "92%",
    streets: ["Nguyễn Văn Linh", "Hàm Nghi", "Quang Trung", "Phan Thanh", "Lê Duẩn"],
    popularAreas: [
      { title: "Đường Nguyễn Văn Linh", desc: "Trung tâm thành phố, tiện nghi đầy đủ nhất", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=120&q=80" },
      { title: "Đường Hàm Nghi", desc: "Khu vực gần hồ, nhiều chung cư mini & studio", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=120&q=80" }
    ]
  }
};


const mappedVanMinh = vanminhRooms.map(r => ({
  id: r.id,
  title: r.title,
  price: r.price,
  area: r.area,
  location: `${r.location.split(',')[0]} • ${r.school}`,
  school: r.school,
  badge: "Xác minh",
  specialBadge: r.specialBadge,
  image: r.image,
  tags: r.tags || [],
  isSaved: false,
  uniKey: r.uniKey
}));

const mockDatabase = {
  bachKhoa: mappedVanMinh.filter(r => r.uniKey === 'bachKhoa'),
  fpt: mappedVanMinh.filter(r => r.uniKey === 'fpt'),
  supham: mappedVanMinh.filter(r => r.uniKey === 'supham'),
  duytan: mappedVanMinh.filter(r => r.uniKey === 'duytan')
};


// fptPriceSimulatorRooms has been removed and replaced with dynamic crawled room adaptation

function SearchPage() {
  const [selectedUni, setSelectedUni] = useState<"bachKhoa" | "fpt" | "supham" | "duytan">("bachKhoa");
  const [showFptPriceFilter, setShowFptPriceFilter] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("2.5tr - 4tr");
  const [savedRooms, setSavedRooms] = useState<string[]>(["bk-01", "bk-02", "bk-03"]);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDetailPage, setCurrentDetailPage] = useState(1);
  const roomsPerPage = 12;
  const detailRoomsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
    setCurrentDetailPage(1);
  }, [selectedUni]);

  useEffect(() => {
    setCurrentDetailPage(1);
  }, [selectedPriceRange]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || "";
      const priceParam = params.get("price") || "";
      
      if (q.toLowerCase().includes("fpt")) {
        setSelectedUni("fpt");
        if (priceParam && priceParam !== "Tất cả mức giá") {
          setShowFptPriceFilter(true);
          if (priceParam.includes("Dưới 2 triệu")) {
            setSelectedPriceRange("Dưới 1.5tr");
          } else if (priceParam.includes("2 triệu - 3 triệu")) {
            setSelectedPriceRange("1.5tr - 2tr");
          } else if (priceParam.includes("3 triệu - 5 triệu")) {
            setSelectedPriceRange("3tr - 4tr");
          } else if (priceParam.includes("Trên 5 triệu")) {
            setSelectedPriceRange("Trên 4tr");
          }
        }
      } else if (q.toLowerCase().includes("bách khoa") || q.toLowerCase().includes("bk")) {
        setSelectedUni("bachKhoa");
      } else if (q.toLowerCase().includes("sư phạm") || q.toLowerCase().includes("sp")) {
        setSelectedUni("supham");
      } else if (q.toLowerCase().includes("duy tân") || q.toLowerCase().includes("dt")) {
        setSelectedUni("duytan");
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleToggleSave = (id: string) => {
    setSavedRooms((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    showToast(savedRooms.includes(id) ? "Đã bỏ lưu phòng!" : "Đã lưu phòng thành công! Bookmark");
  };


  // paginated rooms for main view
  const paginatedRooms = useMemo(() => {
    const baseRooms = mockDatabase[selectedUni] || [];
    const startIndex = (currentPage - 1) * roomsPerPage;
    return baseRooms.slice(startIndex, startIndex + roomsPerPage);
  }, [selectedUni, currentPage]);

  const totalPages = useMemo(() => {
    const baseRooms = mockDatabase[selectedUni] || [];
    return Math.ceil(baseRooms.length / roomsPerPage);
  }, [selectedUni]);

  // filter & paginate rooms for detail price view
  const filteredRealRooms = useMemo(() => {
    const baseRooms = mockDatabase[selectedUni] || [];
    let matched = baseRooms.filter((r) => {
      if (selectedPriceRange === "Dưới 1.5tr") return r.price < 1500000;
      if (selectedPriceRange === "1.5tr - 2tr") return r.price >= 1500000 && r.price <= 2000000;
      if (selectedPriceRange === "2tr - 2.5tr") return r.price > 2000000 && r.price <= 2500000;
      if (selectedPriceRange === "2.5tr - 3tr") return r.price > 2500000 && r.price <= 3000000;
      if (selectedPriceRange === "3tr - 4tr") return r.price > 3000000 && r.price <= 4000000;
      if (selectedPriceRange === "Trên 4tr") return r.price > 4000000;
      return true;
    });

    // If we have fewer than 6 rooms in this price range for this university,
    // let's borrow real rooms from OTHER universities/districts and adapt them!
    if (matched.length < 6) {
      const allOtherRooms = Object.keys(mockDatabase)
        .filter(k => k !== selectedUni)
        .flatMap(k => mockDatabase[k as keyof typeof mockDatabase] || []);
        
      const otherMatched = allOtherRooms.filter((r) => {
        if (selectedPriceRange === "Dưới 1.5tr") return r.price < 1500000;
        if (selectedPriceRange === "1.5tr - 2tr") return r.price >= 1500000 && r.price <= 2000000;
        if (selectedPriceRange === "2tr - 2.5tr") return r.price > 2000000 && r.price <= 2500000;
        if (selectedPriceRange === "2.5tr - 3tr") return r.price > 2500000 && r.price <= 3000000;
        if (selectedPriceRange === "3tr - 4tr") return r.price > 3000000 && r.price <= 4000000;
        if (selectedPriceRange === "Trên 4tr") return r.price > 4000000;
        return true;
      });

      // Adapt other matched rooms to the selected university
      const adaptedOthers = otherMatched.map((r) => {
        const hash = r.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const dist = 300 + (hash % 13) * 100;
        
        let loc = r.location;
        let school = r.school;
        
        if (selectedUni === 'fpt') {
          const locs = [
            "Đường Huỳnh Văn Nghệ, Hòa Hải, Ngũ Hành Sơn",
            "Đường Nam Kỳ Khởi Nghĩa, Hòa Hải, Ngũ Hành Sơn",
            "Đường Trần Đại Nghĩa, Hòa Hải, Ngũ Hành Sơn",
            "Khu đô thị FPT City, Hòa Hải, Ngũ Hành Sơn"
          ];
          const rawStreet = locs[hash % locs.length];
          const origAddr = r.location || "";
          const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
          if (numberMatch) {
            const numPart = numberMatch[1];
            loc = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
          } else {
            loc = `${rawStreet}, Đà Nẵng, Việt Nam`;
          }
          school = `Cách FPT ${dist}m`;
        } else if (selectedUni === 'bachKhoa') {
          const locs = [
            "Đường Đặng Tất, Hòa Khánh Nam, Liên Chiểu",
            "Đường Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu",
            "Đường Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu"
          ];
          const rawStreet = locs[hash % locs.length];
          const origAddr = r.location || "";
          const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
          if (numberMatch) {
            const numPart = numberMatch[1];
            loc = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
          } else {
            loc = `${rawStreet}, Đà Nẵng, Việt Nam`;
          }
          school = `Cách Bách Khoa ${dist}m`;
        } else if (selectedUni === 'supham') {
          const locs = [
            "Đường Nguyễn Viết Xuân, Hòa Khánh Nam, Liên Chiểu",
            "Đường Phạm Như Xương, Hòa Khánh Nam, Liên Chiểu",
            "Đường Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu"
          ];
          const rawStreet = locs[hash % locs.length];
          const origAddr = r.location || "";
          const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
          if (numberMatch) {
            const numPart = numberMatch[1];
            loc = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
          } else {
            loc = `${rawStreet}, Đà Nẵng, Việt Nam`;
          }
          school = `Cách Sư Phạm ${dist}m`;
        } else if (selectedUni === 'duytan') {
          const locs = [
            "Đường Nguyễn Văn Linh, Hải Châu",
            "Đường Quang Trung, Hải Châu",
            "Đường Phan Thanh, Thanh Khê"
          ];
          const rawStreet = locs[hash % locs.length];
          const origAddr = r.location || "";
          const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
          if (numberMatch) {
            const numPart = numberMatch[1];
            loc = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
          } else {
            loc = `${rawStreet}, Đà Nẵng, Việt Nam`;
          }
          school = `Cách Duy Tân ${dist}m`;
        }

        return {
          ...r,
          id: r.id + `-borrowed-${selectedUni}`,
          location: `${loc.split(',')[0]} • ${school}`,
          school: school,
          uniKey: selectedUni
        };
      });

      matched = [...matched, ...adaptedOthers];
    }

    return matched;
  }, [selectedUni, selectedPriceRange]);

  const paginatedFilteredRealRooms = useMemo(() => {
    const startIndex = (currentDetailPage - 1) * detailRoomsPerPage;
    return filteredRealRooms.slice(startIndex, startIndex + detailRoomsPerPage);
  }, [filteredRealRooms, currentDetailPage]);

  // Filter simulator rooms based on selected price pill
  const filteredSimulatorRooms = useMemo(() => {
    return []; // No simulator rooms needed, dynamic adaptation covers it
  }, [selectedPriceRange]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" style={{ backgroundColor: "#f8fafc" }}>
      <SiteHeader />

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#1e293b] text-[#ffffff] px-6 py-3 rounded-full text-xs font-bold shadow-xl border border-slate-700 z-50 animate-bounce flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#ffc700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── MAIN SEARCH SCREEN ── */}
      {!showFptPriceFilter ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-10">
          
          {/* Header Title Section */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Tìm phòng trọ gần trường tại Đà Nẵng
            </h1>
            <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
              Nhanh chóng, tiện lợi và an tâm. Chọn trường đại học của bạn để xem danh sách phòng trọ tốt nhất được chúng tôi xác minh.
            </p>
          </div>

          {/* Horizontal School Pills */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-5">
            {[
              { id: "bachKhoa", label: "ĐH Bách Khoa" },
              { id: "fpt", label: "ĐH FPT" },
              { id: "supham", label: "ĐH Sư phạm" },
              { id: "duytan", label: "ĐH Duy Tân" }
            ].map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUni(uni.id as any)}
                className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all active:scale-95 ${
                  selectedUni === uni.id 
                    ? "bg-brand-yellow text-slate-900 font-extrabold" 
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
                style={selectedUni === uni.id ? { backgroundColor: "var(--brand-yellow)" } : {}}
              >
                {uni.label}
              </button>
            ))}
            {["ĐH Kinh tế", "ĐH Ngoại ngữ", "ĐH Đông Á"].map((u) => (
              <button
                key={u}
                onClick={() => showToast(`Chuyển bộ lọc sang trường ${u}`)}
                className="text-xs font-bold px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
              >
                {u}
              </button>
            ))}
          </div>

          {/* Widget Search Form */}
          <section className="bg-white p-4.5 rounded-2xl shadow-sm border border-slate-100">
            <div className="grid gap-3 sm:grid-cols-12 items-center">
              
              {/* Select School */}
              <div className="sm:col-span-4 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Trường đại học</span>
                <select 
                  value={selectedUni} 
                  onChange={(e) => setSelectedUni(e.target.value as any)} 
                  className="w-full bg-transparent font-bold text-slate-800 text-xs outline-none cursor-pointer"
                >
                  <option value="bachKhoa">Đại học Bách Khoa</option>
                  <option value="fpt">Đại học FPT Đà Nẵng</option>
                  <option value="supham">Đại học Sư phạm</option>
                  <option value="duytan">Đại học Duy Tân</option>
                </select>
              </div>

              {/* Select District */}
              <div className="sm:col-span-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Khu vực</span>
                <select 
                  value={
                    selectedUni === "bachKhoa" || selectedUni === "supham" 
                      ? "Liên Chiểu" 
                      : selectedUni === "fpt" 
                        ? "Ngũ Hành Sơn" 
                        : "Hải Châu"
                  }
                  onChange={(e) => {
                    if (e.target.value === "Liên Chiểu") {
                      setSelectedUni(selectedUni === "supham" ? "supham" : "bachKhoa");
                    } else if (e.target.value === "Ngũ Hành Sơn") {
                      setSelectedUni("fpt");
                    } else {
                      setSelectedUni("duytan");
                    }
                  }}
                  className="w-full bg-transparent font-bold text-slate-800 text-xs outline-none cursor-pointer"
                >
                  <option value="Liên Chiểu">Quận Liên Chiểu</option>
                  <option value="Ngũ Hành Sơn">Quận Ngũ Hành Sơn</option>
                  <option value="Hải Châu">Quận Hải Châu</option>
                </select>
              </div>

              {/* Select Price range */}
              <div className="sm:col-span-3 px-4 py-2">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Mức giá</span>
                <select className="w-full bg-transparent font-bold text-slate-800 text-xs outline-none cursor-pointer">
                  <option>Dưới 2triệu</option>
                  <option>2triệu - 4triệu</option>
                  <option>Trên 4triệu</option>
                </select>
              </div>

              {/* Search trigger button */}
              <div className="sm:col-span-2 flex justify-end">
                <button 
                  onClick={() => showToast("Đang tìm phòng trọ...")}
                  className="h-12 w-12 rounded-full bg-brand-brown hover:opacity-90 flex items-center justify-center text-white justify-self-center sm:justify-self-end shadow-md transition-all active:scale-95 cursor-pointer hover:shadow-lg"
                  style={{ backgroundColor: "var(--brand-brown)" }}
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

                    <div className="space-y-10">
            {/* Banner & Stats Split Grid */}
            <section className="grid gap-6 lg:grid-cols-12 items-stretch text-left">
              {/* Left column: Banner Card (lg:col-span-8) */}
              <div className="lg:col-span-8 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col sm:flex-row items-stretch">
                <div className="sm:w-7/12 p-8 md:p-10 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5A2B] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      🎓 Trường {uniConfigs[selectedUni].name}
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                      Tìm trọ lý tưởng quanh {uniConfigs[selectedUni].name}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                      Hệ thống hỗ trợ sinh viên tìm phòng nhanh, giá tốt và đảm bảo an toàn tuyệt đối với các phòng đã xác minh thực tế.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-full">
                      📍 {uniConfigs[selectedUni].district}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-full">
                      💰 {uniConfigs[selectedUni].priceRange}
                    </span>
                    <span className="flex items-center gap-1 text-slate-850 bg-brand-yellow px-3.5 py-1.5 rounded-full font-extrabold text-[10px] shadow-sm" style={{ backgroundColor: "var(--brand-yellow)" }}>
                      +{mockDatabase[selectedUni]?.length || 0} phòng trống
                    </span>
                  </div>
                </div>
                <div className="sm:w-5/12 bg-slate-100 relative min-h-[200px] overflow-hidden group">
                  <img src={uniConfigs[selectedUni].image} alt="University banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              {/* Right column: Stats and areas (lg:col-span-4) */}
              <div className="lg:col-span-4 flex flex-col gap-6 justify-between text-left">
                {/* Stats */}
                <div className="bg-brand-yellow p-6 rounded-3xl flex-1 flex flex-col justify-between text-slate-850 hover-raise" style={{ backgroundColor: "var(--brand-yellow)" }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-4xl font-extrabold tracking-tight">{mockDatabase[selectedUni]?.length || 0}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">Phòng trống</div>
                    </div>
                    <div>
                      <div className="text-4xl font-extrabold tracking-tight">{uniConfigs[selectedUni].verifiedRate}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">Đã xác minh</div>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-900/10 flex justify-between items-end">
                    <div>
                      <div className="text-2xl font-extrabold tracking-tight text-slate-800">{uniConfigs[selectedUni].avgPrice}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">Giá trung bình khu vực</div>
                    </div>
                    <button
                      onClick={() => {
                        setShowFptPriceFilter(true);
                        setSelectedPriceRange("2.5tr - 3tr");
                      }}
                      className="p-2.5 bg-brand-brown text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                      style={{ backgroundColor: "var(--brand-brown)" }}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Popular areas */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <h3 className="font-bold text-slate-800 text-xs">Khu vực phổ biến</h3>
                  <div className="space-y-2.5">
                    {uniConfigs[selectedUni].popularAreas.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer group">
                        <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img src={item.img} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="ml-2">
                          <h4 className="text-[11px] font-bold text-slate-800 group-hover:text-[#8B5A2B] transition-colors">{item.title}</h4>
                          <p className="text-[9px] text-slate-400 font-medium mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Room Listing Grid with Pagination */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Phòng mới quanh {uniConfigs[selectedUni].name}</h2>
                  <p className="text-[11px] text-slate-500">Cập nhật mới nhất hôm nay</p>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => {
                      setShowFptPriceFilter(true);
                      setSelectedPriceRange("1.5tr - 2tr");
                    }} 
                    className="text-[9px] font-bold px-3 py-1.5 rounded-full bg-brand-yellow text-slate-850"
                    style={{ backgroundColor: "var(--brand-yellow)" }}
                  >
                    Lọc theo giá
                  </button>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover-raise group flex flex-col justify-between">
                    {/* Image Frame */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden image-zoom-container">
                      <img src={room.image} alt={room.title} className="w-full h-full object-cover loaded" />
                      
                      {/* Status badges */}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 text-[9px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: "var(--brand-green-bg)", color: "var(--brand-green-text)" }}>
                        {room.badge}
                      </span>
                      {room.specialBadge && (
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-amber-50 text-brand-brown text-[9px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: "var(--brand-yellow)" }}>
                          {room.specialBadge}
                        </span>
                      )}
                    </div>

                    {/* Info body */}
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Link to="/room/$id" params={{ id: room.id }} className="block">
                          <h3 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-brown transition-colors">
                            {room.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{room.location}</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {room.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-150">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & bookmark */}
                      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                        <span className="font-display font-extrabold text-sm text-[#8B5A2B]">
                          {room.price.toLocaleString("vi-VN")} đ/tháng
                        </span>
                        <button
                          onClick={() => handleToggleSave(room.id)}
                          className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all border ${
                            savedRooms.includes(room.id) 
                              ? "bg-[#ffc700] border-[#ffc700] text-slate-850" 
                              : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-700"
                          }`}
                          style={savedRooms.includes(room.id) ? { backgroundColor: "var(--brand-yellow)", borderColor: "var(--brand-yellow)" } : {}}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Main Room Listing Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold disabled:opacity-40"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentPage === idx + 1
                          ? "bg-brand-brown text-white"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                      style={currentPage === idx + 1 ? { backgroundColor: "var(--brand-brown)" } : {}}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold disabled:opacity-40"
                  >
                    ›
                  </button>
                </div>
              )}
            </section>

            {/* Streets & Map Section */}
            <section className="grid gap-6 md:grid-cols-12 items-stretch">
              {/* Left street tags */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                  🛣️ Tìm theo tuyến đường quanh {uniConfigs[selectedUni].shortName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {uniConfigs[selectedUni].streets.map((st) => (
                    <button 
                      key={st}
                      onClick={() => showToast(`Lọc phòng trên tuyến đường ${st}`)}
                      className="text-[10px] font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-xl transition-all border border-slate-200"
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right quick direction */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 flex flex-col justify-between min-h-[180px]">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Dẫn đường nhanh</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Xem tất cả phòng trọ trên bản đồ quanh khu vực bạn chọn.</p>
                </div>
                
                <button
                  onClick={() => showToast(`Mở bản đồ lớn khu ${uniConfigs[selectedUni].name}...`)}
                  className="w-full py-3.5 bg-brand-brown hover:opacity-90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  style={{ backgroundColor: "var(--brand-brown)" }}
                >
                  <Map className="h-4 w-4" /> Mở bản đồ
                </button>
              </div>
            </section>
          </div>

        </main>
      ) : (
        /* ── FPT DETAILED PRICE FILTER VIEW ── */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-6 animate-fade-in">
          
          {/* Breadcrumbs */}
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <span>Đà Nẵng</span>
            <ChevronRight className="h-3 w-3" />
            <span>Ngũ Hành Sơn</span>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => setShowFptPriceFilter(false)} className="hover:text-slate-700">Gần {uniConfigs[selectedUni].name}</button>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight flex items-center gap-2">
              <button 
                onClick={() => setShowFptPriceFilter(false)} 
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span>Phòng trọ gần Trường {uniConfigs[selectedUni].name}</span>
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Tìm kiếm các phòng trọ, căn hộ dịch vụ khu vực FPT City, Hòa Hải, Điện Ngọc và lân cận cho sinh viên. Môi trường an ninh, giá cả phù hợp từ 2tr - 4tr.
            </p>
          </div>

          {/* Dynamic Price selection Filter bar */}
          <section className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-2 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button className="h-9 px-3 rounded-xl bg-brand-yellow font-bold text-slate-800 text-xs flex items-center gap-1" style={{ backgroundColor: "var(--brand-yellow)" }}>
                <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
              </button>
              {[
                { id: "Dưới 1.5tr", label: "Dưới 1.5tr", icon: "🛏️" },
                { id: "1.5tr - 2tr", label: "1.5tr - 2tr", icon: "🪜" },
                { id: "2tr - 2.5tr", label: "2tr - 2.5tr", icon: "🚪" },
                { id: "2.5tr - 3tr", label: "2.5tr - 3tr", icon: "🛋️" },
                { id: "3tr - 4tr", label: "3tr - 4tr", icon: "📺" },
                { id: "Trên 4tr", label: "Trên 4tr", icon: "👑" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setSelectedPriceRange(pill.id);
                    showToast(`Lọc phòng: ${pill.label}`);
                  }}
                  className={`h-10 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border cursor-pointer ${
                    selectedPriceRange === pill.id 
                      ? "bg-brand-yellow text-slate-900 border-brand-yellow font-extrabold shadow-md scale-102 ring-4 ring-brand-yellow/10" 
                      : "bg-white hover:bg-slate-50 text-slate-500 border-slate-200 hover:scale-[1.03] hover:-translate-y-[1px]"
                  }`}
                  style={selectedPriceRange === pill.id ? { backgroundColor: "var(--brand-yellow)" } : {}}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              ))}
              <button className="h-9 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold">Diện tích</button>
              <button className="h-9 px-3.5 rounded-xl bg-brand-green-bg text-brand-green-text text-xs font-bold flex items-center gap-1 border border-transparent" style={{ backgroundColor: "var(--brand-green-bg)", color: "var(--brand-green-text)" }}>
                ✓ Đã xác minh
              </button>
            </div>
            
            <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <span>Sắp xếp: Mới nhất</span>
            </div>
          </section>

          {/* Sub Location Filters horizontal grid */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {[
              { title: "FPT City", status: "Rất gần", dist: "300m - 500m", bg: "bg-amber-50 border-amber-100" },
              { title: "Hòa Hải", status: "Gần", dist: "800m - 1.2km", bg: "bg-amber-50 border-amber-100" },
              { title: "Điện Ngọc", status: "Phố Trọ", dist: "Trục chính", bg: "bg-blue-50/40 border-blue-100/40" },
              { title: "Ký túc xá", status: "Tiết kiệm", dist: "Gần FPT City", bg: "bg-blue-50/40 border-blue-100/40" }
            ].map((loc) => (
              <div 
                key={loc.title} 
                onClick={() => showToast(`Lọc phòng khu vực ${loc.title}`)}
                className={`p-3.5 rounded-2xl border cursor-pointer hover:-translate-y-0.5 transition-all text-xs font-bold text-slate-700 ${loc.bg}`}
              >
                <div>{loc.title}</div>
                <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-extrabold">
                  <span>{loc.status}</span>
                  <span>{loc.dist}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 2-COLUMN GRID LISTING & MAP */}
          <section className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* Left Column: Room Cards Grid (Dynamic simulation!) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="text-xs font-bold text-slate-400 mb-2">
                Hiển thị <span className="text-slate-800">{filteredRealRooms.length}</span> phòng trọ phù hợp mức giá <span className="text-brand-brown font-extrabold">{selectedPriceRange}</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {paginatedFilteredRealRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover-raise group flex flex-col justify-between">
                    
                    {/* Image */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden image-zoom-container">
                      <img src={room.image} alt={room.title} className="w-full h-full object-cover loaded" />
                      
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-brand-green-bg text-brand-green-text text-[9px] font-extrabold uppercase tracking-wider" style={{ backgroundColor: "var(--brand-green-bg)", color: "var(--brand-green-text)" }}>
                        {room.badge}
                      </span>
                      <button
                        onClick={() => handleToggleSave(room.id)}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md text-slate-400 hover:text-red-500 transition-all active:scale-90"
                      >
                        <Heart className={`h-4.5 w-4.5 ${savedRooms.includes(room.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>{room.location}</span>
                        </div>

                        <Link to="/room/$id" params={{ id: room.id }} className="block">
                          <h3 className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug group-hover:text-brand-brown transition-colors">
                            {room.title}
                          </h3>
                        </Link>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {room.tags.map((tag) => (
                            <span key={tag} className="text-[9px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-150">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price & view details button */}
                      <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Giá thuê từ</span>
                          <span className="font-display font-extrabold text-sm text-[#8B5A2B]">
                            {room.price.toLocaleString("vi-VN")} đ/tháng
                          </span>
                        </div>

                        <Link
                          to="/room/$id"
                          params={{ id: room.id }}
                          className="h-8 w-8 rounded-full bg-slate-50 hover:bg-[#ffc700]/20 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all"
                        >
                          <ChevronRight className="h-4.5 w-4.5" />
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Pagination */}
              {Math.ceil(filteredRealRooms.length / detailRoomsPerPage) > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
                  <button 
                    disabled={currentDetailPage === 1}
                    onClick={() => setCurrentDetailPage(p => Math.max(1, p - 1))}
                    className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  {Array.from({ length: Math.ceil(filteredRealRooms.length / detailRoomsPerPage) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentDetailPage(idx + 1)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentDetailPage === idx + 1
                          ? "bg-brand-brown text-white font-extrabold"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                      style={currentDetailPage === idx + 1 ? { backgroundColor: "var(--brand-brown)" } : {}}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    disabled={currentDetailPage === Math.ceil(filteredRealRooms.length / detailRoomsPerPage)}
                    onClick={() => setCurrentDetailPage(p => Math.min(Math.ceil(filteredRealRooms.length / detailRoomsPerPage), p + 1))}
                    className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </div>
              )}

            </div>

            {/* Right Column: Map & support Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Map view */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-slate-800 text-xs font-bold border-b border-slate-50 pb-2">
                  <span className="flex items-center gap-1"><Map className="h-4 w-4 text-slate-400" /> Xem trên bản đồ</span>
                  <button onClick={() => showToast("Bản đồ lớn...")} className="text-[#8B5A2B] hover:underline">🔍</button>
                </div>

                {/* Map simulator FPT */}
                <div className="h-60 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner bg-cover bg-center" style={{ backgroundImage: `url(${mapBg})` }}>
                  <div className="absolute inset-0 bg-slate-900/10" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="h-8 w-8 bg-brand-yellow rounded-full flex items-center justify-center border-4 border-white shadow-md text-xs animate-pulse" style={{ backgroundColor: "var(--brand-yellow)" }}>📍</div>
                    <span className="bg-slate-800 text-white text-[8px] font-bold px-2 py-0.5 rounded-full mt-1">{uniConfigs[selectedUni].name}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 text-center leading-relaxed">
                  Có <span className="font-bold text-slate-800">{filteredRealRooms.length}</span> phòng đang sẵn sàng trong bán kính 1km quanh {uniConfigs[selectedUni].name}.
                </div>
              </div>

              {/* Support box (dark blue) */}
              <div className="bg-[#112419] p-6 rounded-3xl text-white shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">🛎️</span>
                  <h4 className="font-extrabold text-sm text-[#ffc72c]">Hỗ trợ tìm phòng cho Tân sinh viên</h4>
                </div>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  Bạn chưa tìm được phòng ưng ý? Đội ngũ Sâu tìm trọ sẽ hỗ trợ bạn tìm phòng theo yêu cầu hoàn toàn miễn phí.
                </p>
                <button 
                  onClick={() => showToast("Đăng ký hỗ trợ tìm phòng...")}
                  className="w-full py-3 bg-[#fdfdfd] hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center shadow-sm active:scale-95 transition-all"
                >
                  Đăng ký hỗ trợ ngay
                </button>
              </div>

              {/* Safety banner */}
              <div className="bg-[#f8fafc] border border-slate-200/50 p-4 rounded-2xl flex gap-3 text-slate-500 text-[10px] leading-relaxed">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                <div>
                  <span className="font-bold text-slate-700 block">Giao dịch an toàn</span>
                  <span>Mọi thông tin phòng đã được kiểm duyệt thực tế 100%.</span>
                </div>
              </div>

            </aside>

          </section>

        </main>
      )}

      <SiteFooter />
    </div>
  );
}
