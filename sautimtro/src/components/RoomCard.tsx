import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Star, Wifi, Wind, Zap } from "lucide-react";
import { type Room, formatVND } from "@/lib/rooms";
import { useFavorites } from "@/lib/favorites";
import { useEffect, useRef } from "react";

const amenityIcons: Record<string, typeof Wifi> = {
  "Wifi": Wifi,
  "Wifi tốc độ cao": Wifi,
  "Wifi miễn phí": Wifi,
  "Máy lạnh": Wind,
  "Điện": Zap,
};

export function RoomCard({ room }: { room: Room }) {
  const { has, toggle } = useFavorites();
  const liked = has(room.id);
  const imgRef = useRef<HTMLImageElement>(null);

  /* Trigger Starbucks image fade-in on load */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded"));
    }
  }, []);

  return (
    <article
      className="group relative bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        borderRadius: "12px",                                     /* Starbucks --cardBorderRadius */
        boxShadow: "0 0 0.5px 0 rgba(0,0,0,0.14), 0 1px 1px 0 rgba(0,0,0,0.24)",  /* whisper dual */
        border: "1px solid rgba(26,58,42,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0.5px 0 rgba(0,0,0,0.14), 0 1px 1px 0 rgba(0,0,0,0.24)";
      }}
    >
      {/* Image */}
      <Link to="/room/$id" params={{ id: room.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: "12px 12px 0 0" }}>
          <img
            ref={imgRef}
            src={room.image}
            alt={room.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Rating badge — cream/translucent pill */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 text-xs font-semibold"
            style={{
              background: "rgba(245,243,238,0.92)",
              backdropFilter: "blur(6px)",
              borderRadius: "50px",
              color: "var(--cocoa)",
            }}
          >
            <Star className="h-3 w-3" style={{ color: "var(--honey)", fill: "var(--honey)" }} />
            {room.rating}
          </div>
        </div>
      </Link>

      {/* Heart — circular outlined button (Starbucks 32px circle spec) */}
      <button
        onClick={() => toggle(room.id)}
        aria-label="Lưu yêu thích"
        className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center transition-all"
        style={{
          background: "rgba(245,243,238,0.92)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(26,58,42,0.12)",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
      >
        <Heart
          className="h-4 w-4"
          style={{
            color: liked ? "#c82014" : "var(--cocoa)",
            fill: liked ? "#c82014" : "transparent",
          }}
        />
      </button>

      {/* Card body */}
      <div className="p-4">
        {/* Location */}
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: "rgba(26,58,42,0.55)" }}
        >
          <MapPin className="h-3 w-3" />
          {room.district}, Đà Nẵng
        </div>

        {/* Title */}
        <Link to="/room/$id" params={{ id: room.id }}>
          <h3
            className="mt-1.5 text-base font-semibold line-clamp-2 transition-colors"
            style={{ color: "var(--cocoa)", letterSpacing: "-0.01em" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--leaf)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--cocoa)")}
          >
            {room.title}
          </h3>
        </Link>

        {/* Tags — Starbucks pill style */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {room.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-0.5"
              style={{
                background: "var(--amber-soft)",
                color: "var(--cocoa)",
                borderRadius: "50px",
                border: "1px solid rgba(26,58,42,0.10)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Price + reviews */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div
              className="text-lg font-bold"
              style={{ color: "var(--honey)", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              {formatVND(room.price)}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: "rgba(26,58,42,0.55)" }}>
              /tháng · {room.area}m²
            </div>
          </div>
          <div
            className="text-xs flex items-center gap-1"
            style={{ color: "rgba(26,58,42,0.55)" }}
          >
            <Star className="h-3 w-3" style={{ color: "var(--honey)", fill: "var(--honey)" }} />
            {room.reviews} đánh giá
          </div>
        </div>
      </div>
    </article>
  );
}
