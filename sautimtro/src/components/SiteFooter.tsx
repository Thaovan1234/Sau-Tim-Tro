import { Link } from "@tanstack/react-router";
import { WormMascot } from "./WormMascot";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  explore: [
    { to: "/search", label: "Tìm phòng trọ" },
    { to: "/search", label: "Phòng nổi bật" },
    { to: "/favorites", label: "Danh sách yêu thích" },
    { to: "/post", label: "Đăng tin cho thuê" },
  ],
  districts: [
    { to: "/search", label: "Hải Châu" },
    { to: "/search", label: "Sơn Trà" },
    { to: "/search", label: "Liên Chiểu" },
    { to: "/search", label: "Ngũ Hành Sơn" },
  ],
};

export function SiteFooter() {
  return (
    /* ── Dark Cocoa Footer — Starbucks House Green bookend pattern ── */
    <footer
      className="mt-0"
      style={{ backgroundColor: "var(--cocoa-deep)" }}
    >
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">

          {/* ── Brand col — col-span-2 ── */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <WormMascot className="h-10 w-10 brightness-200 group-hover:scale-105 transition-transform" />
              <span
                className="font-display text-xl font-bold"
                style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
              >
                Sâu tìm trọ
              </span>
            </Link>

            <p
              className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Sâu nhỏ giúp bạn tìm tổ ấm đáng yêu giữa lòng Đà Nẵng —
              nhanh, dễ và ngọt như mật ong.
            </p>

            {/* Contact */}
            <ul className="mt-6 space-y-2.5">
              {[
                { icon: Mail, text: "hello@sautimtro.vn" },
                { icon: Phone, text: "0905 000 000" },
                { icon: MapPin, text: "Đà Nẵng, Việt Nam" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--honey)" }} />
                  {text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.20)",
                    color: "rgba(255,255,255,0.70)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--honey)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--honey)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.70)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.20)";
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore col ── */}
          <div>
            <h4
              className="font-display text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--honey)", letterSpacing: "0.1em" }}
            >
              Khám phá
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Districts col ── */}
          <div>
            <h4
              className="font-display text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--honey)", letterSpacing: "0.1em" }}
            >
              Theo quận
            </h4>
            <ul className="space-y-3">
              {footerLinks.districts.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        <div
          className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <span>© {new Date().getFullYear()} Sâu tìm trọ — Made with ♥ in Đà Nẵng</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-cream/80 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-cream/80 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-cream/80 transition-colors">Hỗ trợ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
