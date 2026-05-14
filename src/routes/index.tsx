import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroAlien from "@/assets/aliencoin-hero.jpg";
import mascot from "@/assets/aliencoin-coin.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlienCoin 👽 — Solana Memecoin" },
      { name: "description", content: "AlienCoin — community-driven Solana token. We are not alone." },
      { property: "og:title", content: "AlienCoin 👽" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&display=swap" },
    ],
  }),
  component: Index,
});

const CA = "78K7QEC9HXgUoT7U19LRKHSJaZt6eMPDGMmxJJHNpump";
const DEXTOOLS = `https://dexscreener.com/solana/${CA}`;
const DEXTOOLS_IO = `https://www.dextools.io/app/solana/pair-explorer/${CA}`;
const PUMPFUN = `https://pump.fun/coin/${CA}`;
const TELEGRAM = "https://t.me/+p0lFeCz42vw1MzBk";
const X_URL = "https://x.com/Alien_Coin_Sol";

type DexData = { priceUsd: string; volume: { h24: number }; txns: { h24: { buys: number; sells: number } }; marketCap: number };

function useDexData() {
  const [data, setData] = useState<DexData | null>(null);
  useEffect(() => {
    fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`)
      .then((r) => r.json())
      .then((j) => setData(j.pairs?.[0] ?? null))
      .catch(() => {});
  }, []);
  return data;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

/* ── Particle canvas ── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const count = 120;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.7 ? 330 : 145,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.85 0.25 ${p.hue} / ${p.alpha})`;
        ctx.fill();
      }
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `oklch(0.85 0.25 145 / ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let start = 0;
      const step = () => {
        start += Math.ceil(to / 60);
        if (start >= to) { setVal(to); return; }
        setVal(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Typewriter ── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);
  return (
    <span className="text-primary">
      {text}<span className="animate-[blink_1s_infinite] border-r-2 border-primary">&nbsp;</span>
    </span>
  );
}

function Index() {
  useReveal();
  const dex = useDexData();
  const txns24h = dex ? dex.txns.h24.buys + dex.txns.h24.sells : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Ambient layers */}
      <ParticleCanvas />
      <div className="noise" />
      <div className="scan-line" />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <header className="relative z-30 border-b border-primary/10 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2 font-display text-xl font-black">
            <span className="animate-pulse-glow text-2xl">👽</span>
            <span className="text-glow">AlienCoin</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {["About", "Mission", "Join"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="relative transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">{l}</a>
            ))}
          </div>
          <a href={DEXTOOLS} target="_blank" rel="noopener noreferrer"
            className="shimmer-border relative rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105 hover:shadow-[0_0_40px_oklch(0.85_0.25_145/0.8)]">
            Buy $ALIEN
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-28">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-primary" style={{ animationDelay: "0.2s" }}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Live on Solana
            </div>
            <h1 className="font-display text-6xl font-black leading-[0.9] md:text-7xl lg:text-8xl">
              <span className="glitch-text text-glow animate-fade-up block" data-text="We are" style={{ animationDelay: "0.3s" }}>We are</span>
              <span className="glitch-text text-glow animate-fade-up block" data-text="not alone." style={{ animationDelay: "0.5s" }}>not alone.</span>
            </h1>
            <p className="mt-6 max-w-lg animate-fade-up text-lg text-muted-foreground" style={{ animationDelay: "0.7s" }}>
              The token built for those who believe in something bigger. <br />
              <Typewriter words={["Community first.", "Built on Solana.", "We come in peace.", "Join the swarm."]} />
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: "0.9s" }}>
              <a href={DEXTOOLS} target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105">
                <span className="relative z-10">View on DexTools →</span>
                <span className="absolute inset-0 animate-shimmer" />
              </a>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-primary/40 px-7 py-3 font-bold transition hover:border-primary hover:bg-primary/10 hover:shadow-glow">
                Join Telegram
              </a>
            </div>
            <div className="mt-10 flex animate-fade-up items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground" style={{ animationDelay: "1.1s" }}>
              <span>Built on</span><span className="font-mono text-primary">SOLANA</span>
              <span>·</span><span className="font-mono text-accent">$ALIEN</span>
            </div>
          </div>

          {/* Hero image with orbiting elements */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-80 w-80 rounded-full border border-primary/10 animate-spin-slow" />
            <div className="absolute h-[26rem] w-[26rem] rounded-full border border-accent/10 animate-[spin-slow_30s_linear_infinite_reverse]" />
            <div className="absolute h-80 w-80">
              <span className="animate-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">🛸</span>
            </div>
            <div className="absolute h-80 w-80">
              <span className="animate-orbit2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">⭐</span>
            </div>
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
            <img src={heroAlien} alt="AlienCoin hero" width={600} height={400}
              className="animate-float-slow relative z-10 rounded-3xl border border-primary/30 shadow-glow" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="relative z-10 border-y border-primary/20 bg-secondary/20 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary/20 md:grid-cols-4">
          {[
            { label: "Price", value: dex ? `$${parseFloat(dex.priceUsd).toFixed(8)}` : "—" },
            { label: "Market Cap", value: dex ? fmt(dex.marketCap) : "—" },
            { label: "24h Volume", value: dex ? fmt(dex.volume.h24) : "—" },
            { label: "24h Txns", value: txns24h != null ? txns24h.toLocaleString() : "—" },
          ].map((s, i) => (
            <div key={s.label} className="reveal px-8 py-8 text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-display text-2xl font-black text-primary">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden border-b border-primary/10 bg-secondary/10 py-5">
        <div className="flex">
          <div className="flex shrink-0 animate-marquee gap-10 whitespace-nowrap px-6 text-xl font-black uppercase tracking-widest">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-10">
                <span className="text-primary">👽 AlienCoin</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-accent">Built on Solana</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-primary">Community First</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-accent">Take Me To Your Holder</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-primary">$ALIEN</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-accent">We Come In Peace</span>
                <span className="text-muted-foreground">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div className="reveal">
            <p className="mb-4 text-sm uppercase tracking-widest text-primary">// Transmission 001</p>
            <h2 className="font-display text-5xl font-black leading-tight md:text-6xl">
              A signal from the <span className="text-glow">early days</span>.
            </h2>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="reveal reveal-delay-1">We are still at the beginning of the journey. For now we are only a small group — but every strong project starts with early believers.</p>
            <p className="reveal reveal-delay-2">New holders, new members, and people who believe in the AlienCoin narrative will arrive as the project grows. We're building a community, not just a chart.</p>
            <p className="reveal reveal-delay-3 text-foreground font-semibold">Thank you to everyone supporting the project from the start. 🚀</p>
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section id="mission" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <h2 className="reveal mb-20 text-center font-display text-5xl font-black md:text-6xl">
          The <span className="text-glow-pink">mission</span>.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { emoji: "🛸", title: "Real Community", text: "A long-term home for holders, builders, and believers in the AlienCoin identity.", delay: 0 },
            { emoji: "📡", title: "Live & Loud", text: "Live streams, transparent updates, and a culture built around presence — not promises.", delay: 1 },
            { emoji: "🌌", title: "Built on Solana", text: "Fast, cheap, and accessible. The chain that lets memes move at light speed.", delay: 2 },
          ].map((card) => (
            <div key={card.title}
              className={`reveal reveal-delay-${card.delay + 1} shimmer-border group relative overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow`}>
              <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse-glow">{card.emoji}</div>
              <h3 className="mb-3 font-display text-2xl font-bold">{card.title}</h3>
              <p className="text-muted-foreground">{card.text}</p>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/20 group-hover:blur-xl" />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Join */}
      <section id="join" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="shimmer-border relative overflow-hidden rounded-[3rem] bg-secondary/30 p-8 backdrop-blur-xl md:p-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="reveal flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" />
                <img src={mascot} alt="AlienCoin mascot" width={400} height={400} loading="lazy"
                  className="relative z-10 w-64 animate-float-slow rounded-full border-2 border-primary/40 shadow-glow md:w-80" />
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <p className="mb-4 text-sm uppercase tracking-widest text-accent">// Join the swarm</p>
              <h2 className="font-display text-4xl font-black md:text-5xl">
                All holders are <span className="text-glow">welcome</span>.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">Together we grow the project and take it higher.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { href: DEXTOOLS, label: "DexScreener", desc: "Chart & trades", primary: false },
                  { href: DEXTOOLS_IO, label: "DexTools", desc: "Pair explorer", primary: false },
                  { href: PUMPFUN, label: "Pump.fun", desc: "Buy on pump.fun", primary: false },
                  { href: TELEGRAM, label: "Telegram", desc: "Daily chat", primary: false },
                  { href: X_URL, label: "X / Twitter", desc: "Announcements", primary: false },
                  { href: DEXTOOLS_IO, label: "Buy $ALIEN", desc: "On Solana", primary: true },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300 hover:-translate-y-1 ${s.primary ? "border-primary bg-primary text-primary-foreground shadow-glow hover:shadow-[0_0_40px_oklch(0.85_0.25_145/0.8)]" : "border-border bg-card hover:border-primary/60 hover:shadow-glow"}`}>
                    <div>
                      <div className="font-bold">{s.label}</div>
                      <div className={`text-xs ${s.primary ? "opacity-80" : "text-muted-foreground"}`}>{s.desc}</div>
                    </div>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p>👽 AlienCoin · Built by believers · {new Date().getFullYear()}</p>
          <p className="font-mono text-xs text-primary">$ALIEN — Solana</p>
        </div>
      </footer>
    </div>
  );
}
