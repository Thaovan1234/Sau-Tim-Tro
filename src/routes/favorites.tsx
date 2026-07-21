import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RoomCard } from "@/components/RoomCard";
import { useFavorites } from "@/lib/favorites";
import { rooms } from "@/lib/rooms";
import { WormMascot } from "@/components/WormMascot";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Phòng yêu thích — Sâu tìm trọ" },
      { name: "description", content: "Danh sách phòng trọ bạn đã lưu trên Sâu tìm trọ." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids } = useFavorites();
  const liked = rooms.filter((r) => ids.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-7xl w-full px-5 pt-8 pb-12">
        <div className="rounded-3xl bg-gradient-warm p-6 md:p-8 shadow-soft border border-border/60 flex items-center gap-4">
          <WormMascot className="h-20 w-20 hidden sm:block" animate />
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cocoa">Tổ ấm bạn đã thả tim</h1>
            <p className="mt-1 text-cocoa/75 text-sm">Sâu giữ giùm danh sách — quay lại lúc nào cũng còn.</p>
          </div>
        </div>

        {liked.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-card border border-border/60 p-12 text-center shadow-soft">
            <WormMascot className="h-24 w-24 mx-auto" />
            <p className="mt-4 font-display text-2xl font-bold text-cocoa">Chưa thả tim cho tổ nào hết 🍃</p>
            <p className="mt-2 text-sm text-muted-foreground">Lượn qua trang tìm phòng và thả tim cho tổ bạn ưng nha.</p>
            <Link
              to="/search"
              className="mt-5 inline-block bg-honey text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:opacity-90"
            >
              Đi tìm tổ
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liked.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
