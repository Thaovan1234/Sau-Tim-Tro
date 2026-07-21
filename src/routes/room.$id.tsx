import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Star, 
  Check, 
  MessageCircle,
  Clock,
  Ruler,
  AlertCircle,
  GraduationCap,
  Bookmark,
  Send,
  User,
  CheckCircle2,
  X,
  Map,
  ExternalLink,
  Info
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms, formatVND, type Room } from "@/lib/rooms";
import { useFavorites } from "@/lib/favorites";
import { WormMascot } from "@/components/WormMascot";
import { getRoomLandlord, getLandlordReply } from "@/lib/landlords";
import mapBg from "@/assets/map-bg.png";


export const Route = createFileRoute("/room/$id")({
  loader: ({ params }) => {
    // Find the room, strip any -borrowed-uni suffix
    const baseId = params.id.replace(/-borrowed-\w+$/, '');
    const room = rooms.find((r) => r.id === baseId) || rooms[0];
    
    // Extract borrowed uni key if present
    let borrowedUni = null;
    const match = params.id.match(/-borrowed-(\w+)$/);
    if (match) {
      borrowedUni = match[1];
    }
    
    return { room, borrowedUni };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.room.title} — Sâu tìm trọ` },
          { name: "description", content: loaderData.room.description.slice(0, 160) },
        ]
      : [{ title: "Chi tiết phòng — Sâu tìm trọ" }],
  }),
  component: RoomPage,
});

const uniFullAddresses: Record<string, string> = {
  "fpt": "Trường Đại học FPT Đà Nẵng, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
  "bachkhoa": "Trường Đại học Bách khoa - Đại học Đà Nẵng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng, Việt Nam",
  "bachKhoa": "Trường Đại học Bách khoa - Đại học Đà Nẵng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng, Việt Nam",
  "supham": "Trường Đại học Sư phạm - Đại học Đà Nẵng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng, Việt Nam",
  "duytan": "Trường Đại học Duy Tân, Nguyễn Văn Linh, Thanh Khê, Đà Nẵng, Việt Nam",
  "kinhte": "Trường Đại học Kinh tế - Đại học Đà Nẵng, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
  "ngoaingu": "Trường Đại học Ngoại ngữ - Đại học Đà Nẵng, Cẩm Lệ, Đà Nẵng, Việt Nam"
};

const uniCoords: Record<string, [number, number]> = {
  "fpt": [15.975298, 108.253215],
  "bachkhoa": [16.073800, 108.149900],
  "bachKhoa": [16.073800, 108.149900],
  "supham": [16.060100, 108.158500],
  "duytan": [16.060900, 108.213200],
  "kinhte": [16.050600, 108.241500],
  "ngoaingu": [16.037100, 108.210400]
};

const roomCoords: Record<string, [number, number]> = {
  "1 Đường Phan Hành Sơn, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.044711, 108.2399091],
  "115/5 Đỗ Thúc Tịnh, Cam Le, Da Nang, Vietnam, Q. Cẩm Lệ": [16.0248692, 108.2108566],
  "14 Cổ Mân 8, Son Tra, Da Nang, Vietnam, Q. Sơn Trà": [16.0911499, 108.2399954],
  "163A Đường Nguyễn Hoàng, Hai Chau, Da Nang, Vietnam, Q. Hải Châu": [16.0592043, 108.2131439],
  "20 Sơn Thủy Đông 2, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.0151933, 108.256529],
  "21/5 Đặng Thái Thân, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.0085864, 108.2552334],
  "22 Hoài Thanh, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.0473727, 108.2373496],
  "23 Đ. Đá Mọc 4, Hoa Khanh, Da Nang, Vietnam, Q. Hòa Khánh": [16.0502691, 108.1546403],
  "23 Đoàn Quý Phi, Hòa Cường, Hoa Cuong, Da Nang, Vietnam, Q. Hòa Cường": [16.0296021, 108.2198124],
  "28 Trương Chí Cương, Hòa Cường, Hoa Cuong, Da Nang, Vietnam, Q. Hòa Cường": [16.0299514, 108.2255167],
  "40/20 Nguyễn Huy Tưởng, Hoa Khanh, Da Nang, Vietnam, Q. Hòa Khánh": [16.0515825, 108.169028],
  "41 Hoài Thanh, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.0473727, 108.2373496],
  "5 Phạm Nhữ Tăng, Thanh Khe, Da Nang, Vietnam, Q. Thanh Khê": [16.0640278, 108.1901996],
  "65 Đ. Nguyễn Thuật, An Khe, Da Nang, Vietnam, Q. An Khê": [16.0519515, 108.1771156],
  "713 Nguyễn Tất Thành, Thanh Khe, Da Nang, Vietnam, Q. Thanh Khê": [16.0742384, 108.2034894],
  "85 Đ. Nguyễn Hữu Cầu, Ngu Hanh Son, Da Nang, Vietnam, Q. Ngũ Hành Sơn": [16.0094944, 108.2607211],
  "01 Đường Phạm Ngọc Mậu, Thanh Khê District, Da Nang, Vietnam, Q. An Khê": [16.0442846, 108.1885311],
  "1091 Đường Tôn Đản, Hòa Thọ Tây, Cẩm Lệ, Đà Nẵng, Vietnam, Q. Cẩm Lệ": [16.0159706, 108.1898954],
  "11 Đường Đặng Chiêm, Hòa Khánh Bắc, Liên Chiểu, Da Nang, Vietnam, Q. Liên Chiểu": [16.0747459, 108.1308206],
  "280 Đường Trần Hưng Đạo, An Hải, An Hải Tây, Sơn Trà, Da Nang, Vietnam, Q. Sơn Trà": [16.0828327, 108.2288541],
  "84 Đường Khánh An 8, Hòa Khánh Nam, Liên Chiểu, Da Nang, Vietnam, Q. Liên Chiểu": [16.0765052, 108.1488365],
  "K408 Hoàng Diệu, Hải Châu, Đà Nẵng, Việt Nam, Q. Hải Châu": [16.0577373, 108.2143579],
  "120 Đường Phạm Đình Hổ, Binh Tay, Ho Chi Minh, Vietnam, Q. Bình Tây": [16.0784252, 108.1664944],
  "49 Trương Chí Cương, Hòa Cường, Hòa Cường Nam, Hải Châu District, Da Nang, Vietnam, Q. Hải Châu": [16.0299514, 108.2255167],
  "88 Nguyễn Bính, Hòa Minh, Cẩm Lệ, Đà Nẵng, Việt Nam, Q. Hòa Khánh": [16.0585425, 108.1724302],
  "Cẩm Phô, Hội An, Quảng Nam, Vietnam, Q. Thành phố Hội An": [15.8791656, 108.323789]
};

function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function cleanMapAddress(addr?: string): string {
  if (!addr) return "";
  let cleaned = addr;
  // Chuẩn hóa viết tắt Đ., đ., D., d. -> Đường
  cleaned = cleaned.replace(/\b([ĐđDd])\.\s+/g, "Đường ");
  // Chuẩn hóa viết tắt K., k. -> Kiệt
  cleaned = cleaned.replace(/\b([Kk])\.\s+/g, "Kiệt ");
  cleaned = cleaned.replace(/\b([Kk])iệt\s+/g, "Kiệt ");
  
  const lower = cleaned.toLowerCase();
  if (!lower.includes("đà nẵng") && !lower.includes("da nang")) {
    cleaned += ", Đà Nẵng";
  }
  if (!lower.includes("việt nam") && !lower.includes("vietnam")) {
    cleaned += ", Việt Nam";
  }
  return cleaned;
}

function parseDistanceText(schoolText?: string): number {
  if (!schoolText) return 1.0;
  const match = schoolText.match(/(\d+(\.\d+)?)\s*(km|m)/i);
  if (match) {
    let val = parseFloat(match[1]);
    let unit = match[3].toLowerCase();
    if (unit === 'm') {
      return val / 1000;
    }
    return val;
  }
  return 1.0;
}

// Mock chat messages
interface ChatMessage {
  sender: "user" | "landlord";
  text: string;
  time: string;
}

function RoomPage() {
  const { room, borrowedUni } = Route.useLoaderData() as { room: Room; borrowedUni: string | null };
  const { has, toggle } = useFavorites();
  const liked = has(room.id);
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(room.image);
  const [toastMessage, setToastMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [perspective3D, setPerspective3D] = useState(false);

  const [distanceDisplay, setDistanceDisplay] = useState<string>("");
  const [driveTimeDisplay, setDriveTimeDisplay] = useState<string>("");
  const [walkTimeDisplay, setWalkTimeDisplay] = useState<string>("");

  // Dynamic OSRM distance calculation
  useEffect(() => {
    let key = "fpt";
    if (borrowedUni) {
      key = borrowedUni;
    } else if (room.school) {
      const schoolLower = room.school.toLowerCase();
      if (schoolLower.includes("bách khoa") || schoolLower.includes("bach khoa")) key = "bachkhoa";
      else if (schoolLower.includes("fpt")) key = "fpt";
      else if (schoolLower.includes("sư phạm") || schoolLower.includes("su pham")) key = "supham";
      else if (schoolLower.includes("duy tân") || schoolLower.includes("duy tan")) key = "duytan";
      else if (schoolLower.includes("kinh tế") || schoolLower.includes("kinh te")) key = "kinhte";
      else if (schoolLower.includes("ngoại ngữ") || schoolLower.includes("ngoai ngu")) key = "ngoaingu";
    }
    const finalKey = key.toLowerCase();
    const originCoords = uniCoords[finalKey] || uniCoords["fpt"];
    const hash = room.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    let destCoords = [16.073800, 108.149900];
    
    if (borrowedUni && finalKey === 'fpt') {
      const fptCoords = [
        [15.977200, 108.261300], // Huỳnh Văn Nghệ
        [15.971200, 108.256200], // Nam Kỳ Khởi Nghĩa
        [15.976500, 108.250500], // Trần Đại Nghĩa
        [15.972300, 108.262500]  // FPT City
      ];
      destCoords = fptCoords[hash % fptCoords.length];
    } else if (borrowedUni && (finalKey === 'bachkhoa' || finalKey === 'bachKhoa')) {
      const bkCoords = [
        [16.0552, 108.1565], // Đặng Tất
        [16.0718, 108.1432], // Ngô Sĩ Liên
        [16.0740, 108.1512]  // Nguyễn Lương Bằng
      ];
      destCoords = bkCoords[hash % bkCoords.length];
    } else if (borrowedUni && finalKey === 'supham') {
      const spCoords = [
        [16.0612, 108.1523], // Nguyễn Viết Xuân
        [16.0595, 108.1485], // Phạm Như Xương
        [16.0580, 108.1610]  // Tôn Đức Thắng
      ];
      destCoords = spCoords[hash % spCoords.length];
    } else if (borrowedUni && finalKey === 'duytan') {
      const dtCoords = [
        [16.0609, 108.2132], // Nguyễn Văn Linh
        [16.0755, 108.2185], // Quang Trung
        [16.0620, 108.2045]  // Phan Thanh
      ];
      destCoords = dtCoords[hash % dtCoords.length];
    } else {
      const addr = room.address || room.location || "";
      const coords = roomCoords[addr];
      if (coords) {
        destCoords = coords;
      }
    }
    
    // Initial estimation (Haversine * 1.25)
    const straightDist = getHaversineDistance(originCoords[0], originCoords[1], destCoords[0], destCoords[1]);
    const estRoadDist = straightDist * 1.25;
    const estDrive = Math.max(1, Math.round(estRoadDist * 2.5));
    const estWalk = Math.max(1, Math.round(estRoadDist * 12));
    
    setDistanceDisplay(estRoadDist >= 1 ? estRoadDist.toFixed(1) + " km" : (estRoadDist * 1000).toFixed(0) + " m");
    setDriveTimeDisplay("~" + estDrive + " phút");
    setWalkTimeDisplay("~" + estWalk + " phút");
    
    // Fetch OSRM routing
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destCoords[1]},${destCoords[0]}?overview=false`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const realDistKm = route.distance / 1000;
          const realDriveMin = Math.max(1, Math.round(route.duration / 60));
          const realWalkMin = Math.max(1, Math.round(realDistKm * 12));
          
          setDistanceDisplay(realDistKm >= 1 ? realDistKm.toFixed(1) + " km" : route.distance.toFixed(0) + " m");
          setDriveTimeDisplay("~" + realDriveMin + " phút");
          setWalkTimeDisplay("~" + realWalkMin + " phút");
        }
      })
      .catch(err => console.error("OSRM error:", err));
  }, [room, borrowedUni]);

  const landlord = getRoomLandlord(room.id);

  // Sync active image when room changes
  useEffect(() => {
    setActiveImage(room.image);
  }, [room]);

  // Sync initial welcome message when room/landlord changes
  useEffect(() => {
    const welcomeText = getLandlordReply("chào", landlord, room);
    setChatMessages([
      {
        sender: "landlord",
        text: welcomeText,
        time: "Vừa xong"
      }
    ]);
  }, [room, landlord]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: "user",
      text: textToSend,
      time: "Vừa xong"
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate landlord typing and replying
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyText = getLandlordReply(textToSend, landlord, room);
      
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "landlord",
          text: replyText,
          time: "Vừa xong"
        }
      ]);
    }, 1500);
  };

  // Gallery: own photos only (borrowing other rooms caused duplicate images across listings)
  const getEnrichedGallery = () => {
    let galleryList = room.gallery ? [...room.gallery] : [];
    galleryList = galleryList.filter((img): img is string => Boolean(img));
    galleryList = [...new Set(galleryList)];

    if (room.image) {
      galleryList = [room.image, ...galleryList.filter((img) => img !== room.image)];
    }

    // Fallbacks only if this room has too few photos
    const fallbackPhotos = [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80"
    ];
    for (const photo of fallbackPhotos) {
      if (galleryList.length >= 6) break;
      if (!galleryList.includes(photo)) {
        galleryList.push(photo);
      }
    }
    return galleryList;
  };

  const thumbnails = getEnrichedGallery();

  // Room details mapping matching screenshot specs
  const serviceFees = [
    { label: "ĐIỆN", value: "3.500 đ/kWh" },
    { label: "NƯỚC", value: "50.000 đ/người" },
    { label: "CỌC", value: "1 tháng" }
  ];

  // If the room was borrowed, adapt its school, location, and distance values
  let schoolText = room.school;
  let locationText = room.address || room.location || "";
  let uniKey = "fpt";

  if (borrowedUni) {
    const key = borrowedUni.toLowerCase();
    const hash = room.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dist = 300 + (hash % 13) * 100;
    uniKey = key;
    
    if (key === 'fpt') {
      const locs = [
        "Đường Huỳnh Văn Nghệ, Hòa Hải, Ngũ Hành Sơn",
        "Đường Nam Kỳ Khởi Nghĩa, Hòa Hải, Ngũ Hành Sơn",
        "Đường Trần Đại Nghĩa, Hòa Hải, Ngũ Hành Sơn",
        "Khu đô thị FPT City, Hòa Hải, Ngũ Hành Sơn"
      ];
      const rawStreet = locs[hash % locs.length];
      const origAddr = room.address || room.location || "";
      const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
      if (numberMatch) {
        const numPart = numberMatch[1];
        locationText = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
      } else {
        locationText = `${rawStreet}, Đà Nẵng, Việt Nam`;
      }
      schoolText = `Cách FPT ${dist}m`;
    } else if (key === 'bachkhoa' || key === 'bachKhoa') {
      const locs = [
        "Đường Đặng Tất, Hòa Khánh Nam, Liên Chiểu",
        "Đường Ngô Sĩ Liên, Hòa Khánh Bắc, Liên Chiểu",
        "Đường Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu"
      ];
      const rawStreet = locs[hash % locs.length];
      const origAddr = room.address || room.location || "";
      const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
      if (numberMatch) {
        const numPart = numberMatch[1];
        locationText = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
      } else {
        locationText = `${rawStreet}, Đà Nẵng, Việt Nam`;
      }
      schoolText = `Cách Bách Khoa ${dist}m`;
    } else if (key === 'supham') {
      const locs = [
        "Đường Nguyễn Viết Xuân, Hòa Khánh Nam, Liên Chiểu",
        "Đường Phạm Như Xương, Hòa Khánh Nam, Liên Chiểu",
        "Đường Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu"
      ];
      const rawStreet = locs[hash % locs.length];
      const origAddr = room.address || room.location || "";
      const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
      if (numberMatch) {
        const numPart = numberMatch[1];
        locationText = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
      } else {
        locationText = `${rawStreet}, Đà Nẵng, Việt Nam`;
      }
      schoolText = `Cách Sư Phạm ${dist}m`;
    } else if (key === 'duytan') {
      const locs = [
        "Đường Nguyễn Văn Linh, Hải Châu",
        "Đường Quang Trung, Hải Châu",
        "Đường Phan Thanh, Thanh Khê"
      ];
      const rawStreet = locs[hash % locs.length];
      const origAddr = room.address || room.location || "";
      const numberMatch = origAddr.match(/^(Số\s+\d+|Kiệt\s+\d+|Hẻm\s+\d+|\d+[A-Za-z]?)\s+(Đường\s+|đường\s+)?/i);
      if (numberMatch) {
        const numPart = numberMatch[1];
        locationText = `${numPart} ${rawStreet}, Đà Nẵng, Việt Nam`;
      } else {
        locationText = `${rawStreet}, Đà Nẵng, Việt Nam`;
      }
      schoolText = `Cách Duy Tân ${dist}m`;
    }
  } else if (room.school) {
    const schoolLower = room.school.toLowerCase();
    if (schoolLower.includes("bách khoa") || schoolLower.includes("bach khoa")) uniKey = "bachkhoa";
    else if (schoolLower.includes("fpt")) uniKey = "fpt";
    else if (schoolLower.includes("sư phạm") || schoolLower.includes("su pham")) uniKey = "supham";
    else if (schoolLower.includes("duy tân") || schoolLower.includes("duy tan")) uniKey = "duytan";
    else if (schoolLower.includes("kinh tế") || schoolLower.includes("kinh te")) uniKey = "kinhte";
    else if (schoolLower.includes("ngoại ngữ") || schoolLower.includes("ngoai ngu")) uniKey = "ngoaingu";
  }

  const displayAddress = locationText;
  const displaySchool = schoolText;

  const originAddress = uniFullAddresses[uniKey] || uniFullAddresses["fpt"];
  const destinationAddress = displayAddress || "Da Nang";

  let displayOriginName = "Trường học của bạn";
  if (uniKey === "fpt") displayOriginName = "Đại học FPT Đà Nẵng";
  else if (uniKey === "bachkhoa") displayOriginName = "Đại học Bách khoa";
  else if (uniKey === "supham") displayOriginName = "Đại học Sư phạm";
  else if (uniKey === "duytan") displayOriginName = "Đại học Duy Tân";
  else if (uniKey === "kinhte") displayOriginName = "Đại học Kinh tế";
  else if (uniKey === "ngoaingu") displayOriginName = "Đại học Ngoại ngữ";


  const typeParam = mapType === 'satellite' ? '&t=h' : '';
  const mapIframeUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(cleanMapAddress(originAddress))}&daddr=${encodeURIComponent(cleanMapAddress(destinationAddress))}${typeParam}&output=embed`;

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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-10">
        
        {/* Back Link */}
        <Link 
          to="/search" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to list</span>
        </Link>

        {/* MAIN DETAIL GRID */}
        <section className="grid gap-6 lg:grid-cols-12 items-start">
          
          {/* LEFT: GALLERY & SPECS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gallery Frame */}
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white aspect-[16/10] w-full">
                <img 
                  src={activeImage} 
                  alt={room.title} 
                  className="w-full h-full object-cover transition-all duration-300 loaded" 
                />
                <button
                  onClick={() => {
                    toggle(room.id);
                    showToast(liked ? "Đã bỏ lưu phòng này!" : "Đã lưu phòng vào danh sách yêu thích! ❤️");
                  }}
                  className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === thumb ? "border-brand-yellow scale-102" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* TITLE & META CARD */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Nổi bật
                </span>
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Cập nhật 1 giờ trước
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                  {room.title}
                </h1>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{displayAddress}</span>
                </div>
              </div>

              {/* Price & Area bar */}
              <div className="flex items-center gap-4 py-2 border-y border-slate-150 my-2">
                <span className="text-2xl font-display font-extrabold text-[#8B5A2B]">
                  {(room.price || 3500000).toLocaleString("vi-VN")} đ/tháng
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  <Ruler className="h-3.5 w-3.5" /> {room.area || 25}m²
                </span>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiện ích</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(room.amenities || []).map((amenity) => (
                    <div 
                      key={amenity}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700"
                    >
                      <Check className="h-4 w-4 text-[#ffc700] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Fees */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chi phí dịch vụ</h3>
                <div className="grid grid-cols-3 gap-3">
                  {serviceFees.map((fee) => (
                    <div key={fee.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{fee.label}</div>
                      <div className="text-xs font-extrabold text-slate-700 mt-1">{fee.value}</div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-600 leading-relaxed space-y-2 pt-2">
                  <p className="font-bold text-slate-800 mb-2">Thông tin chi tiết:</p>
                  <div className="whitespace-pre-line text-xs text-slate-600 leading-relaxed font-semibold">
                    {room.description}
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION MAP CARD */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Vị trí</h3>
                <button 
                  onClick={() => showToast("Mở bản đồ vị trí phòng trọ...")}
                  className="text-xs font-bold text-[#8B5A2B] hover:underline"
                >
                  Xem bản đồ lớn →
                </button>
              </div>

              {/* Map Canvas */}
              <div className="h-60 bg-[#e2edf2] rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="h-10 w-10 bg-[#ffc700] rounded-full flex items-center justify-center border-4 border-white shadow-md text-base animate-bounce">
                    📍
                  </div>
                  <span className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mt-1.5 shadow-md">
                    Bản đồ khu vực {room.district}
                  </span>
                </div>
              </div>

              {/* School Proximity Box */}
              <div className="bg-[#fff9e6] border border-[#ffc700]/10 rounded-2xl p-4 flex gap-3 text-brand-brown text-xs font-bold">
                <GraduationCap className="h-5 w-5 shrink-0 text-[#ffc700]" />
                <div>
                  <span>Khoảng cách đến trường học</span>
                  <span className="text-slate-500 font-semibold block mt-0.5">{displaySchool || "Lân cận trường đại học"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: LANDLORD CONTACT */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-6">
              
              {/* Landlord Info */}
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full overflow-hidden border border-slate-100 shadow-inner relative">
                  <img src={landlord.avatar} alt={landlord.name} className="h-full w-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-[10px] border-2 border-white">✓</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-800">{landlord.name}</h3>
                  <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-3 py-0.5 rounded-full w-max mx-auto">
                    <CheckCircle2 className="h-3 w-3" /> Đã xác minh danh tính
                  </span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-800 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
                  style={{ backgroundColor: "var(--brand-yellow)" }}
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-current" />
                  <span>Liên hệ qua Zalo</span>
                </button>
                
                <a
                  href={`tel:${landlord.phone}`}
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(`Hotline liên hệ: ${landlord.phone}`);
                    alert(`Đang giả lập cuộc gọi điện thoại đến chủ nhà:\n${landlord.name} - SĐT: ${landlord.phone}`);
                  }}
                  className="w-full py-3 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 shadow-sm text-xs"
                >
                  <svg className="h-4.5 w-4.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Gọi điện: {landlord.phone}</span>
                </a>

                <button
                  onClick={() => {
                    toggle(room.id);
                    showToast(liked ? "Đã bỏ lưu tin!" : "Đã lưu tin thành công!");
                  }}
                  className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 pt-1.5"
                >
                  <Bookmark className={`h-4 w-4 ${liked ? "fill-amber-500 text-amber-500" : ""}`} />
                  <span>{liked ? "Đã lưu tin này" : "Lưu tin này"}</span>
                </button>
              </div>

            </div>

            {/* GOOGLE MAPS 3D PREVIEW CARD */}
            <div 
              onClick={() => setShowMapModal(true)} 
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:scale-[1.02] cursor-pointer relative overflow-hidden transition-all group hover:shadow-md text-left"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-slate-700 font-display">Đo đường đi & khoảng cách</h4>
                <span className="text-[9px] font-extrabold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                  {displaySchool || "Gần trường"}
                </span>
              </div>
              
              {/* Simulated 3D Map frame */}
              <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-150 bg-slate-100 shadow-inner flex items-center justify-center">
                <div 
                  className="absolute inset-0 bg-[#e5e3df] transition-transform duration-500 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${mapBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-slate-900/5 transition-opacity group-hover:bg-slate-900/10"></div>
                
                {/* 3D Perspective Route Line Mockup */}
                <svg className="absolute inset-0 w-full h-full drop-shadow-md" viewBox="0 0 200 100">
                  <circle cx="50" cy="70" r="5" fill="#ffc700" stroke="#fff" strokeWidth={1.5} className="animate-ping" style={{ animationDuration: '2s' }}></circle>
                  <circle cx="50" cy="70" r="4" fill="#ffc700" stroke="#fff" strokeWidth={1.5}></circle>
                  <circle cx="150" cy="30" r="5" fill="#ea4335" stroke="#fff" strokeWidth={1.5}></circle>
                  <path d="M 50 70 Q 100 80, 110 50 T 150 30" fill="none" stroke="#0088ff" strokeWidth={2.5} strokeDasharray="4" className="animate-dash" style={{ strokeDashoffset: 0 }}></path>
                </svg>
                
                {/* Overlay badge for 3D effect */}
                <div className="absolute bottom-2.5 right-2.5 bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white font-extrabold text-[9px] flex items-center gap-1">
                  <span>🗺️ Xem chỉ đường 3D</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
              
              <div className="text-[10px] font-semibold text-slate-500 leading-relaxed text-left flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>Xem bản đồ chỉ đường đi học và đo khoảng cách từ trường học của bạn.</span>
              </div>
            </div>

            {/* Safety Disclaimer */}
            <div className="bg-[#f8fafc] border border-slate-200/50 p-5 rounded-3xl flex gap-3 text-slate-500 text-[10px] leading-relaxed">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
              <span>Luôn yêu cầu xem hợp đồng và kiểm tra phòng trực tiếp trước khi đặt cọc, không chuyển tiền trước khi chưa xác minh.</span>
            </div>
          </aside>

        </section>

        {/* RELATED ROOMS SECTION */}
        <section className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Phòng tương tự gần đây</h2>
            <Link to="/search" className="text-xs font-bold text-[#8B5A2B] hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { id: "sau-01", title: "Phòng trọ Hòa Hải giá rẻ", price: 3500000, area: 20, district: "Hòa Hải", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80", showBadge: true },
              { id: "sau-02", title: "Studio mini gần FPT", price: 4200000, area: 30, district: "Hòa Hải", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", showBadge: false },
              { id: "sau-03", title: "Gác lửng mới xây Hòa Hải", price: 2800000, area: 22, district: "Hòa Hải", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80", showBadge: false },
            ].map((r) => (
              <Link
                key={r.id}
                to="/room/$id"
                params={{ id: r.id }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover-raise flex flex-col justify-between group cursor-pointer text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden image-zoom-container">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover loaded" />
                  {r.showBadge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#ffc700] text-slate-800 text-[9px] font-bold uppercase tracking-wider" style={{ backgroundColor: "var(--brand-yellow)" }}>
                      Mới
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-brown transition-colors">{r.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">{r.district}, Đà Nẵng</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 font-display font-extrabold text-xs text-[#8B5A2B]">
                    <span>{r.price.toLocaleString("vi-VN")} đ/tháng</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">{r.area}m²</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* CHAT WINDOW COMPONENT */}
      {showChat && (
        <div className="fixed bottom-6 right-6 h-[460px] w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-[#0068ff] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white/20">
                <img src={landlord.avatar} alt={landlord.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-xs">{landlord.name} (Chủ trọ)</p>
                <span className="text-[9px] text-emerald-300 font-semibold block mt-0.5">Vừa mới hoạt động</span>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto justify-end" : ""}`}
              >
                {msg.sender === "landlord" && (
                  <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img src={landlord.avatar} alt={landlord.name} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className={`p-2.5 rounded-2xl shadow-sm text-xs leading-snug border ${
                  msg.sender === "user" 
                    ? "bg-[#eef2ff] border-blue-50 text-slate-850 rounded-tr-none" 
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 max-w-[85%] text-slate-400 font-medium italic mt-2">
                <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  <img src={landlord.avatar} className="h-full w-full object-cover" alt="avatar" />
                </div>
                <div className="bg-white/60 p-2.5 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Predefined message quick options */}
          <div className="px-3 py-2 border-t border-slate-100 flex flex-wrap gap-1.5 bg-white overflow-x-auto whitespace-nowrap scrollbar-none">
            {(() => {
              const selfL = landlord.pronounSelf.toLowerCase();
              const selfU = landlord.pronounSelf;
              const userU = landlord.pronounUser;
              const quickReplies = [
                `Chào ${selfL}, phòng còn trống không ạ?`,
                `${selfU} cho ${userU} hỏi cọc phòng bao nhiêu ạ?`,
                `Cho ${userU} đặt lịch xem phòng vào chiều mai với ${selfL}`,
                `Điện nước ở đây tính thế nào vậy ${selfL}?`
              ];
              const quickRepliesLabels = [
                "Còn trống không ạ?",
                "Cọc bao nhiêu ạ?",
                "Đặt lịch xem phòng",
                "Phí điện nước"
              ];
              return quickReplies.map((text, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="text-[9px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-all shrink-0"
                >
                  {quickRepliesLabels[idx]}
                </button>
              ));
            })()}
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(chatInput);
            }} 
            className="p-3 border-t border-slate-100 bg-white flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none text-slate-800"
            />
            <button
              type="submit"
              className="h-8 w-8 bg-brand-yellow rounded-xl text-slate-800 flex items-center justify-center hover:opacity-90 transition-all shadow-sm shrink-0"
              style={{ backgroundColor: "var(--brand-yellow)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

      {/* GOOGLE MAP DISTANCE MODAL */}
      {showMapModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
          {/* Overlay backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-bg" onClick={() => setShowMapModal(false)}></div>
          
          {/* Modal Content */}
          <div className="relative w-full h-full md:w-[85vw] md:h-[80vh] md:max-w-3xl md:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden animate-modal-content z-10 text-left">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Map className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-sm text-slate-800">Đo khoảng cách & Đường đi</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">Chỉ dẫn đường đi từ Trường học của bạn tới Phòng trọ</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMapModal(false)} 
                className="h-8 w-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors active:scale-90"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body (Two Column Layout) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left: Route Info */}
              <div className="w-full md:w-[35%] p-5 border-b md:border-b-0 md:border-r border-slate-100 space-y-5 overflow-y-auto">
                {/* School & Room fields */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Điểm đi (Trường học)</span>
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="text-xs">🏫</span>
                      <span className="text-xs font-bold text-slate-700 truncate" title={originAddress}>{displayOriginName}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Điểm đến (Phòng trọ)</span>
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                      <span className="text-xs">📍</span>
                      <span className="text-xs font-bold text-slate-700 truncate" title={destinationAddress}>{displayAddress}</span>
                    </div>
                  </div>
                </div>
                
                {/* Distance and travel details card */}
                <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Khoảng cách:</span>
                    <span className="font-extrabold text-blue-700">{distanceDisplay}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>🚗 Đi xe máy:</span>
                    <span className="font-extrabold text-blue-700">{driveTimeDisplay}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>🚶 Đi bộ:</span>
                    <span className="font-extrabold text-blue-700">{walkTimeDisplay}</span>
                  </div>
                </div>
                
                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-[10px] font-semibold text-[#8B5A2B] leading-relaxed flex gap-2">
                  <span className="text-base shrink-0">💡</span>
                  <span>Bạn có thể zoom bản đồ, kéo bản đồ để xem lộ trình hoặc xem chỉ dẫn chi tiết.</span>
                </div>
              </div>
              
              {/* Right: Real Google Maps Iframe */}
              <div className="w-full md:w-[65%] min-h-[300px] md:min-h-0 relative bg-slate-100 flex flex-col p-4">
                {/* Map Control Bar */}
                <div className="flex items-center justify-between mb-3 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-150 shadow-sm z-10 text-[11px] gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <span>Kiểu bản đồ:</span>
                    <button 
                      onClick={() => setMapType('roadmap')} 
                      className={`px-2.5 py-1 rounded-lg border transition-all outline-none ${
                        mapType === 'roadmap' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-extrabold' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                      }`}
                    >
                      🗺️ Đường đi
                    </button>
                    <button 
                      onClick={() => setMapType('satellite')} 
                      className={`px-2.5 py-1 rounded-lg border transition-all outline-none ${
                        mapType === 'satellite' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-extrabold' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                      }`}
                    >
                      🛰️ Vệ tinh 3D
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <button 
                      onClick={() => setPerspective3D(!perspective3D)} 
                      className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 outline-none ${
                        perspective3D 
                          ? 'border-[#ffc700] bg-[#fff9e6] text-[#8B5A2B] font-extrabold shadow-sm' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold'
                      }`}
                    >
                      <span>👓 Góc nhìn 3D</span>
                    </button>
                  </div>
                </div>
                
                {/* Map Iframe Wrapper with perspective container */}
                <div 
                  className={`flex-1 relative rounded-2xl overflow-hidden border border-slate-150 bg-white shadow-inner transition-all duration-500 ${
                    perspective3D ? 'map-3d-perspective' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <iframe 
                    className="w-full h-full border-0 absolute inset-0 transition-all" 
                    src={mapIframeUrl} 
                    allowFullScreen 
                    loading="lazy"
                    title="Google Maps Direction"
                  ></iframe>
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
