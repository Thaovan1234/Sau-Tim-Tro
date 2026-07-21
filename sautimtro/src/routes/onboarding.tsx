import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  GraduationCap, 
  Home, 
  Mail, 
  Lock, 
  Check, 
  Upload, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  User,
  ShieldCheck,
  FileText
} from "lucide-react";
import wormMascot from "@/assets/worm-mascot.png";
import expression1 from "@/assets/expression-1.jpg";
import expression2 from "@/assets/expression-2.jpg";
import expression4 from "@/assets/expression-4.jpg";
import expression5 from "@/assets/expression-5.jpg";
import expression6 from "@/assets/expression-6.jpg";
import expression8 from "@/assets/expression-8.jpg";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Đăng nhập & Xác thực — Sâu tìm trọ" },
      { name: "description", content: "Đăng nhập và xác thực tài khoản sinh viên hoặc chủ trọ của bạn." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"student" | "landlord">("student");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [frontCardUploaded, setFrontCardUploaded] = useState(false);
  const [backCardUploaded, setBackCardUploaded] = useState(false);
  
  const navigate = useNavigate();

  const getBackgroundImage = () => {
    if (step === 1) return expression6; // Thinking
    if (step === 2) return activeTab === "login" ? expression2 : expression4; // Login vs Register
    if (step === 3) {
      if (frontCardUploaded || backCardUploaded) return expression5; // Angry/Focused
      return expression8; // Worried/Sweating
    }
    if (step === 4) return expression1; // Surprised/Excited
    return expression6;
  };

  const handleRoleSelect = (selectedRole: "student" | "landlord") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmail(role === "student" ? "hoangphu.student@fpt.edu.vn" : "le.anh.dung@email.com");
    }
    setStep(3);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleCompleteVerification = () => {
    setStep(4);
  };

  const handleGoHome = () => {
    // Save login state in localStorage
    localStorage.setItem("sau_user_logged_in", "true");

    let finalName = fullName.trim();
    let finalEmail = email.trim();

    if (activeTab === "login") {
      const loginEmail = finalEmail || (role === "student" ? "hoangphu.student@fpt.edu.vn" : "le.anh.dung@email.com");
      finalEmail = loginEmail;
      
      const registeredUsers = JSON.parse(localStorage.getItem("sau_registered_users") || "{}");
      if (registeredUsers[loginEmail.toLowerCase()]) {
        finalName = registeredUsers[loginEmail.toLowerCase()];
      } else {
        if (role === "student") {
          finalName = "Hoàng Phú";
        } else {
          finalName = "Lê Anh Dũng";
        }
      }
    } else {
      if (!finalName) {
        finalName = role === "student" ? "Sinh Viên Mới" : "Chủ Trọ Mới";
      }
      if (!finalEmail) {
        finalEmail = role === "student" ? "new.student@student.edu.vn" : "new.landlord@email.com";
      }
      
      // Save to registered database
      const registeredUsers = JSON.parse(localStorage.getItem("sau_registered_users") || "{}");
      registeredUsers[finalEmail.toLowerCase()] = finalName;
      localStorage.setItem("sau_registered_users", JSON.stringify(registeredUsers));
    }
    
    localStorage.setItem("sau_user_name", finalName);
    localStorage.setItem("sau_user_email", finalEmail);

    // Dispatch custom event to let SiteHeader know immediately
    window.dispatchEvent(new CustomEvent("sau_login"));
    // Navigate home
    navigate({ to: "/" });
  };

  // Stepper UI helper
  const renderStepHeader = () => {
    const steps = [
      { num: 1, label: "Chọn vai trò" },
      { num: 2, label: "Tạo tài khoản" },
      { num: 3, label: "Xác thực" },
      { num: 4, label: "Hoàn tất" }
    ];
    return (
      <div className="flex items-center justify-center max-w-xl mx-auto mb-10 px-4">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  step > s.num 
                    ? "bg-[#ffc700] border-[#ffc700] text-slate-900" 
                    : step === s.num 
                      ? "bg-white border-[#ffc700] text-[#ffc700] scale-110 shadow-md" 
                      : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {step > s.num ? <Check className="h-4 w-4" /> : s.num}
              </div>
              <span 
                className={`absolute -bottom-6 text-[10px] whitespace-nowrap font-bold uppercase tracking-wider ${
                  step === s.num ? "text-slate-800" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div 
                className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${
                  step > s.num ? "bg-[#ffc700]" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" style={{ backgroundColor: "#f8fafc" }}>
      <SiteHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16">
        
        {/* Progress Stepper */}
        <div className="w-full max-w-4xl mb-12">
          {renderStepHeader()}
        </div>

        {/* Outer card frame */}
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
          
          {/* STEP 1: CHỌN VAI TRÒ */}
          {step === 1 && (
            <div className="w-full p-8 md:p-12 flex flex-col items-center">
              {/* Mascot */}
              <div className="h-16 w-16 mb-4 animate-float">
                <img src={wormMascot} alt="Sâu" className="h-full w-auto object-contain" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
                Bạn muốn tiếp tục với vai trò nào?
              </h2>
              <p className="text-slate-500 text-sm text-center mb-10 max-w-md">
                Chọn vai trò phù hợp để Sâu Tìm Trọ có thể tạo hồ sơ cho bạn.
              </p>
 
              <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
                {/* Option Student */}
                <div 
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                  onClick={() => handleRoleSelect("student")}
                >
                  <div className="h-14 w-14 rounded-full bg-amber-50 flex items-center justify-center text-[#ffc700] mb-6 border border-amber-100 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Sinh viên / Người thuê phòng</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs flex-1">
                    Tìm phòng gần trường, lưu phòng yêu thích, xem bản đồ và liên hệ phòng phù hợp.
                  </p>
                  <button 
                    onClick={() => handleRoleSelect("student")}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-800 transition-all shadow-sm active:scale-98"
                    style={{ backgroundColor: "var(--brand-yellow)" }}
                  >
                    Tôi là sinh viên
                  </button>
                </div>
 
                {/* Option Landlord */}
                <div 
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                  onClick={() => handleRoleSelect("landlord")}
                >
                  <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                    <Home className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Người đăng phòng</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs flex-1">
                    Đăng tin phòng trọ, quản lý bài đăng và tiếp cận sinh viên đang tìm phòng.
                  </p>
                  <button 
                    onClick={() => handleRoleSelect("landlord")}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all shadow-sm active:scale-98"
                    style={{ backgroundColor: "var(--brand-brown)" }}
                  >
                    Tôi muốn đăng phòng
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TẠO TÀI KHOẢN (TABBED LOGIN) */}
          {step === 2 && (
            <>
              {/* Left Column info */}
              <div className="w-full md:w-5/12 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <button 
                    onClick={() => setStep(1)} 
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" /> Quay lại
                  </button>
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffc700]">Bước 2</span>
                    <h3 className="text-2xl font-extrabold text-slate-800">
                      Tạo tài khoản {role === "student" ? "sinh viên" : "chủ trọ"}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Điền thông tin tài khoản để kết nối với cộng đồng.
                    </p>
                  </div>
                </div>

                {/* Sâu Quote */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-amber-50 shrink-0">
                    <img src={wormMascot} alt="Sâu" className="w-full h-auto" />
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-700 italic font-medium leading-relaxed">
                      "{role === "student" 
                        ? "Chào bạn sinh viên! Hãy để mình giúp bạn tìm một nơi ở thật thoải mái để yên tâm học tập nhé!" 
                        : "Chào chủ trọ! Hãy đăng tin phòng trọ của bạn thật đầy đủ để sớm kết nối được các bạn sinh viên nhé!"
                      }"
                    </p>
                    <span className="block mt-1 font-bold text-[#ffc700]">— Sâu Nhỏ</span>
                  </div>
                </div>
              </div>

              {/* Right Column Login Form */}
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="max-w-md w-full mx-auto">
                  
                  {/* Tabs */}
                  <div className="flex border-b border-slate-100 mb-8">
                    <button
                      onClick={() => setActiveTab("login")}
                      className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all ${
                        activeTab === "login" 
                          ? "border-[#ffc700] text-slate-800 font-extrabold" 
                          : "border-transparent text-slate-400"
                      }`}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => setActiveTab("register")}
                      className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all ${
                        activeTab === "register" 
                          ? "border-[#ffc700] text-slate-800 font-extrabold" 
                          : "border-transparent text-slate-400"
                      }`}
                    >
                      Đăng ký
                    </button>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    {activeTab === "login" ? (
                      <>
                        {/* Email field */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                            {role === "student" ? "Email sinh viên" : "Email liên hệ"}
                          </label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <Mail className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={role === "student" ? "email@student.edu.vn" : "contact@email.com"}
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                              Mật khẩu
                            </label>
                            <a href="#forgot" className="text-xs text-[#ffc700] font-bold hover:underline">
                              Quên mật khẩu?
                            </a>
                          </div>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <Lock className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Remember me check */}
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-300 focus:ring-opacity-25 h-4 w-4" />
                          <span className="text-xs text-slate-500 font-medium select-none">Ghi nhớ đăng nhập</span>
                        </label>
                      </>
                    ) : (
                      <>
                        {/* Full Name field */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                            Họ và tên sinh viên
                          </label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <User className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Nguyễn Văn A"
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Email field */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                            {role === "student" ? "Email sinh viên" : "Email liên hệ"}
                          </label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <Mail className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={role === "student" ? "email@student.edu.vn" : "contact@email.com"}
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                            Mật khẩu mới
                          </label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <Lock className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* Confirm Password field */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                            Xác nhận mật khẩu
                          </label>
                          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                            <Lock className="h-4 w-4 ml-4 text-slate-400" />
                            <input
                              type="password"
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-800 hover:opacity-95 active:scale-98 transition-all shadow-md mt-4"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    >
                      {activeTab === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
                    </button>
                  </form>

                  {/* Social login */}
                  <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <span className="relative bg-white px-3 text-xs text-slate-400 font-bold uppercase tracking-wider">Hoặc tiếp tục với</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        setFullName("Google Student");
                        setEmail("google.student@fpt.edu.vn");
                        setStep(3);
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.486 0-6.314-2.828-6.314-6.314s2.828-6.314 6.314-6.314c1.558 0 2.977.57 4.075 1.5l3.056-3.056C19.227 2.686 15.918 1 12.24 1 5.65 1 .3 6.35.3 12.9s5.35 11.9 11.94 11.9c6.26 0 11.5-4.47 11.5-11.9 0-.756-.07-1.488-.2-2.19l-11.3 2.19z"/>
                      </svg>
                      {activeTab === "login" ? "Google" : "Google"}
                    </button>
                    <button 
                      onClick={() => {
                        setFullName("FB Student");
                        setEmail("fb.student@gmail.com");
                        setStep(3);
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.12          {/* STEP 3: XÁC THỰC THÔNG TIN (VERIFICATION) */}
          {step === 3 && (
            <>
              {/* Left Column info */}
              <div className="w-full md:w-5/12 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <button 
                    onClick={() => setStep(2)} 
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" /> Quay lại
                  </button>
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffc700]">Bước 3</span>
                    <h3 className="text-2xl font-extrabold text-slate-800">
                      Xác thực sinh viên
                    </h3>
                    <p className="text-sm text-slate-500">
                      Chúng tôi cam kết bảo mật mọi thông tin và chỉ xác minh danh tính thực để đảm bảo an toàn cho cộng đồng trọ.
                    </p>
                  </div>
                </div>

                {/* Sâu Quote */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-amber-50 shrink-0">
                    <img src={wormMascot} alt="Sâu" className="w-full h-auto animate-pulse" />
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-700 italic font-medium leading-relaxed">
                      "Chào bạn nhé! Xác thực giúp tin đăng của bạn uy tín hơn và nhận được badge 'Sinh viên uy tín' nữa đó."
                    </p>
                    <span className="block mt-1 font-bold text-[#ffc700]">— Sâu Nhỏ</span>
                  </div>
                </div>
              </div>

              {/* Right Column Verification Form */}
              <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white">
                <div className="max-w-md w-full mx-auto space-y-6">
                  
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
                    Xác thực thông tin Sinh viên
                  </h3>

                  {/* Method 1: Email Verification */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phương pháp 1: Qua Email sinh viên</h4>
                    <div className="flex gap-2">
                      <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-amber-350 focus-within:ring-1 focus-within:ring-amber-100 transition-all">
                        <Mail className="h-4 w-4 ml-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="email@student.edu.vn"
                          defaultValue={email || "hoangphu.student@fpt.edu.vn"}
                          className="w-full px-3 py-3 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-455"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-4 py-3 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all shadow-sm"
                        style={{ backgroundColor: "var(--brand-brown)" }}
                      >
                        {otpSent ? "Gửi lại OTP" : "Gửi mã OTP"}
                      </button>
                    </div>

                    {otpSent && (
                      <div className="flex gap-2 animate-fade-in">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="Nhập mã OTP"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 focus:border-amber-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if(otpCode.length === 6) handleCompleteVerification();
                          }}
                          className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                            otpCode.length === 6 
                              ? "bg-brand-yellow text-slate-800 shadow-sm" 
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                          style={otpCode.length === 6 ? { backgroundColor: "var(--brand-yellow)" } : {}}
                          disabled={otpCode.length !== 6}
                        >
                          Xác thực mã
                        </button>
                      </div>
                    )}
                  </div>

                  {/* OR Divider */}
                  <div className="relative text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hoặc</span>
                  </div>

                  {/* Method 2: ID Card Upload */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phương pháp 2: Tải thẻ sinh viên</h4>
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Front Card */}
                      <button
                        type="button"
                        onClick={() => setFrontCardUploaded(true)}
                        className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all ${
                          frontCardUploaded ? "border-green-500 bg-green-50/20" : "border-slate-200"
                        }`}
                      >
                        <Upload className={`h-6 w-6 ${frontCardUploaded ? "text-green-500" : "text-slate-400"}`} />
                        <span className="text-[11px] font-bold text-slate-700">Mặt trước thẻ</span>
                        {frontCardUploaded && <span className="text-[9px] font-bold text-green-600 uppercase">Đã tải lên ✓</span>}
                      </button>

                      {/* Back Card */}
                      <button
                        type="button"
                        onClick={() => setBackCardUploaded(true)}
                        className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all ${
                          backCardUploaded ? "border-green-500 bg-green-50/20" : "border-slate-200"
                        }`}
                      >
                        <Upload className={`h-6 w-6 ${backCardUploaded ? "text-green-500" : "text-slate-400"}`} />
                        <span className="text-[11px] font-bold text-slate-700">Mặt sau thẻ</span>
                        {backCardUploaded && <span className="text-[9px] font-bold text-green-600 uppercase">Đã tải lên ✓</span>}
                      </button>

                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      * Hình ảnh cần rõ nét, không bị lóa hoặc che mất thông tin quan trọng.
                    </p>
                  </div>

                  {/* Footer buttons */}
                  <div className="pt-4 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleCompleteVerification}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-800 hover:opacity-95 active:scale-98 transition-all shadow-md"
                      style={{ backgroundC          {/* STEP 4: HOÀN TẤT (SUCCESS SUMMARY) */}
          {step === 4 && (
            <>
              {/* Left Column info */}
              <div className="w-full md:w-5/12 bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Hoàn tất</span>
                    <h3 className="text-2xl font-extrabold text-slate-800">
                      Xác thực đã được gửi thành công
                    </h3>
                    <p className="text-sm text-slate-500">
                      Thông tin của bạn đang được Sâu Tìm Trọ kiểm tra để đảm bảo chất lượng và độ tin cậy của tin đăng.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-blue-700 text-xs leading-relaxed">
                    <Clock className="h-5 w-5 shrink-0 text-blue-500" />
                    <div>
                      <p className="font-bold">Thời gian xét duyệt</p>
                      <p className="text-blue-600 mt-0.5">Thường từ 24 - 48 giờ. Bạn sẽ nhận được thông báo khi tài khoản được xác minh.</p>
                    </div>
                  </div>
                </div>

                {/* Sâu Quote */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-amber-50 shrink-0">
                    <img src={wormMascot} alt="Sâu" className="w-full h-auto" />
                  </div>
                  <div className="text-xs">
                    <p className="text-slate-700 italic font-medium leading-relaxed">
                      "Chờ một xíu thời nhé, tớ đang kiểm tra hồ sơ của bạn cực kỳ kỹ lưỡng đây!"
                    </p>
                    <span className="block mt-1 font-bold text-[#ffc700]">— Sâu Tìm Trọ</span>
                  </div>
                </div>
              </div>

              {/* Right Column Success Card */}
              <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-amber-50/10 to-white">
                <div className="max-w-md w-full mx-auto text-center space-y-6">
                  
                  {/* Verified Icon badge */}
                  <div className="mx-auto h-16 w-16 bg-[#ffc700]/10 rounded-full flex items-center justify-center text-[#ffc700] border-4 border-white shadow-md">
                    <ShieldCheck className="h-9 w-9" />
                  </div>

                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-[#8B5A2B] text-[10px] font-extrabold uppercase tracking-wider">
                      Đang chờ duyệt
                    </span>
                    <h4 className="text-xl font-extrabold text-slate-800 pt-2">
                      Hồ sơ xác thực của bạn đã được gửi
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Trong thời gian chờ duyệt, bạn có thể xem lại thông tin tài khoản hoặc quay về trang chủ để khám phá các tiện ích khác của Sâu Tìm Trọ.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left text-xs space-y-3.5 max-w-sm mx-auto shadow-inner">
                    <h5 className="font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 uppercase tracking-wider text-[10px]">Tóm tắt hồ sơ</h5>
                    <div className="grid grid-cols-2 gap-y-2.5">
                      <div>
                        <span className="text-slate-400 font-medium block">Vai trò</span>
                        <span className="text-slate-800 font-bold">{role === "student" ? "Sinh viên" : "Chủ trọ / Landlord"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Email liên hệ</span>
                        <span className="text-slate-800 font-bold truncate block max-w-[150px]">{email || "hoangphu.student@fpt.edu.vn"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Số điện thoại</span>
                        <span className="text-slate-800 font-bold">+84 905 123 456</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Khu vực đăng tin</span>
                        <span className="text-slate-800 font-bold">{role === "student" ? "Ngũ Hành Sơn, ĐN" : "Hòa Khánh, Liên Chiểu"}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Thời gian gửi: 18:52 - Ngày 07/06/2026</span>
                    </div>
                  </div>

                  {/* Navigation actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
                    <button
                      onClick={handleGoHome}
                      className="flex-1 py-3 px-5 rounded-xl font-bold text-slate-800 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-sm text-xs cursor-pointer"
                      style={{ backgroundColor: "var(--brand-yellow)" }}
                    >
                      <Home className="h-4 w-4" />
                      <span>Về trang chủ</span>
                    </button>
                    <button
                      onClick={handleGoHome}
                      className="flex-1 py-3 px-5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 shadow-sm text-xs cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      <span>Hồ sơ của tôi</span>
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}

        </div>

      </main>
      
      <SiteFooter />
    </div>
  );
}
