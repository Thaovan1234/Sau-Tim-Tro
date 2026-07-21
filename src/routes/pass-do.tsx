import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  Plus, 
  Info,
  DollarSign,
  Package,
  Calendar,
  Grid,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  Compass,
  ArrowRight,
  Map,
  X,
  Heart,
  Sofa,
  Laptop,
  BookOpen,
  Bike,
  Shirt,
  Trophy,
  Gamepad,
  Gift,
  Flame,
  Eye,
  Filter
} from "lucide-react";
import wormMascot from "@/assets/worm-mascot.png";

interface Product {
  id: string;
  title: string;
  price: number;
  isFree: boolean;
  badge: string;
  location: string;
  school: string;
  category: string;
  image: string;
  seller: string;
  phone: string;
  description: string;
  date: string;
  avatar: string;
}

// Mock products
const initialProducts: Product[] = [
  {
    id: "prod-01",
    title: "Bàn học gỗ gấp gọn gàng MDF tiện lợi",
    price: 120000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Bàn ghế & Nội thất",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80",
    seller: "Tuấn Anh (K19 - Bách Khoa)",
    phone: "0905123456",
    description: "Bàn học gấp gọn gàng làm bằng gỗ MDF chống ẩm tốt, chân thép sơn tĩnh điện cứng cáp. Bàn kích thước 60x40cm, phù hợp đặt trên giường hoặc phòng hẹp. Do đổi phòng trọ có sẵn bàn nên mình pass lại giá rẻ.",
    date: "2 giờ trước",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-02",
    title: "Ghế xoay văn phòng có tựa lưng êm ái",
    price: 280000,
    isFree: false,
    badge: "Mới 95%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Bàn ghế & Nội thất",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=400&q=80",
    seller: "Khánh Linh (K20 - Duy Tân)",
    phone: "0935987654",
    description: "Ghế xoay văn phòng màu đen tựa lưới thoáng mát, ben hơi tăng giảm độ cao hoạt động hoàn hảo. Ghế ngồi rất êm, hỗ trợ chống mỏi lưng khi ngồi học bài lâu. Mình dùng được khoảng 3 tháng.",
    date: "3 giờ trước",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-03",
    title: "Nệm cao su non Thắng Lợi 1m2 x 2m x 10cm",
    price: 350000,
    isFree: false,
    badge: "Mới 90%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Bàn ghế & Nội thất",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80",
    seller: "Minh Quân (K21 - FPT)",
    phone: "0978111222",
    description: "Nệm cao su non Thắng Lợi 1.2m x 2m dày 10cm nằm êm ái, độ đàn hồi cực tốt, không bị sụt lún. Có sẵn vỏ bọc nệm sạch sẽ thơm tho. Mình pass do về quê nghỉ hè không dùng tới.",
    date: "1 ngày trước",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-04",
    title: "Tủ vải quần áo khung gỗ 3 buồng chắc chắn",
    price: 150000,
    isFree: false,
    badge: "Mới 85%",
    location: "Sơn Trà",
    school: "Gần ĐH Ngoại Ngữ",
    category: "Bàn ghế & Nội thất",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    seller: "Hương Giang (K20 - Ngoại Ngữ)",
    phone: "0914888999",
    description: "Tủ vải quần áo khung gỗ 3 buồng 8 ngăn đựng đồ thoải mái. Vải bọc dai bền chống thấm nước, khóa kéo trơn tru. Khung gỗ chắc khỏe hơn khung kim loại thường nhiều lần.",
    date: "1 ngày trước",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-05",
    title: "Nồi cơm điện mini Elmich 1.2L lòng gốm",
    price: 190000,
    isFree: false,
    badge: "Mới 95%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Đồ gia dụng & Bếp",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80",
    seller: "Quốc Đạt (K20 - Bách Khoa)",
    phone: "0905222333",
    description: "Nồi cơm điện Elmich mini dung tích 1.2 lít, lòng nồi phủ gốm chống dính cao cấp an toàn sức khỏe. Phù hợp cho 1-2 người ăn, nấu cơm dẻo ngon, giữ nhiệt lâu. Nồi còn nguyên hộp bảo hành.",
    date: "2 ngày trước",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-06",
    title: "Bếp hồng ngoại Sunhouse siêu nhanh",
    price: 220000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Sư phạm",
    category: "Đồ gia dụng & Bếp",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80",
    seller: "Thanh Hằng (K21 - Sư Phạm)",
    phone: "0905444555",
    description: "Bếp hồng ngoại Sunhouse SHD6011 mặt kính cường lực chịu nhiệt siêu bền, phím bấm cảm ứng nhạy. Bếp không kén nồi, có thể dùng nướng trực tiếp trên mặt bếp. Công suất 2000W nóng cực nhanh.",
    date: "2 ngày trước",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-07",
    title: "Ấm đun nước siêu tốc Philips 1.8L inox 304",
    price: 80000,
    isFree: false,
    badge: "Mới 85%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Đồ gia dụng & Bếp",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80",
    seller: "Minh Quân (K21 - FPT)",
    phone: "0978111222",
    description: "Ấm đun siêu tốc thương hiệu Philips chính hãng, lòng inox 304 không gỉ sét, đun sôi nhanh có chế độ tự động ngắt điện khi nước sôi hoặc khi cạn nước cực kỳ an toàn.",
    date: "3 ngày trước",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-08",
    title: "Kệ chén bát inox 2 tầng úp cực sạch sẽ",
    price: 60000,
    isFree: false,
    badge: "Mới 90%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Đồ gia dụng & Bếp",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    seller: "Khánh Linh (K20 - Duy Tân)",
    phone: "0935987654",
    description: "Kệ úp chén bát bằng chất liệu inox sáng bóng, có khay hứng nước bằng nhựa bên dưới giúp khu bếp luôn khô ráo, sạch sẽ. Kệ 2 tầng xếp được khoảng 12 chén và 6 dĩa lớn.",
    date: "3 ngày trước",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-09",
    title: "Chuột không dây Logitech M220 Silent chính chủ",
    price: 90000,
    isFree: false,
    badge: "Mới 95%",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Thiết bị điện tử",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
    seller: "Đức Huy (K18 - FPT)",
    phone: "0905777888",
    description: "Chuột không dây Logitech M220 màu xám lông chuột, công nghệ Silent Click bấm cực êm không phát ra tiếng động, thích hợp mang lên thư viện hoặc học đêm không ảnh hưởng tới bạn cùng phòng.",
    date: "4 ngày trước",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-10",
    title: "Quạt đứng Senko gió cực mát có remote",
    price: 250000,
    isFree: false,
    badge: "Mới 95%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Thiết bị điện tử",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
    seller: "Tuấn Anh (K19 - Bách Khoa)",
    phone: "0905123456",
    description: "Quạt đứng Senko màu xám, sải cánh rộng 40cm cho gió mát diện rộng. Có bảng điều khiển nút bấm và remote điều khiển từ xa cực tiện lợi. Động cơ bằng đồng chạy êm ru không ồn.",
    date: "4 ngày trước",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-11",
    title: "Tai nghe chụp tai Sony WH-CH510 Bluetooth",
    price: 350000,
    isFree: false,
    badge: "Mới 90%",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Thiết bị điện tử",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    seller: "Khánh Linh (K20 - Duy Tân)",
    phone: "0935987654",
    description: "Tai nghe chụp tai Sony WH-CH510 màu đen, kết nối Bluetooth 5.0 ổn định, pin trâu dùng liên tục 35 tiếng. Chất âm Sony bass ấm tai, nghe nhạc hay học tiếng Anh đều tuyệt vời.",
    date: "5 ngày trước",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-12",
    title: "Đèn học chống cận Điện Quang bảo vệ mắt",
    price: 70000,
    isFree: false,
    badge: "Mới 90%",
    location: "Liên Chiểu",
    school: "Gần ĐH Sư phạm",
    category: "Thiết bị điện tử",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
    seller: "Thành Nam (K19 - Sư Phạm)",
    phone: "0988666555",
    description: "Đèn bàn học sinh chống cận của Điện Quang, thiết kế bóng LED bảo vệ mắt tối đa, không nhấp nháy, ánh sáng phân bố đều chống mỏi mắt khi học tập ban đêm. Khung thân đèn gập mở linh hoạt.",
    date: "5 ngày trước",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-13",
    title: "Giáo trình IELTS Cambridge 15-18 kèm đĩa",
    price: 50000,
    isFree: false,
    badge: "Mới 95%",
    location: "Sơn Trà",
    school: "Gần ĐH Ngoại Ngữ",
    category: "Sách & Học tập",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
    seller: "Thùy Dương (K21 - Ngoại Ngữ)",
    phone: "0905999000",
    description: "Trọn bộ 4 cuốn sách ôn thi IELTS Cambridge từ tập 15 đến tập 18, in màu chất lượng giấy tốt, không viết vẽ bậy. Có file audio nghe gửi qua Zalo hoặc drive cực tiện lợi.",
    date: "6 ngày trước",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-14",
    title: "Bảng viết note tự xóa thông minh kèm bút",
    price: 30000,
    isFree: false,
    badge: "Mới 99%",
    location: "Cẩm Lệ",
    school: "Gần ĐH Kinh Tế",
    category: "Sách & Học tập",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    seller: "Anh Thư (K20 - Kinh Tế)",
    phone: "0932555666",
    description: "Bảng viết note tự xóa thông minh LCD kích thước 10.5 inch, đi kèm bút chuyên dụng. Nhấn một nút xóa toàn bộ màn hình lập tức. Thích hợp viết ghi chú, nháp công thức học bài.",
    date: "6 ngày trước",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-15",
    title: "Xe đạp thể thao cũ phục vụ đi học hàng ngày",
    price: 450000,
    isFree: false,
    badge: "Mới 80%",
    location: "Liên Chiểu",
    school: "Gần ĐH Bách Khoa",
    category: "Xe cộ & Khác",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80",
    seller: "Tấn Sang (K19 - Bách Khoa)",
    phone: "0905333777",
    description: "Xe đạp thể thao Asama cũ khung sườn sắt chắc chắn, bánh xe 26 inch, líp tầng hoạt động trơn tru. Hệ thống phanh trước phanh sau đều ăn tốt, thích hợp làm phương tiện đi học.",
    date: "1 tuần trước",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-16",
    title: "Tài liệu ôn thi đại cương FPT đầy đủ file PDF",
    price: 0,
    isFree: true,
    badge: "Tặng Free",
    location: "Ngũ Hành Sơn",
    school: "Gần ĐH FPT",
    category: "Đồ tặng miễn phí",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
    seller: "Ngọc Hoàng (K19 - FPT)",
    phone: "0905999111",
    description: "Mình tặng lại bộ tài liệu ôn thi các môn đại cương (MAD101, PRO191, CSD201,...) bao gồm slide bài giảng, đề thi thử mẫu và đáp án chi tiết. Mình gửi file qua drive.",
    date: "1 tuần trước",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "prod-17",
    title: "Chậu cây sen đá mini để bàn siêu dễ thương",
    price: 0,
    isFree: true,
    badge: "Tặng Free",
    location: "Hải Châu",
    school: "Gần ĐH Duy Tân",
    category: "Đồ tặng miễn phí",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80",
    seller: "Khánh Linh (K20 - Duy Tân)",
    phone: "0935987654",
    description: "Tặng lại chậu cây sen đá nhỏ xinh xắn để bàn học cho bạn nào thích cây cảnh. Cây khỏe dễ chăm sóc, tưới nước tuần 1 lần là được. Mình tặng kèm đất dinh dưỡng.",
    date: "1 tuần trước",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  }
];

const categoriesWithIcons = [
  { name: "Tất cả", icon: Grid, bgColor: "bg-amber-100 text-amber-700" },
  { name: "Nội thất", icon: Sofa, bgColor: "bg-blue-100 text-blue-700" },
  { name: "Điện tử", icon: Laptop, bgColor: "bg-purple-100 text-purple-700" },
  { name: "Sách & Học tập", icon: BookOpen, bgColor: "bg-green-100 text-green-700" },
  { name: "Đồ gia dụng", icon: Flame, bgColor: "bg-red-100 text-red-700" },
  { name: "Xe cộ", icon: Bike, bgColor: "bg-indigo-100 text-indigo-700" },
  { name: "Thời trang", icon: Shirt, bgColor: "bg-pink-100 text-pink-700" },
  { name: "Thể thao", icon: Trophy, bgColor: "bg-orange-100 text-orange-700" },
  { name: "Giải trí", icon: Gamepad, bgColor: "bg-cyan-100 text-cyan-700" },
  { name: "Đồ miễn phí", icon: Gift, bgColor: "bg-emerald-100 text-emerald-700" }
];

const categoryPills = categoriesWithIcons.map(c => c.name);

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export const Route = createFileRoute("/pass-do")({
  head: () => ({
    meta: [
      { title: "Chợ Pass Đồ Sinh Viên Đà Nẵng — Sâu tìm trọ" },
      { name: "description", content: "Thanh lý đồ dùng phòng trọ, mua lại đồ cũ giá rẻ cho sinh viên Đà Nẵng." },
    ],
  }),
  component: PassDoPage,
});

function PassDoPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchText, setSearchText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  
  // Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Bàn ghế & Nội thất");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("Hải Châu");
  const [newCondition, setNewCondition] = useState("Độ mới: 95%");
  const [isUploading, setIsUploading] = useState(false);

  // New visual states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'seller', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const priceNum = newCategory === "Đồ tặng miễn phí" ? 0 : parseInt(newPrice) || 50000;
    
    // Create new product object
    const newItem = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      price: priceNum,
      isFree: newCategory === "Đồ tặng miễn phí",
      badge: newCondition,
      location: newLocation,
      school: "Gần trường ĐH",
      category: newCategory,
      image: uploadedImage || "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400&q=80",
      seller: "Bạn (Tôi)",
      phone: "0905000000",
      description: `Sản phẩm ${newTitle} do cá nhân tôi thanh lý tại ${newLocation}. Độ mới ${newCondition}. Liên hệ để thỏa thuận nhanh gọn.`,
      date: "Vừa xong",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    };

    setProducts([newItem, ...products]);
    showToast("Đăng tin thanh lý đồ thành công! Tin của bạn đã được duyệt.");
    
    // Reset form
    setNewTitle("");
    setNewPrice("");
    setUploadedImage(null);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Animate progress bar
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Set preview image
          setUploadedImage("https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80");
          showToast("Tải ảnh sản phẩm thành công! (Simulated)");
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSendChatMessage = (text: string) => {
    if (!text.trim() || !selectedProduct) return;
    
    const userMsg = { sender: 'user' as const, text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let reply = "Dạ vâng ạ, bạn có thể nhắn tin qua Zalo hoặc liên hệ trực tiếp số điện thoại của mình nha!";
      const q = text.toLowerCase();
      const isFree = selectedProduct.isFree;
      
      if (q.includes("còn") || q.includes("con")) {
        reply = `Dạ món "${selectedProduct.title}" vẫn còn nha bạn ơi. Khi nào bạn qua xem đồ được nhỉ?`;
      } else if (q.includes("fix") || q.includes("bớt") || q.includes("bot") || q.includes("giảm") || q.includes("giam")) {
        if (isFree) {
          reply = "Món này mình tặng miễn phí cho sinh viên chứ không bán ạ!";
        } else {
          reply = `Hi, giá mình để đã rẻ lắm rồi á. Cơ mà nếu bạn nhiệt tình qua lấy nhanh gọn thì mình bớt thêm 10k-20k xăng xe nha.`;
        }
      } else if (q.includes("địa chỉ") || q.includes("dia chi") || q.includes("đâu") || q.includes("dau")) {
        reply = `Mình ở khu vực ${selectedProduct.location}, gần ${selectedProduct.school}. Bạn qua thì hú mình trước 15p nghen.`;
      } else if (q.includes("xem") || q.includes("hẹn") || q.includes("hen")) {
        reply = `Oki bạn nha, tầm chiều tối 5h30 trở đi mình đi học về là có nhà á. Bạn qua xem thoải mái nha.`;
      } else if (q.includes("mới") || q.includes("moi") || q.includes("tình trạng") || q.includes("tinh trang")) {
        reply = `Sản phẩm ${selectedProduct.badge} như mình ghi á, hình thật mình tự chụp nên bạn yên tâm nha.`;
      }
      
      setChatMessages(prev => [...prev, { sender: 'seller' as const, text: reply }]);
    }, 1500);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "Tất cả" && p.category !== selectedCategory) return false;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f8fafc" }}>
      <SiteHeader />

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#1e293b] text-[#ffffff] px-6 py-3 rounded-full text-xs font-bold shadow-xl border border-slate-700 z-50 animate-bounce flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#ffc700]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-10 space-y-12">
        
        {/* HERO BANNER SECTION */}
        <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="space-y-6 max-w-xl text-left w-full">
            <div className="space-y-2 relative">
              <h1 className="text-2xl md:text-3xl font-black text-slate-805 tracking-tight leading-tight">
                Chợ Pass Đồ
                <br />
                Sinh Viên Đà Nẵng
              </h1>
              {/* Yellow Underline indicator */}
              <div className="w-20 h-1 bg-brand-yellow rounded-full"></div>
              
              <p className="text-[11px] text-slate-550 leading-relaxed max-w-sm font-semibold pt-1">
                Mua bán trực tiếp giữa sinh viên
                <br />
                Giá tốt - Uy tín - Không qua cò
              </p>
            </div>
            
            {/* Search Input Box */}
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-full p-1.5 focus-within:border-brand-yellow shadow-inner w-full max-w-lg">
              <Search className="h-4 w-4 ml-4 text-slate-400 shrink-0" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm bàn học, tủ lạnh, xe máy, sách vở..."
                className="w-full px-3 py-2 text-xs bg-transparent outline-none text-slate-800"
              />
              <button 
                onClick={() => showToast("Đang tìm kiếm sản phẩm...")}
                className="px-5 py-2 rounded-full bg-brand-yellow text-slate-800 font-extrabold text-xs hover:opacity-90 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
                style={{ backgroundColor: "var(--brand-yellow)" }}
              >
                Tìm
              </button>
            </div>
            
            {/* Quick School Filter Buttons */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-600">
                {[
                  { name: "FPT", dist: "1.2km" },
                  { name: "Bách Khoa", dist: "2.1km" },
                  { name: "Duy Tân", dist: "1.8km" },
                  { name: "Ngoại Ngữ", dist: "2.5km" }
                ].map((s) => (
                  <button 
                    key={s.name}
                    onClick={() => {
                      setSearchText(`Gần ĐH ${s.name}`);
                      showToast(`Đang lọc sản phẩm gần trường ĐH ${s.name}`);
                    }}
                    className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-150 rounded-xl px-3 py-2 transition-all cursor-pointer shadow-sm text-left shrink-0 active:scale-95"
                  >
                    <span className="text-xs text-amber-500">📍</span>
                    <div>
                      <p className="text-slate-850 font-extrabold leading-tight">{s.name}</p>
                      <p className="text-[8px] text-slate-400 font-semibold leading-tight">{s.dist}</p>
                    </div>
                  </button>
                ))}
                
                <button 
                  onClick={() => showToast("Chọn các trường đại học khác...")}
                  className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-150 rounded-xl px-3.5 py-3 transition-all cursor-pointer shadow-sm active:scale-95 font-extrabold text-slate-700"
                >
                  Chọn khác ▾
                </button>
              </div>
            </div>
          </div>

          {/* Right illustration */}
          <div className="h-48 w-60 md:h-56 md:w-72 flex items-center justify-center relative shrink-0">
            <img 
              src="/pass_do_hero_mascot.png" 
              alt="Mascot ôm thùng đồ" 
              className="h-full w-auto object-contain loaded" 
            />
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 border-r border-slate-100 last:border-0 py-1">
            <span className="text-base">🔥</span>
            <div className="text-left leading-tight">
              <span className="text-xs font-black text-slate-800">1.254</span>
              <p className="text-[9px] font-bold text-slate-400">món đồ đang bán</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-r border-slate-100 last:border-0 py-1">
            <span className="text-base">👥</span>
            <div className="text-left leading-tight">
              <span className="text-xs font-black text-slate-800">524</span>
              <p className="text-[9px] font-bold text-slate-400">sinh viên online</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 border-r border-slate-100 last:border-0 py-1">
            <span className="text-base">⭐</span>
            <div className="text-left leading-tight">
              <span className="text-xs font-black text-slate-800">97%</span>
              <p className="text-[9px] font-bold text-slate-400">giao dịch thành công</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 last:border-0 py-1">
            <span className="text-base">✅</span>
            <div className="text-left leading-tight">
              <span className="text-xs font-black text-slate-800">100%</span>
              <p className="text-[9px] font-bold text-slate-400">uy tín & an toàn</p>
            </div>
          </div>
        </section>

        {/* CATEGORY ICON CAROUSEL */}
        <section className="space-y-4">
          <div className="flex gap-4 md:gap-6 overflow-x-auto py-4 scrollbar-none justify-start md:justify-center">
            {categoriesWithIcons.map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="flex flex-col items-center gap-2 group shrink-0 outline-none focus:outline-none cursor-pointer"
                >
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
                    isActive 
                      ? "bg-brand-yellow border-brand-yellow text-slate-850 scale-110 font-extrabold shadow-md" 
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  }`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wide transition-colors ${
                    isActive ? "text-slate-800 font-extrabold" : "text-slate-500 group-hover:text-slate-800"
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FILTER BAR SECTION */}
        <section className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => showToast("Mở bộ lọc nâng cao...")}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Bộ lọc</span>
            </button>
            
            {["Giá", "Khoảng cách", "Tình trạng"].map((f) => (
              <button 
                key={f}
                onClick={() => showToast(`Lọc theo ${f}...`)}
                className="flex items-center gap-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span>{f}</span>
                <span className="text-[10px] text-slate-400">▾</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast("Thay đổi thứ tự sắp xếp...")}
              className="flex items-center gap-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span>Sắp xếp: <strong>Mới nhất</strong></span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>
            
            {/* View options */}
            <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button className="p-2 bg-slate-100 text-slate-700 font-extrabold border-r border-slate-200 outline-none">
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => showToast("Đổi sang chế độ xem danh sách...")}
                className="p-2 bg-white hover:bg-slate-50 text-slate-400 outline-none hover:text-slate-700"
              >
                <FileText className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* LATEST PRODUCTS GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Đồ pass mới nhất</h2>
              <p className="text-[11px] text-slate-500">Cập nhật liên tục từ sinh viên quanh bạn</p>
            </div>
            <button 
              onClick={() => showToast("Hiển thị tất cả đồ cũ đang pass...")}
              className="text-xs font-bold text-[#8B5A2B] hover:underline"
            >
              Xem tất cả →
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm">
              <Package className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 mt-4">Chưa có món đồ nào thuộc danh mục này 🥺</p>
              <p className="text-xs text-slate-400 mt-1">Thử chọn danh mục khác nhé.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => {
                    setSelectedProduct(p);
                    setChatMessages([
                      {
                        sender: "seller",
                        text: `Chào bạn, mình là ${p.seller.split(" (")[0]}. Bạn quan tâm đến món đồ "${p.title}" đúng không ạ?`
                      }
                    ]);
                  }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover-raise overflow-hidden flex flex-col justify-between cursor-pointer group text-left"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden image-zoom-container">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover loaded" />
                    
                    {/* Badge overlays */}
                    {p.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-0.75 rounded-md text-[9px] font-extrabold uppercase tracking-wide text-white ${
                        p.badge.toLowerCase().includes("free") || p.badge.toLowerCase().includes("tặng")
                          ? "bg-green-600"
                          : p.badge.toLowerCase().includes("new")
                            ? "bg-amber-500"
                            : p.badge.startsWith("-")
                              ? "bg-red-500"
                              : "bg-blue-600"
                      }`}>
                        {p.badge}
                      </span>
                    )}

                    {/* Heart button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Đã thêm món đồ vào danh sách yêu thích! ❤️");
                      }}
                      className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-slate-500 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm border-0 outline-none cursor-pointer"
                    >
                      <Heart className="h-4 w-4" />
                    </button>

                    {/* Bottom overlay: New indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-white text-[9px] font-extrabold flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-[#ffc700] fill-[#ffc700] animate-pulse" />
                        Mới đăng {p.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xs text-slate-800 line-clamp-1 group-hover:text-brand-brown transition-colors">{p.title}</h3>
                      <div className="flex items-center gap-1 text-[9px] text-slate-400 font-extrabold">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{p.school} ({p.location})</span>
                      </div>
                    </div>

                    {/* Seller details & Price row */}
                    <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
                      <div className="flex items-center gap-2">
                        <img src={p.avatar} alt="avatar" className="h-7 w-7 rounded-full object-cover border border-slate-100" />
                        <div className="text-[9px] font-bold text-slate-700 leading-tight text-left">
                          <p>{p.seller.split(" (")[0]}</p>
                          <p className="text-[8px] text-slate-400 font-medium">{p.seller.includes("(") ? p.seller.split("(")[1].replace(")", "") : "Sinh viên"}</p>
                        </div>
                      </div>
                      
                      <span className="font-display font-extrabold text-xs text-red-600">
                        {p.isFree ? "Miễn phí" : formatVND(p.price)}
                      </span>
                    </div>
                    
                    {/* Views & details action row */}
                    <div className="flex items-center justify-between pt-1 text-[8px] font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5">👁️ 128</span>
                        <span className="flex items-center gap-0.5">❤️ 15</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(p);
                          setChatMessages([
                            {
                              sender: "seller",
                              text: `Chào bạn, mình là ${p.seller.split(" (")[0]}. Bạn quan tâm đến món đồ "${p.title}" đúng không ạ?`
                            }
                          ]);
                        }}
                        className="px-2.5 py-1 bg-brand-yellow hover:opacity-90 text-slate-800 rounded-lg font-extrabold transition-all active:scale-95 text-[9px] cursor-pointer"
                        style={{ backgroundColor: "var(--brand-yellow)" }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION SECTION */}
        <section className="flex items-center justify-center gap-1.5 pt-4">
          <button className="h-8 w-8 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm">&lt;</button>
          {[1, 2, 3, 4, 5].map((pNum) => (
            <button 
              key={pNum}
              onClick={() => showToast(`Chuyển sang trang ${pNum}`)}
              className={`h-8 w-8 rounded-xl font-bold flex items-center justify-center transition-all active:scale-90 shadow-sm cursor-pointer ${
                pNum === 1 
                  ? "bg-brand-yellow text-slate-800 font-black border border-brand-yellow" 
                  : "border border-slate-250 bg-white hover:bg-slate-50 text-slate-500"
              }`}
            >
              {pNum}
            </button>
          ))}
          <span className="text-slate-400 font-bold px-1">...</span>
          <button 
            onClick={() => showToast("Chuyển sang trang 20")}
            className="h-8 w-8 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm"
          >
            20
          </button>
          <button className="h-8 w-8 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 text-slate-500 font-bold flex items-center justify-center cursor-pointer transition-all active:scale-90 shadow-sm">&gt;</button>
        </section>

        {/* TRANSIT COMBOS */}
        <section className="space-y-6">
          <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            <Package className="h-4.5 w-4.5 text-[#ffc700]" /> Combo chuyển trọ giá tốt
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Combo ga nệm", price: 650000, desc: "FPT City • Nệm lò xo + ga thun rời mới giặt" },
              { title: "Bộ nồi niêu", price: 150000, desc: "Hải Châu • 2 nồi inox + 1 chảo chống dính Sunhouse" },
              { title: "Tủ quần áo", price: 350000, desc: "Cẩm Lệ • Tủ nhựa Duy Tân 5 ngăn còn chắc chắn" }
            ].map((combo) => (
              <div 
                key={combo.title} 
                onClick={() => showToast(`Xem chi tiết ${combo.title}`)}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between cursor-pointer group text-left"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-slate-850 group-hover:text-brand-brown transition-colors">{combo.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{combo.desc}</p>
                  <span className="inline-block text-xs font-bold text-[#8B5A2B] mt-1">{formatVND(combo.price)}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-[#ffc700]/20 group-hover:text-slate-700 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POSTING FORM & MAP PREVIEW */}
        <section id="post-form" className="grid gap-6 md:grid-cols-12 items-stretch text-left">
          
          {/* Map area */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm">Xem đồ pass quanh khu trọ</h3>
              <p className="text-[10px] text-slate-500">Khám phá các món đồ đang pass gần trường đại học của bạn.</p>
            </div>
            
            {/* Map Simulator */}
            <div className="bg-[#e2edf2] rounded-2xl flex-1 my-5 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute top-1/3 left-1/3 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">📍 ĐH Bách Khoa</div>
              <div className="absolute bottom-1/3 left-1/2 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">📍 ĐH FPT</div>
              <div className="absolute top-1/2 left-2/3 bg-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">📍 ĐH Ngoại Ngữ</div>
              <span className="text-[10px] font-bold text-slate-400">Bản đồ vị trí đồ cũ thanh lý</span>
            </div>

            <button 
              onClick={() => showToast("Mở bản đồ lớn toàn màn hình...")}
              className="w-full py-3 bg-brand-brown text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
              style={{ backgroundColor: "var(--brand-brown)" }}
            >
              <Map className="h-4 w-4" /> Mở bản đồ
            </button>
          </div>

          {/* Form area */}
          <form onSubmit={handlePostItem} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm md:col-span-6 space-y-4 text-left">
            <div>
              <h3 className="font-bold text-slate-850 text-sm">Bạn sắp chuyển trọ?</h3>
              <p className="text-[10px] text-slate-500">Đăng nhanh món đồ cần pass lại để dọn phòng nhẹ nhàng hơn.</p>
            </div>

            <div className="space-y-3">
              {/* Title input */}
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tên món đồ..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs outline-none text-slate-800"
              />

              <div className="grid grid-cols-2 gap-3">
                {/* Category select */}
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700 cursor-pointer"
                >
                  {categoryPills.filter(p => p !== "Tất cả").map(p => (
                    <option key={p}>{p}</option>
                  ))}
                </select>

                {/* Price input */}
                <input
                  type="number"
                  placeholder="Giá (VNĐ)"
                  disabled={newCategory === "Đồ tặng miễn phí"}
                  value={newCategory === "Đồ tặng miễn phí" ? "" : newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs outline-none text-slate-800 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Location select */}
                <select 
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700 cursor-pointer"
                >
                  <option>Hòa Hải</option>
                  <option>Hòa Khánh</option>
                  <option>Hải Châu</option>
                  <option>Ngũ Hành Sơn</option>
                  <option>Cẩm Lệ</option>
                </select>

                {/* Condition select */}
                <select 
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs outline-none text-slate-700 cursor-pointer"
                >
                  <option>Độ mới: 95%</option>
                  <option>Dùng 3 tháng</option>
                  <option>Còn tốt</option>
                  <option>Hoạt động tốt</option>
                  <option>Mới 90%</option>
                  <option>Tặng lại</option>
                </select>
              </div>

              {/* Upload Box */}
              <div className="space-y-2">
                {isUploading ? (
                  <div className="w-full border border-slate-200 bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-brand-yellow h-full transition-all duration-200" style={{ width: `${uploadProgress}%`, backgroundColor: "var(--brand-yellow)" }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 animate-pulse">Đang tải ảnh lên... {uploadProgress}%</span>
                  </div>
                ) : uploadedImage ? (
                  <div className="w-full border border-slate-200 bg-slate-50 rounded-xl p-3 flex items-center justify-between gap-3 shadow-inner">
                    <div className="flex items-center gap-3">
                      <img src={uploadedImage} alt="Preview" className="h-10 w-10 object-cover rounded-lg border border-slate-200 shadow-sm loaded" />
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-700 truncate max-w-[150px]">san_pham_thanh_ly.jpg</p>
                        <p className="text-[9px] text-slate-400 font-bold">Mô tả: Đã tải lên</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="text-[10px] font-extrabold text-red-500 hover:underline px-2 py-1 cursor-pointer"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSimulateUpload}
                    className="w-full border-2 border-dashed border-slate-200 rounded-xl py-4 flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-all text-slate-400 cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-600">Tải ảnh sản phẩm lên</span>
                  </button>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-yellow text-slate-800 hover:opacity-95 font-bold rounded-xl text-xs flex items-center justify-center shadow-md active:scale-98 cursor-pointer"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              Đăng tin ngay
            </button>
          </form>
        </section>

        {/* SAFETY TIPS */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6 text-left">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm">Giao dịch an toàn hơn</h3>
            <p className="text-[10px] text-slate-500">Mẹo mua bán đồ cũ an tâm và chất lượng dành cho các bạn sinh viên.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { icon: X, title: "Không cọc trước", desc: "Tránh chuyển tiền cọc khi chưa xem đồ trực tiếp.", isCross: true },
              { icon: Users, title: "Gặp nơi đông người", desc: "Giao dịch tại quán cafe, cổng trường đại học.", isCross: false },
              { icon: FileText, title: "Kiểm tra kỹ tình trạng", desc: "Xem đúng độ mới, tính năng hoạt động trước khi mua.", isCross: false },
              { icon: Heart, title: "Báo cáo gian lận", desc: "Sử dụng nút 'Báo cáo' nếu thấy nội dung đáng ngờ.", isCross: false }
            ].map(({ icon: Icon, title, desc, isCross }) => (
              <div key={title} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex gap-3.5 text-left">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isCross 
                    ? "bg-red-50 text-red-500 border-red-100" 
                    : title === "Báo cáo gian lận" 
                      ? "bg-amber-50 text-[#ffc700] border-amber-100"
                      : "bg-blue-50 text-blue-500 border-blue-100"
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{title}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FLOATING CTA: ĐĂNG ĐỒ NGAY */}
      <a
        href="#post-form"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-brand-yellow hover:scale-105 transition-all shadow-2xl flex flex-col items-center justify-center text-slate-800 z-40 select-none animate-float active:scale-95 outline-none hover:shadow-hover border border-amber-300 cursor-pointer"
        style={{ backgroundColor: "var(--brand-yellow)", textDecoration: 'none' }}
      >
        <span className="text-lg font-black leading-tight">+</span>
        <span className="text-[7.5px] font-black uppercase tracking-tight leading-none text-center">Đăng đồ<br/>ngay</span>
      </a>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-modal-bg" 
            onClick={() => setSelectedProduct(null)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full h-full md:w-[90vw] md:h-[85vh] md:max-w-4xl md:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden animate-modal-content z-10 text-left">
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  📦
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">Chi tiết sản phẩm thanh lý</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">Chợ đồ cũ sinh viên Đà Nẵng</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="h-8 w-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
              {/* Left Column: Image & Location */}
              <div className="w-full md:w-1/2 p-5 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col space-y-4 md:overflow-y-auto scrollbar-thin">
                <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 aspect-4/3 shadow-inner">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover loaded"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 text-[#ffc700] text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-sm shadow-md">
                    {selectedProduct.badge}
                  </span>
                </div>
                
                {/* Image Gallery Mockup */}
                <div className="flex gap-2.5">
                  {[
                    selectedProduct.image,
                    "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=150&q=80",
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80"
                  ].map((img, idx) => (
                    <div 
                      key={idx}
                      className="h-14 w-20 rounded-lg overflow-hidden border border-slate-200 hover:border-amber-400 cursor-pointer transition-all active:scale-95 shadow-sm"
                    >
                      <img src={img} alt="gallery" className="h-full w-full object-cover loaded" />
                    </div>
                  ))}
                </div>

                {/* Map preview card */}
                <div className="bg-[#eef2ff] border border-blue-100 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" /> Vị trí giao dịch:
                    </span>
                    <span className="text-blue-700 font-extrabold">{selectedProduct.location}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed text-left">
                    Sản phẩm này nằm ở khu vực <strong>{selectedProduct.location}</strong>, {selectedProduct.school}. Rất tiện lợi cho việc di chuyển xem đồ.
                  </p>
                </div>

                {/* Safety box */}
                <div className="bg-red-50/50 border border-red-100 p-4 rounded-2xl text-[10px] text-red-700 leading-relaxed font-semibold flex gap-2">
                  <span className="text-base shrink-0">⚠️</span>
                  <span className="text-left">
                    <strong>Lưu ý an toàn:</strong> Không chuyển tiền đặt cọc trước dưới mọi hình thức. Hãy gặp mặt trực tiếp để kiểm tra tình trạng đồ dùng trước khi trả tiền.
                  </span>
                </div>
              </div>

              {/* Right Column: Info & Live Chat */}
              <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">
                {/* Product details */}
                <div className="p-5 border-b border-slate-100 space-y-3 shrink-0">
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-[9px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">
                      Đăng {selectedProduct.date}
                    </span>
                  </div>
                  
                  <h2 className="text-sm font-extrabold text-slate-800 leading-snug text-left">
                    {selectedProduct.title}
                  </h2>
                  
                  <div className="text-base font-display font-black text-[#8B5A2B] text-left">
                    {selectedProduct.isFree ? "MIỄN PHÍ" : formatVND(selectedProduct.price)}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-left">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Seller profile */}
                <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-white shadow-md relative shrink-0">
                      <img src={selectedProduct.avatar} alt={selectedProduct.seller} className="h-full w-full object-cover loaded" />
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border border-white"></span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                        {selectedProduct.seller.split(" (")[0]}
                        <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 scale-90 shrink-0">
                          ✓ Sinh viên
                        </span>
                      </h4>
                      <p className="text-[9px] text-slate-400 font-bold">{selectedProduct.seller.includes("(") ? selectedProduct.seller.substring(selectedProduct.seller.indexOf("(")) : ""}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={`tel:${selectedProduct.phone}`}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Mô phỏng cuộc gọi đến ${selectedProduct.seller.split(" (")[0]}: SĐT ${selectedProduct.phone}`);
                      }}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-[10px] hover:bg-slate-50 shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      📞 Gọi điện
                    </a>
                  </div>
                </div>

                {/* Live Chat area */}
                <div className="flex-1 flex flex-col min-h-[220px] md:min-h-0 bg-slate-50 overflow-hidden">
                  <div className="bg-slate-200/50 px-3 py-1.5 text-[9px] text-slate-400 font-extrabold tracking-wider uppercase text-center border-b border-slate-150">
                    💬 Hộp thoại trao đổi nhanh
                  </div>
                  
                  {/* Messages container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto justify-end" : ""}`}
                      >
                        {msg.sender === "seller" && (
                          <div className="h-6 w-6 rounded-full overflow-hidden shrink-0 shadow-sm">
                            <img src={selectedProduct.avatar} alt="seller" className="h-full w-full object-cover loaded" />
                          </div>
                        )}
                        <div className={`p-2 py-1.5 rounded-2xl shadow-sm text-xs leading-relaxed border ${
                          msg.sender === "user" 
                            ? "bg-[#eef2ff] border-blue-50 text-slate-800 rounded-tr-none text-left" 
                            : "bg-white border-slate-100 text-slate-800 rounded-tl-none text-left"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-start gap-2 max-w-[85%] text-slate-400 italic">
                        <div className="h-6 w-6 rounded-full overflow-hidden shrink-0 shadow-sm">
                          <img src={selectedProduct.avatar} alt="seller" className="h-full w-full object-cover loaded" />
                        </div>
                        <div className="bg-white/60 px-3 py-2 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick message helpers */}
                  <div className="px-2 py-1.5 bg-white border-t border-slate-100 flex gap-1 overflow-x-auto scrollbar-none shrink-0">
                    {[
                      "Món này còn không bạn?",
                      "Độ mới bao nhiêu % ạ?",
                      "Có bớt thêm không bạn ơi?",
                      "Chiều nay mình qua xem đồ nhé?"
                    ].map((text) => (
                      <button
                        key={text}
                        onClick={() => handleSendChatMessage(text)}
                        className="text-[9px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-all shrink-0 active:scale-95 cursor-pointer"
                      >
                        {text.replace("?", "").replace(" ạ", "").replace(" bạn ơi", "").replace(" nhé", "")}
                      </button>
                    ))}
                  </div>

                  {/* Chat input form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage(chatInput);
                    }}
                    className="p-2 bg-white border-t border-slate-150 flex gap-2 shrink-0"
                  >
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none text-slate-800"
                    />
                    <button 
                      type="submit"
                      className="px-3 bg-brand-yellow text-slate-800 font-bold rounded-xl text-xs active:scale-95 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
