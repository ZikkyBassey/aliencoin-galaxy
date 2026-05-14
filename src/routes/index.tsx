import { createFileRoute } from "@tanstack/react-router";
import heroAlien from "@/assets/aliencoin-hero.jpg";
import mascot from "@/assets/aliencoin-logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AlienCoin 👽 — Solana Memecoin Community" },
      { name: "description", content: "AlienCoin is a community-driven token on Solana. Join the early believers building a long-term identity in the crypto space." },
      { property: "og:title", content: "AlienCoin 👽 — Solana Memecoin" },
      { property: "og:description", content: "A token built on Solana. Strong community, unique identity, long-term vision." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const DEXTOOLS = "https://www.dextools.io/app/token/aliencoin";
const TELEGRAM = "https://t.me/+p0lFeCz42vw1MzBk";
const X_URL = "https://x.com/Alien_Coin_Sol";

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Starfield bg */}
      <div className="pointer-events-none fixed inset-0 starfield opacity-60" aria-hidden />

      {/* Nav */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="text-2xl">👽</span>
            <span className="text-glow">AlienCoin</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#about" className="transition hover:text-primary">About</a>
            <a href="#mission" className="transition hover:text-primary">Mission</a>
            <a href="#join" className="transition hover:text-primary">Join</a>
          </div>
          <a
            href={DEXTOOLS}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Buy $ALIEN
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Live on Solana
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.95] md:text-7xl lg:text-8xl">
              <span className="text-glow">We are</span>
              <br />
              <span className="text-glow">not alone.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              👽 AlienCoin is a token built on Solana with one mission: assemble a real,
              long-term community around a unique identity in the crypto galaxy.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={DEXTOOLS}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105"
              >
                View on DexTools →
              </a>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/40 px-7 py-3 font-bold text-foreground transition hover:bg-primary/10"
              >
                Join Telegram
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
              <span>Built on</span>
              <span className="font-mono text-primary">SOLANA</span>
              <span>·</span>
              <span className="font-mono text-accent">$ALIEN</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
            <img
              src={heroAlien}
              alt="AlienCoin UFO hovering in cosmic green nebula"
              width={1536}
              height={1024}
              className="animate-float-slow rounded-3xl border border-primary/30 shadow-glow"
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative z-10 border-y border-primary/20 bg-secondary/30 py-6">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-12 whitespace-nowrap px-6 text-2xl font-bold uppercase tracking-widest">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                <span className="text-primary">👽 AlienCoin</span>
                <span className="text-muted-foreground">Built on Solana</span>
                <span className="text-accent">Community First</span>
                <span className="text-primary">Take Me To Your Holder</span>
                <span className="text-muted-foreground">$ALIEN</span>
                <span className="text-accent">We Come In Peace</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-primary">// Transmission 001</p>
            <h2 className="font-display text-4xl font-black md:text-6xl">
              A signal from the <span className="text-glow">early days</span>.
            </h2>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              We are still at the beginning of the journey. For now we are only a small group —
              but every strong project starts with early believers.
            </p>
            <p>
              New holders, new members, and people who believe in the AlienCoin narrative will
              arrive as the project grows. We're building a community, not just a chart.
            </p>
            <p className="text-foreground">
              Thank you to everyone supporting the project from the start. 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section id="mission" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-16 text-center font-display text-4xl font-black md:text-6xl">
          The <span className="text-glow-pink">mission</span>.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { emoji: "🛸", title: "Real Community", text: "A long-term home for holders, builders, and believers in the AlienCoin identity." },
            { emoji: "📡", title: "Live & Loud", text: "Live streams, transparent updates, and a culture built around presence — not promises." },
            { emoji: "🌌", title: "Built on Solana", text: "Fast, cheap, and accessible. The chain that lets memes move at light speed." },
          ].map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl glass p-8 transition hover:border-primary/60 hover:shadow-glow"
            >
              <div className="mb-6 text-5xl">{card.emoji}</div>
              <h3 className="mb-3 font-display text-2xl font-bold">{card.title}</h3>
              <p className="text-muted-foreground">{card.text}</p>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
            </div>
          ))}
        </div>
      </section>

      {/* Mascot CTA */}
      <section id="join" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[3rem] border border-primary/30 bg-secondary/40 p-8 md:p-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={mascot}
                alt="AlienCoin mascot holding a coin"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-72 animate-pulse-glow rounded-full border-2 border-primary/40 md:w-96"
              />
            </div>
            <div>
              <p className="mb-4 text-sm uppercase tracking-widest text-accent">// Join the swarm</p>
              <h2 className="font-display text-4xl font-black md:text-5xl">
                All holders are <span className="text-glow">welcome</span>.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Together we grow the project and take it higher. Find us across the galaxy:
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <SocialLink href={DEXTOOLS} label="DexTools" desc="Chart & trades" />
                <SocialLink href={TELEGRAM} label="Telegram" desc="Daily chat" />
                <SocialLink href={X_URL} label="X / Twitter" desc="Announcements" />
                <SocialLink href={DEXTOOLS} label="Buy $ALIEN" desc="On Solana" primary />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p>👽 AlienCoin · Built by believers · {new Date().getFullYear()}</p>
          <p className="font-mono text-xs">$ALIEN — Solana</p>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ href, label, desc, primary }: { href: string; label: string; desc: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition ${
        primary
          ? "border-primary bg-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
          : "border-border bg-card hover:border-primary/60 hover:bg-card/80"
      }`}
    >
      <div>
        <div className="font-bold">{label}</div>
        <div className={`text-xs ${primary ? "opacity-80" : "text-muted-foreground"}`}>{desc}</div>
      </div>
      <span className="transition group-hover:translate-x-1">→</span>
    </a>
  );
}
