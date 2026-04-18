import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ChangeDetectedScreen } from "@/components/screens/ChangeDetectedScreen";
import { SyncProgressScreen } from "@/components/screens/SyncProgressScreen";
import { SyncSuccessScreen } from "@/components/screens/SyncSuccessScreen";
import { SecurityGateScreen } from "@/components/screens/SecurityGateScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigiYatra Live Sync — Real-time biometric travel" },
      { name: "description", content: "High-fidelity prototype of DigiYatra's Live Sync feature: real-time airline data sync that prevents biometric verification failures at airport security." },
      { property: "og:title", content: "DigiYatra Live Sync — Real-time biometric travel" },
      { property: "og:description", content: "Concept prototype: seamless airport biometric flow even after last-minute boarding pass changes." },
    ],
  }),
  component: Index,
});

type Screen = "home" | "change" | "sync" | "success" | "security";

const SCREENS: { id: Screen; label: string; num: string }[] = [
  { id: "home", label: "Home", num: "01" },
  { id: "change", label: "Change Detected", num: "02" },
  { id: "sync", label: "Sync in Progress", num: "03" },
  { id: "success", label: "Sync Success", num: "04" },
  { id: "security", label: "Security Gate", num: "05" },
];

function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [changeDetected, setChangeDetected] = useState(true);

  // Simulate push notification on initial load
  useEffect(() => {
    if (screen === "home" && changeDetected) {
      // keep banner visible
    }
  }, [screen, changeDetected]);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onNavigate={(s) => setScreen(s as Screen)} changeDetected={changeDetected} />;
      case "change":
        return <ChangeDetectedScreen onBack={() => setScreen("home")} onSync={() => setScreen("sync")} />;
      case "sync":
        return <SyncProgressScreen onComplete={() => setScreen("success")} />;
      case "success":
        return <SyncSuccessScreen onContinue={() => setScreen("security")} />;
      case "security":
        return (
          <SecurityGateScreen
            onRestart={() => {
              setChangeDetected(true);
              setScreen("home");
            }}
          />
        );
    }
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-mint)" }} />
        <div className="absolute -bottom-60 -right-40 size-[600px] rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 lg:py-16">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl grid place-items-center" style={{ background: "var(--gradient-hero)" }}>
              <svg viewBox="0 0 24 24" className="size-5 text-mint" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
            </div>
            <div>
              <p className="font-display text-[15px] font-semibold text-ink leading-none">DigiYatra · Live Sync</p>
              <p className="text-[11px] text-ink-soft mt-1">High-fidelity prototype</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="chip bg-success/15 text-ink border border-success/30">
              <span className="pulse-dot" /> Interactive Demo
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-start">
          {/* Left: Context */}
          <div className="space-y-8 lg:pt-12 order-2 lg:order-1">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-ink-soft">Concept</p>
              <h1 className="font-display text-[44px] lg:text-[56px] font-bold text-ink leading-[1.05] mt-3 tracking-tight">
                Biometric travel that <em className="not-italic" style={{ background: "var(--gradient-mint)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>never falls behind.</em>
              </h1>
              <p className="text-[15px] text-ink-soft mt-5 leading-relaxed max-w-[460px]">
                When airlines change your seat, gate or boarding pass at the last minute, your DigiYatra token goes stale — and security gates reject you. Live Sync fixes it in under three seconds.
              </p>
            </div>

            <div className="space-y-4 max-w-[440px]">
              <Stat number="68%" label="Reduction in biometric failures" />
              <Stat number="<3s" label="Median sync time after change" />
              <Stat number="0" label="Manual verifications needed" />
            </div>

            <div className="rounded-2xl bg-surface shadow-[var(--shadow-soft)] p-5 max-w-[440px]">
              <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-ink-soft">Failure scenario fixed</p>
              <ol className="mt-3 space-y-2.5 text-[13px] text-ink">
                <FailStep n="1" text="User enters airport via DigiYatra ✓" />
                <FailStep n="2" text="Airline changes seat at check-in" />
                <FailStep n="3" text="Old: Biometric fails at security ✗" />
                <FailStep n="4" text="New: Live Sync refreshes token instantly ✓" highlight />
              </ol>
            </div>
          </div>

          {/* Center: Phone */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-screen">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full w-full"
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Screen navigator */}
          <div className="space-y-3 lg:pt-12 order-3">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-ink-soft mb-4">Screen flow</p>
            {SCREENS.map((s, i) => {
              const isActive = s.id === screen;
              return (
                <button
                  key={s.id}
                  onClick={() => setScreen(s.id)}
                  className={`w-full text-left rounded-2xl p-4 transition-all flex items-center gap-4 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-deep)]"
                      : "bg-surface shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)]"
                  }`}
                >
                  <span className={`font-mono text-[11px] ${isActive ? "text-mint" : "text-ink-soft"}`}>{s.num}</span>
                  <span className={`font-display text-[14px] font-semibold flex-1 ${isActive ? "text-white" : "text-ink"}`}>{s.label}</span>
                  {isActive && <span className="pulse-dot" />}
                </button>
              );
            })}

            <div className="mt-6 rounded-2xl border border-dashed border-ink-soft/20 p-4">
              <p className="text-[11px] font-semibold text-ink">Try the flow</p>
              <p className="text-[11px] text-ink-soft mt-1.5 leading-relaxed">
                Tap the alert on Home → Sync Now → watch credentials refresh → Proceed to Security. The face scan auto-verifies in 2.4s.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-ink-soft/10 flex items-center justify-between text-[11px] text-ink-soft">
          <p>Designed for frequent flyers · Concept prototype</p>
          <p className="font-mono">v0.1 · Live Sync</p>
        </footer>
      </div>
    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <p className="font-display text-[36px] font-bold text-ink leading-none w-[100px]" style={{ background: "var(--gradient-hero)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {number}
      </p>
      <p className="text-[13px] text-ink-soft">{label}</p>
    </div>
  );
}

function FailStep({ n, text, highlight }: { n: string; text: string; highlight?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <span className={`size-5 rounded-full grid place-items-center text-[10px] font-semibold shrink-0 ${
        highlight ? "bg-success text-ink" : "bg-muted text-ink-soft"
      }`}>{n}</span>
      <span className={highlight ? "text-ink font-medium" : "text-ink-soft"}>{text}</span>
    </li>
  );
}
