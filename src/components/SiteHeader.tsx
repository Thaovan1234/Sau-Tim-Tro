import { Link, useNavigate } from "@tanstack/react-router";
import { WormMascot } from "./WormMascot";
import { Heart, Plus, Search, Menu, X, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { AboutModal } from "./AboutModal";

const navLinks = [
  { to: "/search", label: "Tìm phòng" },
  { to: "#about", label: "Về chúng tôi", isAbout: true },
  { to: "/search", label: "Cẩm nang" },
  { to: "/pass-do", label: "Pass đồ", isPass: true },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("Sinh Viên");
  const [userEmail, setUserEmail] = useState("email@student.edu.vn");
  const [surveyCompleted, setSurveyCompleted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const logged = localStorage.getItem("sau_user_logged_in") === "true";
      setIsLoggedIn(logged);
      if (logged) {
        const name = localStorage.getItem("sau_user_name") || "Sinh Viên";
        const email = localStorage.getItem("sau_user_email") || "email@student.edu.vn";
        setUserName(name);
        setUserEmail(email);
        
        const completed = localStorage.getItem(`sau_survey_completed_${email}`) === "true";
        setSurveyCompleted(completed);
      } else {
        setSurveyCompleted(false);
      }
    };
    checkLogin();
    window.addEventListener("sau_login", checkLogin);
    window.addEventListener("storage", checkLogin);
    return () => {
      window.removeEventListener("sau_login", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-profile-menu")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  const handleNavigateToSearch = () => {
    navigate({ to: "/search" });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // Logo goes to home, which is allowed. If survey not complete, they stay on survey.
  };

  return (
    <>
      {/* ── Global Nav — Height and styling matching screenshots ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 flex items-center justify-between gap-4 h-16 md:h-[72px] lg:h-[80px]">

          {/* ── Brand ── */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 flex-shrink-0 group">
            <WormMascot className="h-10 w-10 group-hover:scale-105 transition-transform" animate />
            <div className="leading-tight">
              <div
                className="font-display text-xl font-extrabold text-[#5c4033]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Sâu Tìm Trọ
              </div>
              <div className="text-[11px] text-muted-foreground -mt-0.5 font-medium tracking-wide">
                trọ xinh ở Đà Nẵng
              </div>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold" aria-label="Primary navigation">
            {navLinks.map((l) => {
              if (l.isAbout) {
                return (
                  <button
                    key={l.label}
                    onClick={() => {
                      if (!surveyCompleted) {
                        alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                        return;
                      }
                      setAboutOpen(true);
                    }}
                    className={`px-1 py-2 text-cocoa/80 hover:text-brand-brown hover:scale-105 transition-all cursor-pointer font-bold ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {l.label}
                  </button>
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  disabled={!surveyCompleted}
                  onClick={(e) => {
                    if (!surveyCompleted) {
                      e.preventDefault();
                      alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                    }
                  }}
                  className={`px-1 py-2 text-cocoa/80 hover:text-brand-brown hover:scale-105 transition-all font-bold relative pb-1 border-b-2 border-transparent ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ letterSpacing: "-0.01em" }}
                  activeProps={{
                    className: "text-brand-brown border-brand-yellow font-bold",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <Link
              to="/search"
              disabled={!surveyCompleted}
              onClick={(e) => {
                if (!surveyCompleted) {
                  e.preventDefault();
                  alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                }
              }}
              className={`p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Tìm phòng"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Notification Bell */}
            <button
              className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa relative"
              aria-label="Thông báo"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {/* Favorites (Heart) */}
            <Link
              to="/favorites"
              disabled={!surveyCompleted}
              onClick={(e) => {
                if (!surveyCompleted) {
                  e.preventDefault();
                  alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                }
              }}
              className={`hidden md:inline-flex p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Yêu thích"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Logged in Avatar or Log In button */}
            {isLoggedIn ? (
              <div className="relative user-profile-menu flex items-center">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-all border border-slate-200 animate-fade-in cursor-pointer active:scale-95"
                >
                  <div className="h-7 w-7 rounded-full bg-brand-yellow flex items-center justify-center font-extrabold text-xs text-[#5c4033] shadow-inner">
                    {userName ? (userName.trim().split(/\s+/).length >= 2 ? (userName.trim().split(/\s+/)[0][0] + userName.trim().split(/\s+/)[userName.trim().split(/\s+/).length - 1][0]).toUpperCase() : userName.substring(0, 2).toUpperCase()) : "SV"}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-cocoa max-w-[100px] truncate">{userName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tài khoản sinh viên</p>
                      <p className="text-xs font-bold text-slate-700 truncate" title={userEmail}>{userEmail}</p>
                    </div>
                    <Link
                      to="/onboarding"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-brown transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      Hồ sơ của tôi
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-brown transition-colors"
                    >
                      <Heart className="h-4 w-4 text-slate-400" />
                      Yêu thích
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        localStorage.removeItem("sau_user_logged_in");
                        localStorage.removeItem("sau_user_name");
                        localStorage.removeItem("sau_user_email");
                        localStorage.removeItem("sau_survey_completed");
                        localStorage.removeItem("sau_survey_answers");
                        window.dispatchEvent(new CustomEvent("sau_login"));
                        setDropdownOpen(false);
                        navigate({ to: "/" });
                        window.location.reload();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("sau_open_login", { detail: { tab: "login" } }));
                  }}
                  className="inline-flex items-center px-4 py-[7px] text-sm font-semibold text-cocoa hover:text-brand-brown transition-all"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Đăng nhập
                </button>

                {/* Post Button (Capsule, Greenish Brown) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!surveyCompleted) {
                      alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                      window.dispatchEvent(new CustomEvent("sau_open_login", { detail: { tab: "register" } }));
                      return;
                    }
                    navigate({ to: "/onboarding" });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-[8px] rounded-[50px] bg-brand-brown text-[#ffffff] hover:opacity-90 text-sm font-semibold transition-all active:scale-95 shadow-sm"
                  style={{ letterSpacing: "-0.01em", backgroundColor: "var(--brand-brown)" }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Đăng phòng</span>
                </button>
              </>
            )}

            {/* Hamburger mobile */}
            <button
              className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 transition-colors text-cocoa"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <nav
            className="lg:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((l) => {
              if (l.isAbout) {
                return (
                  <button
                    key={l.label}
                    onClick={() => {
                      if (!surveyCompleted) {
                        alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                        return;
                      }
                      setAboutOpen(true);
                      setMobileOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-cocoa hover:bg-slate-100 transition-colors ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {l.label}
                  </button>
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  disabled={!surveyCompleted}
                  onClick={(e) => {
                    if (!surveyCompleted) {
                      e.preventDefault();
                      alert("Vui lòng hoàn thành đăng nhập/đăng ký và khảo sát trước khi truy cập website!");
                    }
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-cocoa hover:bg-slate-100 transition-colors ${!surveyCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* About Us Modal popup */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onNavigateToSearch={handleNavigateToSearch}
      />
    </>
  );
}
