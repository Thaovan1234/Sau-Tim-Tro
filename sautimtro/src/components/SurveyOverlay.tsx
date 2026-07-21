import { useState, useEffect } from "react";
import {
  GraduationCap, Briefcase, School, MapPin, Building2, Waves, Utensils, HelpCircle,
  Coins, User, Users, UserCheck, Home, Camera, DollarSign, AlertTriangle, ShieldAlert,
  Sun, Moon, Sparkles, Smile, VolumeX, Ban, Trash2, Volume2, Clock, UserPlus,
  Share2, ShoppingBag, FileText, Heart, CheckCircle2, Calculator, Star, X, Pencil, Shield,
  Mail, Lock, ShieldCheck, Check
} from "lucide-react";
import wormMascot from "@/assets/worm-mascot.png";

type OnboardingSurveyProps = {
  onClose?: () => void;
  onComplete: (answers: any) => void;
};

type Option = {
  text: string;
  icon: React.ComponentType<any>;
};

type Question = {
  id: number;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "slider";
  options?: Option[];
  purpose: string;
};

export function SurveyOverlay({ onClose, onComplete }: OnboardingSurveyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [customInputs, setCustomInputs] = useState<Record<number, string>>({});
  const [sliderValue, setSliderValue] = useState(2500000); // 2.5 million VND default

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("sau_user_logged_in") === "true");
  const [authTab, setAuthTab] = useState<"login" | "register">("register");
  const [showUsageQuestion, setShowUsageQuestion] = useState(!isLoggedIn);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const handleOpenLogin = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsLoggedIn(localStorage.getItem("sau_user_logged_in") === "true");
      setShowUsageQuestion(false); // Bypass usage question on header click
      if (customEvent.detail?.tab) {
        setAuthTab(customEvent.detail.tab);
      } else {
        setAuthTab("login");
      }
    };
    const syncLogin = () => {
      const loggedIn = localStorage.getItem("sau_user_logged_in") === "true";
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        setShowUsageQuestion(true);
      }
    };
    window.addEventListener("sau_open_login", handleOpenLogin);
    window.addEventListener("sau_login", syncLogin);
    return () => {
      window.removeEventListener("sau_open_login", handleOpenLogin);
      window.removeEventListener("sau_login", syncLogin);
    };
  }, []);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const emailStr = authEmail.trim().toLowerCase();
    const nameStr = authName.trim();

    if (authTab === "register") {
      if (!nameStr) {
        setAuthError("Vui lòng nhập họ tên.");
        return;
      }
      if (authPassword !== authConfirmPassword) {
        setAuthError("Mật khẩu xác nhận không khớp.");
        return;
      }

      // Save to registered database
      const registeredUsers = JSON.parse(localStorage.getItem("sau_registered_users") || "{}");
      registeredUsers[emailStr] = nameStr;
      localStorage.setItem("sau_registered_users", JSON.stringify(registeredUsers));

      // Log in
      localStorage.setItem("sau_user_logged_in", "true");
      localStorage.setItem("sau_user_email", emailStr);
      localStorage.setItem("sau_user_name", nameStr);
    } else {
      // Login mode
      const registeredUsers = JSON.parse(localStorage.getItem("sau_registered_users") || "{}");
      const name = registeredUsers[emailStr] || "Hoàng Phú";

      // Log in
      localStorage.setItem("sau_user_logged_in", "true");
      localStorage.setItem("sau_user_email", emailStr);
      localStorage.setItem("sau_user_name", name);
    }

    window.dispatchEvent(new CustomEvent("sau_login"));
    setIsLoggedIn(true);
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    const promptMsg = provider === "google" 
      ? "Đăng nhập Google: Nhập email Gmail của bạn để liên kết:" 
      : "Đăng nhập Facebook: Nhập email của bạn để liên kết:";
    const defaultEmail = provider === "google" ? "sv.google@gmail.com" : "sv.facebook@gmail.com";
    const email = window.prompt(promptMsg, defaultEmail);
    if (!email) return;

    const emailStr = email.trim().toLowerCase();
    const username = emailStr.split("@")[0];
    const name = username.split(".").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");

    localStorage.setItem("sau_user_logged_in", "true");
    localStorage.setItem("sau_user_email", emailStr);
    localStorage.setItem("sau_user_name", name);

    window.dispatchEvent(new CustomEvent("sau_login"));

    const isCompleted = localStorage.getItem(`sau_survey_completed_${emailStr}`) === "true";
    if (isCompleted) {
      localStorage.setItem("sau_survey_completed", "true");
      const stored = localStorage.getItem(`sau_survey_answers_${emailStr}`);
      if (stored) {
        localStorage.setItem("sau_survey_answers", stored);
        onComplete(JSON.parse(stored));
      }
    } else {
      setIsLoggedIn(true);
      setCurrentStep(1);
    }
  };

  const questions: Question[] = [
    {
      id: 1,
      title: "Bạn hiện là sinh viên năm mấy?",
      subtitle: "Năm học hiện tại",
      type: "single",
      purpose: "Biết mức độ kinh nghiệm thuê trọ",
      options: [
        { text: "Năm 1", icon: GraduationCap },
        { text: "Năm 2", icon: GraduationCap },
        { text: "Năm 3", icon: GraduationCap },
        { text: "Năm 4+", icon: GraduationCap },
        { text: "Đã đi làm", icon: Briefcase }
      ]
    },
    {
      id: 2,
      title: "Bạn đang học trường nào?",
      subtitle: "Trường đại học của bạn",
      type: "single",
      purpose: "Cá nhân hóa toàn bộ hệ thống",
      options: [
        { text: "FPT University", icon: School },
        { text: "Bách Khoa", icon: School },
        { text: "Kinh Tế", icon: School },
        { text: "Ngoại Ngữ", icon: School },
        { text: "Duy Tân", icon: School },
        { text: "Khác", icon: Pencil }
      ]
    },
    {
      id: 3,
      title: "Bạn muốn ở khu vực nào?",
      subtitle: "Khu vực mong muốn",
      type: "single",
      purpose: "Đề xuất khu vực phù hợp nhất",
      options: [
        { text: "Gần trường nhất", icon: MapPin },
        { text: "Trung tâm thành phố", icon: Building2 },
        { text: "Gần biển", icon: Waves },
        { text: "Gần khu ăn uống", icon: Utensils },
        { text: "Không quan trọng", icon: HelpCircle }
      ]
    },
    {
      id: 4,
      title: "Ngân sách mỗi tháng của bạn?",
      subtitle: "Chi phí thuê phòng hàng tháng",
      type: "slider",
      purpose: "Lọc phòng vừa túi tiền"
    },
    {
      id: 5,
      title: "Bạn muốn ở theo hình thức nào?",
      subtitle: "Hình thức lưu trú",
      type: "single",
      purpose: "Mở nhánh Roommate Matching",
      options: [
        { text: "Ở một mình", icon: User },
        { text: "Ở ghép với bạn bè", icon: Users },
        { text: "Ở ghép với người lạ", icon: UserCheck },
        { text: "Ký túc xá", icon: Home }
      ]
    },
    {
      id: 6,
      title: "Bạn mong chờ điều gì nhất từ Sâu Tìm Trọ?",
      subtitle: "Tính năng mong muốn trải nghiệm (Chọn nhiều)",
      type: "multi",
      purpose: "Thu thập nhu cầu + Tạo trải nghiệm cá nhân hóa",
      options: [
        { text: "Verified Rooms (Phòng trọ thực tế đã xác minh)", icon: CheckCircle2 },
        { text: "Roommate Matching (Gợi ý bạn ở ghép tương đồng)", icon: Users },
        { text: "Smart Map (Bản đồ tìm trọ thông minh quanh trường)", icon: MapPin },
        { text: "Cost Calculator (Ước tính tổng chi phí sinh hoạt)", icon: Calculator },
        { text: "Reviews từ người thuê trước chân thực", icon: Star }
      ]
    }
  ];

  const currentQuestion = questions[currentStep - 1];

  const formatVND = (value: number) => {
    if (value >= 5000000) return "5.000.000+ VNĐ";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
  };

  const handleSelectOption = (optionText: string) => {
    if (currentQuestion.type === "single") {
      setAnswers({ ...answers, [currentQuestion.id]: optionText });
    } else if (currentQuestion.type === "multi") {
      const currentAnswers = answers[currentQuestion.id] || [];
      if (currentAnswers.includes(optionText)) {
        setAnswers({
          ...answers,
          [currentQuestion.id]: currentAnswers.filter((a: string) => a !== optionText)
        });
      } else {
        setAnswers({
          ...answers,
          [currentQuestion.id]: [...currentAnswers, optionText]
        });
      }
    }
  };

  const handleNext = () => {
    // Save state if slider
    let finalAnswers = { ...answers };
    if (currentQuestion.type === "slider") {
      finalAnswers[currentQuestion.id] = sliderValue;
      setAnswers(finalAnswers);
    } else if (currentQuestion.type === "single" && answers[currentQuestion.id] === "Khác") {
      const customVal = customInputs[currentQuestion.id] || "";
      finalAnswers[currentQuestion.id] = `Khác: ${customVal}`;
      setAnswers(finalAnswers);
    }

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      const userEmail = localStorage.getItem("sau_user_email") || "default";
      sessionStorage.setItem(`sau_survey_completed_${userEmail}`, "true");
      localStorage.setItem(`sau_survey_completed_${userEmail}`, "true");
      localStorage.setItem(`sau_survey_answers_${userEmail}`, JSON.stringify(finalAnswers));

      sessionStorage.setItem("sau_survey_completed", "true");
      localStorage.setItem("sau_survey_completed", "true");
      localStorage.setItem("sau_survey_answers", JSON.stringify(finalAnswers));
      
      setIsWaiting(true);
      setTimeout(() => {
        setIsWaiting(false);
        onComplete(finalAnswers);
      }, 2500);
    }
  };

  const isNextDisabled = () => {
    if (currentQuestion.type === "slider") return false;
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "single") {
      if (!answer) return true;
      if (answer === "Khác" && !(customInputs[currentQuestion.id] || "").trim()) return true;
    }
    if (currentQuestion.type === "multi") {
      if (!answer || answer.length === 0) return true;
    }
    return false;
  };

  if (isWaiting) {
    return (
      <div className="w-full py-6 md:py-10 px-4 flex items-center justify-center animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 border border-slate-100 min-h-[400px] animate-slideUp text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#ffc700]/10 rounded-full blur-2xl scale-120 animate-pulse"></div>
            <img 
              src={wormMascot} 
              alt="Sâu Tìm Trọ Mascot" 
              className="relative h-44 w-auto object-contain animate-bounce scale-110" 
              style={{ animationDuration: '1.5s' }}
            />
          </div>
          
          <div className="space-y-3 max-w-xs">
            <h3 className="text-lg font-black text-slate-800 leading-tight">
              Đợi Sâu giúp bạn tìm phòng phù hợp nhé
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Sâu đang phân tích câu trả lời và quét cơ sở dữ liệu để tìm ra căn phòng tốt nhất cho bạn...
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 pt-4">
            <span className="h-2 w-2 rounded-full bg-[#ffc700] animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="h-2 w-2 rounded-full bg-[#ffc700] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="h-2 w-2 rounded-full bg-[#ffc700] animate-bounce" style={{ animationDelay: '0.3s' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-10 px-4 flex items-center justify-center animate-fadeIn">
      {/* Main card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 animate-slideUp min-h-[550px] max-h-[90vh]">
        
        {/* Left Column: Mascot & Info */}
        <div className="w-full md:w-[40%] bg-[#fffdf5] p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 overflow-y-auto">
          
          {/* Bubble speech */}
          <div className="relative p-4 bg-white rounded-2xl border border-amber-100 shadow-sm mb-6 animate-wiggle">
            <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
              Để Sâu hiểu bạn hơn và tìm phòng phù hợp nhất cho bạn nha! 🐛💛
            </p>
            <div className="absolute w-3.5 h-3.5 bg-white rotate-45 border-r border-b border-amber-100 bottom-[-7px] left-10 md:left-auto md:right-10"></div>
          </div>

          {/* 3D Mascot Image */}
          <div className="flex justify-center items-center my-4">
            <img 
              src={wormMascot} 
              alt="Sâu Tìm Trọ Mascot" 
              className="h-40 md:h-52 w-auto object-contain animate-float"
            />
          </div>

          {/* USPs and Security Info */}
          <div className="space-y-4">
            <div className="space-y-2.5">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Sau khi hoàn thành, Sâu sẽ giúp bạn:</p>
              <ul className="space-y-2 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="p-1 bg-amber-50 text-[#8B5A2B] rounded-lg">🏠</span>
                  <span>Tìm phòng phù hợp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="p-1 bg-amber-50 text-[#8B5A2B] rounded-lg">👥</span>
                  <span>Kết nối bạn ở ghép phù hợp</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="p-1 bg-amber-50 text-[#8B5A2B] rounded-lg">📍</span>
                  <span>Gợi ý khu vực & mức giá phù hợp</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-[10px] text-slate-400 leading-relaxed font-semibold">
              <Shield className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Thông tin của bạn được bảo mật và chỉ sử dụng để cá nhân hóa trải nghiệm.</span>
            </div>
          </div>

        </div>

        {/* Right Column: Questions & Options / Auth */}
        {isLoggedIn ? (
          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn">
            
            {/* Stepper with Caterpillar head */}
            <div>
              <div className="relative flex items-center justify-between px-1 mb-8 pt-4">
                {/* Stepper line */}
                <div className="absolute left-0 right-0 h-0.5 bg-slate-100 -z-10 top-1/2 -translate-y-1/2"></div>
                
                {/* Steps */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const step = i + 1;
                  const isActive = step === currentStep;
                  const isCompleted = step < currentStep;
                  return (
                    <div key={step} className="relative flex flex-col items-center">
                      {/* Active worm head overlay */}
                      {isActive && (
                        <div className="absolute top-[-26px] animate-bounce" style={{ animationDuration: '2s' }}>
                          <span className="text-lg">🐛</span>
                        </div>
                      )}
                      <button
                        onClick={() => step <= currentStep && setCurrentStep(step)}
                        disabled={step > currentStep}
                        className={`h-7 w-7 rounded-full text-xs font-black flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-[#ffc700] text-slate-900 border-2 border-[#ffc700] ring-4 ring-[#ffc700]/20 scale-110"
                            : isCompleted
                            ? "bg-slate-200 text-slate-600 cursor-pointer"
                            : "bg-white text-slate-300 border border-slate-200 cursor-not-allowed"
                        }`}
                      >
                        {step}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Subtitle / Step number */}
              <div className="text-xs font-extrabold text-[#ff9800] uppercase tracking-wider mb-1">
                Câu {currentStep} / 6
              </div>

              {/* Question title */}
              <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-6">
                {currentQuestion.title.split(" ").map((word, idx, arr) => {
                  // Check if it's the last word or two to add a wavy underline effect like the user's mock
                  const isKeyword = idx >= arr.length - 2;
                  return (
                    <span key={idx} className={isKeyword ? "relative inline-block" : ""}>
                      {word}{" "}
                      {isKeyword && (
                        <span className="absolute left-0 right-1 bottom-0.5 h-1 bg-amber-200/60 -z-10 rounded-full"></span>
                      )}
                    </span>
                  );
                })}
              </h2>

              {/* Options container */}
              <div className="space-y-3.5 max-h-[38vh] overflow-y-auto pr-1">
                {currentQuestion.type === "slider" ? (
                  /* Budget range slider screen */
                  <div className="py-6 space-y-6">
                    <div className="flex flex-col items-center justify-center p-6 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Dự kiến chi tiêu</span>
                      <span className="text-2xl font-black text-[#8B5A2B]">{formatVND(sliderValue)}</span>
                    </div>
                    
                    <div className="space-y-2 px-2">
                      <input
                        type="range"
                        min={1000000}
                        max={5000000}
                        step={500000}
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ffc700] focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
                        <span>1 Triệu</span>
                        <span>3 Triệu</span>
                        <span>5 Triệu+</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Card Selection options list */
                  currentQuestion.options?.map((option, idx) => {
                    const Icon = option.icon;
                    const isSelected = currentQuestion.type === "single"
                      ? answers[currentQuestion.id] === option.text
                      : (answers[currentQuestion.id] || []).includes(option.text);

                    return (
                      <div key={idx} className="space-y-2">
                        <button
                          onClick={() => handleSelectOption(option.text)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                            isSelected
                              ? "border-[#ffc700] bg-amber-50/20 shadow-sm"
                              : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Radio/Checkbox circle indicator */}
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                              isSelected
                                ? "border-[#ffc700] bg-[#ffc700]"
                                : "border-slate-300 group-hover:border-slate-400"
                            }`}>
                              {isSelected && (
                                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                              )}
                            </div>

                            {/* Icon circle */}
                            <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? "bg-[#ffc700]/10 text-[#8B5A2B]"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>

                            {/* Option text */}
                            <span className={`text-sm font-bold ${
                              isSelected ? "text-slate-800" : "text-slate-600"
                            }`}>
                              {option.text}
                            </span>
                          </div>
                        </button>

                        {/* Render input text field if Option is 'Khác' and is selected */}
                        {option.text === "Khác" && isSelected && (
                          <div className="pl-14 pr-4 pb-2 animate-fadeIn">
                            <input
                              type="text"
                              placeholder="Nhập tên trường hoặc câu trả lời của bạn..."
                              value={customInputs[currentQuestion.id] || ""}
                              onChange={(e) => setCustomInputs({
                                ...customInputs,
                                [currentQuestion.id]: e.target.value
                              })}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#ffc700] transition-colors"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Navigation action buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className="px-5 py-3 rounded-2xl hover:bg-slate-100 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent text-xs font-bold transition-all"
              >
                ← Quay lại
              </button>

              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="px-8 py-3.5 rounded-2xl bg-[#ffc700] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-extrabold text-[#5c4d1a] shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{currentStep === 6 ? "Hoàn thành" : "Tiếp tục"}</span>
                <span>→</span>
              </button>
            </div>

          </div>
        ) : showUsageQuestion ? (
          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn">
            <div>
              <div className="text-xs font-extrabold text-[#ff9800] uppercase tracking-wider mb-1">
                Chào mừng bạn đến với Sâu Tìm Trọ
              </div>
              
              <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight mb-6">
                Bạn đã từng sử dụng Sâu Tìm Trọ bao giờ chưa?
              </h2>

              <div className="space-y-4">
                {/* Chưa từng sử dụng */}
                <button 
                  onClick={() => {
                    setAuthTab("register");
                    setShowUsageQuestion(false);
                  }}
                  className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-[#ffc700] hover:bg-amber-50/20 shadow-sm transition-all text-left group hover:-translate-y-0.5 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-[#ffc700]/10 text-slate-500 group-hover:text-[#8B5A2B] flex items-center justify-center shrink-0 transition-all">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-800">Chưa từng sử dụng</span>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Tôi là người mới, cần tạo tài khoản để tìm trọ</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-[#ffc700] text-slate-400 group-hover:text-slate-850 flex items-center justify-center transition-all shrink-0">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                </button>

                {/* Đã từng sử dụng */}
                <button 
                  onClick={() => {
                    setAuthTab("login");
                    setShowUsageQuestion(false);
                  }}
                  className="w-full flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-[#ffc700] hover:bg-amber-50/20 shadow-sm transition-all text-left group hover:-translate-y-0.5 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 group-hover:bg-[#ffc700]/10 text-slate-500 group-hover:text-[#8B5A2B] flex items-center justify-center shrink-0 transition-all">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-800">Đã từng sử dụng</span>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">Tôi đã có tài khoản, đăng nhập để tiếp tục</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-[#ffc700] text-slate-400 group-hover:text-slate-850 flex items-center justify-center transition-all shrink-0">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                </button>
              </div>
            </div>
            
            <div className="text-[9px] text-slate-400 font-semibold text-center mt-6">
              Chọn phương án phù hợp để Sâu hướng dẫn bạn các bước tiếp theo nhé!
            </div>
          </div>
        ) : (
          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn">
            <div>
              {/* Tabs */}
              <div className="flex border-b border-slate-100 mb-6">
                <button
                  onClick={() => { setAuthTab("login"); setAuthError(""); }}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all ${
                    authTab === "login"
                      ? "border-[#ffc700] text-slate-800 font-extrabold"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { setAuthTab("register"); setAuthError(""); }}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all ${
                    authTab === "register"
                      ? "border-[#ffc700] text-slate-800 font-extrabold"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {authTab === "login" ? "Đăng nhập tài khoản sinh viên" : "Đăng ký tài khoản mới"}
              </h3>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authTab === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Họ và tên</label>
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#ffc700] transition-all">
                      <User className="h-4 w-4 ml-3 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2.5 text-xs bg-transparent outline-none text-slate-850 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email học tập</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#ffc700] transition-all">
                    <Mail className="h-4 w-4 ml-3 text-slate-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="example@student.edu.vn"
                      className="w-full px-3 py-2.5 text-xs bg-transparent outline-none text-slate-850 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mật khẩu</label>
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#ffc700] transition-all">
                    <Lock className="h-4 w-4 ml-3 text-slate-400 shrink-0" />
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 text-xs bg-transparent outline-none text-slate-850 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {authTab === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Xác nhận mật khẩu</label>
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#ffc700] transition-all">
                      <Lock className="h-4 w-4 ml-3 text-slate-400 shrink-0" />
                      <input
                        type="password"
                        required
                        value={authConfirmPassword}
                        onChange={(e) => setAuthConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2.5 text-xs bg-transparent outline-none text-slate-850 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl font-extrabold text-slate-800 hover:opacity-95 transition-all shadow-md mt-4 text-xs"
                  style={{ backgroundColor: "var(--brand-yellow)" }}
                >
                  {authTab === "login" ? "Đăng nhập ngay" : "Đăng ký tài khoản"}
                </button>
              </form>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hoặc tiếp tục với</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.486 0-6.314-2.828-6.314-6.314s2.828-6.314 6.314-6.314c1.558 0 2.977.57 4.075 1.5l3.056-3.056C19.227 2.686 15.918 1 12.24 1 5.65 1 .3 6.35.3 12.9s5.35 11.9 11.94 11.9c6.26 0 11.5-4.47 11.5-11.9 0-.756-.07-1.488-.2-2.19l-11.3 2.19z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("facebook")}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  <svg className="h-4 w-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 font-semibold text-center mt-6">
              Thông tin của bạn được bảo mật và chỉ sử dụng để phục vụ tìm kiếm trọ.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
