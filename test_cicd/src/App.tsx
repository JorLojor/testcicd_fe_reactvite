import { useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // REVEAL (fade-in / fade-out) — root = container biar tetap works walau inner scroll
    const rootEl = containerRef.current;
    if (!rootEl) return;

    const revealEls = rootEl.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0");
          } else {
            // kalo mau cuma sekali muncul, comment baris bawah
            el.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { root: rootEl, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-black text-white">
      {/* local keyframes for extra vibe */}
      <style>{`
        @keyframes float-slow { 0%{transform:translateY(0)} 50%{transform:translateY(-12px)} 100%{transform:translateY(0)} }
        @keyframes drift-x { 0%{transform:translateX(-10%)} 100%{transform:translateX(110%)} }
      `}</style>

      {/* NAV glassy di atas viewport biar mewah */}
      <nav className="fixed z-50 left-0 right-0 top-0 mx-auto max-w-6xl mt-3 px-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
          <span className="font-bold tracking-wide">🐟 BSA — Batu Segera Abadi</span>
          <a href="#cta" className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 text-white text-sm font-semibold hover:opacity-90 transition">
            Coba Sekarang
          </a>
        </div>
      </nav>

      {/* CONTAINER parallax: full screen, scroll di dalam, pakai perspective + snap */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth w-full"
        style={{ perspective: "3px", transformStyle: "preserve-3d" }}
      >
        {/* --- LAYERED PARALLAX ala CodePen + dekor foreground + digital-nature vibes --- */}
        {/* 1) IMAGE layer (depth: belakang) */}
        <section
          className="relative flex items-center justify-center snap-start"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1603190287605-7ec8a94c0e52?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateZ(-1px) scale(1.5)",
            height: "100vh",
            zIndex: -1,
          }}
        >
          {/* Aurora glow */}
          <div className="absolute -top-20 -left-24 w-[65vw] h-[65vw] rounded-full blur-3xl opacity-25 animate-spin" style={{ background: "radial-gradient(closest-side, #22d3ee, transparent 65%)" }} />
          <div className="absolute -bottom-24 -right-24 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-20 animate-spin" style={{ background: "radial-gradient(closest-side, #34d399, transparent 60%)", animationDuration: "30s" }} />

          {/* Digital grid overlay */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Foreground dekor ikan mengambang (lebih dekat ke viewer) */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(0.6px) scale(1.1)" }}>
            <span className="absolute left-[10%] top-[20%] text-3xl" style={{ animation: "float-slow 3.5s ease-in-out infinite" }}>🐟</span>
            <span className="absolute left-[70%] top-[35%] text-2xl" style={{ animation: "float-slow 4.5s ease-in-out infinite" }}>🐠</span>
            <span className="absolute left-[40%] top-[70%] text-3xl" style={{ animation: "float-slow 5s ease-in-out infinite" }}>🐟</span>
          </div>

          {/* Waves foreground (SVG) */}
          <svg className="absolute bottom-0 left-0 w-full" height="120" viewBox="0 0 1440 120" fill="none" style={{ transform: "translateZ(0.3px)" }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path d="M0 60 C 180 120, 360 0, 540 60 C 720 120, 900 0, 1080 60 C 1260 120, 1440 0, 1620 60 L 1620 140 L 0 140 Z" fill="url(#grad1)" opacity="0.6"></path>
          </svg>
        </section>

        {/* 2) HEADING layer (depth: depan) */}
        <section
          className="relative flex items-center justify-center snap-start"
          style={{ transform: "translateY(-30vh) translateZ(1px) scale(1.5)", zIndex: -1 }}
        >
          <div className="px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl">🌿 Batu Segera Abadi</h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90">Sistem monitoring modern & pintar untuk tambak ikan nila berbasis teknologi.</p>
          </div>
        </section>

        {/* 3) TEXT block */}
        <section className="relative flex items-center justify-center snap-start w-full" style={{ height: "50vh", backgroundColor: "#c8c8bc" }}>
          <h2 className="text-2xl md:text-3xl font-semibold text-black px-6 text-center">Pantau pH, DO, suhu — real-time & rapi di dashboard.</h2>
        </section>

        {/* 4) IMAGE lagi */}
        <section
          className="relative flex items-center justify-center snap-start"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateZ(-1px) scale(1.5)",
            height: "100vh",
            zIndex: -1,
          }}
        />

        {/* 5) HEADING lagi */}
        <section className="relative flex items-center justify-center snap-start" style={{ transform: "translateY(-30vh) translateZ(1px) scale(1.5)", zIndex: -1 }}>
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl text-center">Notifikasi Cerdas 🔔</h2>
        </section>

        {/* 6) TEXT block */}
        <section className="relative flex items-center justify-center snap-start" style={{ height: "50vh", backgroundColor: "#638a87" }}>
          <h2 className="text-2xl md:text-3xl font-semibold px-6 text-center">Begitu parameter out of range, BSA langsung ngasih alert.</h2>
        </section>

        {/* 7) IMAGE lagi */}
        <section
          className="relative flex items-center justify-center snap-start"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateZ(-1px) scale(1.5)",
            height: "100vh",
            zIndex: -1,
          }}
        />

        {/* 8) HEADING lagi */}
        <section className="relative flex items-center justify-center snap-start" style={{ transform: "translateY(-30vh) translateZ(1px) scale(1.5)", zIndex: -1 }}>
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl text-center">Laporan Otomatis 📊</h2>
        </section>

        {/* 9) TEXT block */}
        <section className="relative flex items-center justify-center snap-start" style={{ height: "50vh", backgroundColor: "#384558" }}>
          <h2 className="text-2xl md:text-3xl font-semibold px-6 text-center">Export harian / mingguan / bulanan — PDF & Excel.</h2>
        </section>

        {/* 10) IMAGE terakhir + gradient overlay halus + shoal (rombongan ikan digital) */}
        <section
          className="relative flex items-center justify-center snap-start"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1538982198821-0714ff3d74ba?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateZ(-1px) scale(1.5)",
            height: "100vh",
            zIndex: -1,
          }}
        >
          {/* overlay tetap */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* rombongan ikan digital drifting - SEAMLESS */}
          <div
            className="absolute bottom-10 left-0 right-0 overflow-hidden opacity-60 pointer-events-none"
            style={{ transform: "translateZ(0.4px)" }} // parallax depth
          >
            {/* keyframes lokal (boleh pindah ke index.css kalau mau) */}
            <style>{`
              @keyframes marquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); } /* geser setengah lebar track (200%) */
              }
            `}</style>

            {/* TRACK 200%: 2 copy konten back-to-back */}
            <div
              className="flex w-[200%] will-change-transform"
              style={{ animation: "marquee 40s linear infinite" }}
            >
              {/* copy #1 */}
              <div className="flex w-1/2 shrink-0 whitespace-nowrap justify-around">
                {Array.from({ length: 50 }).map((_, i) => (
                  <span
                    key={`a-${i}`}
                    className="mx-4 text-xl"
                    style={{ animation: `float-slow ${3 + (i % 5)}s ease-in-out infinite` }}
                  >
                    ---
                  </span>
                ))}
              </div>

              {/* copy #2 (duplikat persis, biar nyambung mulus) */}
              <div className="flex w-1/2 shrink-0 whitespace-nowrap justify-around" aria-hidden="true">
                {Array.from({ length: 50 }).map((_, i) => (
                  <span
                    key={`b-${i}`}
                    className="mx-4 text-xl"
                    style={{ animation: `float-slow ${3 + (i % 5)}s ease-in-out infinite` }}
                  >
                    ---
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11) HEADING terakhir */}
        <section className="relative flex items-center justify-center snap-start" style={{ transform: "translateY(-30vh) translateZ(1px) scale(1.5)", zIndex: -1 }}>
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl text-center">BSA — Tambak Pintar Lo 🎣</h2>
        </section>

        {/* --- BLOK KONTEN BIASA (reveal) SETELAH PARALLAX --- */}
        <section data-reveal className="opacity-0 translate-y-8 transition-all duration-700 ease-out grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-20 px-6">
          {[
            { title: "Pantau Kualitas Air", desc: "Sensor real-time untuk pH, suhu, dan DO terintegrasi langsung ke dashboard.", icon: "💧" },
            { title: "Notifikasi Cerdas", desc: "Dapatkan alert otomatis ketika kondisi tambak berbahaya atau abnormal.", icon: "🔔" },
            { title: "Laporan Terstruktur", desc: "Download laporan harian, mingguan, hingga bulanan (PDF/Excel).", icon: "📊" },
          ].map((item, i) => (
            <div key={i} className="relative rounded-2xl p-[1px] bg-gradient-to-r from-teal-400/60 to-sky-500/60 hover:from-teal-400 hover:to-sky-500 transition">
              <div className="rounded-2xl bg-white/90 backdrop-blur-md p-6 text-gray-900 shadow-md text-center">
                <h3 className="text-2xl font-bold mb-2">{item.icon} {item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* STICKY CINEMATIC CTA (parallax halus) */}
        <section id="cta" className="relative h-[180vh] snap-start">
          {/* background slow layer */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524695632220-9f1e5537ef8b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" style={{ transform: "translateZ(-0.5px) scale(1.2)", zIndex: -1 }} />
          {/* pinned content */}
          <div className="sticky top-0 h-screen flex items-center justify-center text-center px-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Yuk Gabung BSA Sekarang 🚀</h3>
              <p className="text-white/90 mb-6">Rasain cara budidaya modern yang efektif & berbasis data. Mulai dari pemantauan sampai laporan otomatis.</p>
              <a href="#" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 font-bold hover:opacity-90 transition">Daftar Sekarang</a>
            </div>
          </div>
        </section>

        <footer className="relative block h-screen bg-black flex items-center justify-center snap-start">
          <h4 className="text-xl font-normal text-sky-400">© 2025 Batu Segera Abadi</h4>
        </footer>
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/80 pointer-events-none select-none">
        <div className="flex flex-col items-center text-sm">
          <span>Scroll</span>
          <span className="animate-bounce">▾</span>
        </div>
      </div>
    </div>
  );
}
