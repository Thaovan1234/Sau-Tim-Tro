import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import { vanminhRooms } from "./crawled_vanminh_rooms";

export type Room = {
  id: string;
  title: string;
  district: string;
  address: string;
  price: number; // VND/month
  area: number; // m2
  image: string;
  tags: string[];
  rating: number;
  reviews: number;
  description: string;
  amenities: string[];
  school?: string;
  gallery?: string[];
};

const mappedVanMinhRooms: Room[] = vanminhRooms.map(r => ({
  id: r.id,
  title: r.title,
  district: r.district,
  address: r.location,
  price: r.price,
  area: r.area,
  image: r.image,
  tags: r.tags || [],
  rating: 4.8,
  reviews: 15,
  description: r.description,
  amenities: [
    "Wifi",
    "Chỗ để xe",
    "Môi trường văn minh",
    ...(r.tags.includes("Full nội thất") ? ["Máy lạnh", "Nóng lạnh", "Bếp riêng", "Tủ quần áo"] : [])
  ],
  school: r.school,
  gallery: r.gallery
}));

export const rooms: Room[] = mappedVanMinhRooms;

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);
