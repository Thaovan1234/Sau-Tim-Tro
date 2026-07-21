import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WormMascot } from "@/components/WormMascot";
import { Check, Upload } from "lucide-react";

export const Route = createFileRoute("/post")({
  head: () => ({
    meta: [
      { title: "Đăng tin cho thuê — Sâu tìm trọ" },
      { name: "description", content: "Đăng tin phòng cho thuê tại Đà Nẵng — tiếp cận hàng ngàn bạn trẻ đang tìm trọ." },
    ],
  }),
  component: PostPage,
});

function PostPage() {
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl w-full px-5 pt-8 pb-12">
        <div className="rounded-3xl bg-gradient-warm p-6 md:p-8 shadow-soft border border-border/60 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-90 hidden sm:block">
            <WormMascot className="h-40 w-40" animate />
          </div>
          <div className="relative max-w-lg">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cocoa">Cho Sâu thuê tổ của bạn</h1>
            <p className="mt-1 text-cocoa/75 text-sm">Điền vài thông tin — Sâu sẽ giúp tổ của bạn tìm chủ mới chỉ trong vài ngày.</p>
          </div>
        </div>

        {done ? (
          <div className="mt-8 rounded-3xl bg-card p-10 text-center border border-border/60 shadow-soft">
            <div className="mx-auto h-14 w-14 rounded-full bg-honey flex items-center justify-center text-cream">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-cocoa">Sâu nhận tin rồi 🎉</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sâu sẽ kiểm duyệt và đăng tin của bạn trong vòng 24h.
            </p>
            <button
              onClick={() => setDone(false)}
              className="mt-5 bg-honey text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:opacity-90"
            >
              Đăng tin khác
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-8 rounded-3xl bg-card p-6 md:p-8 border border-border/60 shadow-soft space-y-5"
          >
            <Field label="Tiêu đề tin">
              <input required placeholder="VD: Phòng studio đầy đủ nội thất gần biển Mỹ Khê" className={inputCls} />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Quận / huyện">
                <select required className={inputCls} defaultValue="">
                  <option value="" disabled>Chọn quận</option>
                  {["Hải Châu", "Sơn Trà", "Thanh Khê", "Liên Chiểu", "Ngũ Hành Sơn", "Cẩm Lệ"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="Địa chỉ cụ thể">
                <input required placeholder="Số nhà, đường" className={inputCls} />
              </Field>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <Field label="Giá thuê (VNĐ/tháng)">
                <input required type="number" min={500000} placeholder="3500000" className={inputCls} />
              </Field>
              <Field label="Diện tích (m²)">
                <input required type="number" min={5} placeholder="22" className={inputCls} />
              </Field>
              <Field label="Số điện thoại">
                <input required type="tel" placeholder="0905..." className={inputCls} />
              </Field>
            </div>

            <Field label="Mô tả phòng">
              <textarea
                required
                rows={5}
                placeholder="Kể cho Sâu nghe về tổ ấm của bạn nhé..."
                className={`${inputCls} resize-none`}
              />
            </Field>

            <Field label="Ảnh phòng">
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-2xl py-8 text-sm text-muted-foreground hover:border-honey hover:text-cocoa cursor-pointer transition-colors">
                <Upload className="h-4 w-4" /> Kéo thả hoặc bấm để tải ảnh
                <input type="file" multiple accept="image/*" className="hidden" />
              </label>
            </Field>

            <button
              type="submit"
              className="w-full bg-cocoa text-cream rounded-full py-3.5 font-semibold hover:bg-honey transition-colors shadow-soft"
            >
              Gửi cho Sâu duyệt
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

const inputCls =
  "w-full rounded-2xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-honey border border-transparent focus:border-honey transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-cocoa">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
