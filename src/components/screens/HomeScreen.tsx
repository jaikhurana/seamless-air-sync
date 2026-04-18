import { motion } from "framer-motion";
import { Plane, RefreshCw, Bell, ChevronRight, Wifi, ShieldCheck, QrCode, MapPin } from "lucide-react";
import { StatusBar } from "./StatusBar";

interface Props {
  onNavigate: (screen: string) => void;
  changeDetected: boolean;
}

export function HomeScreen({ onNavigate, changeDetected }: Props) {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar tint="dark" />

      {/* Header */}
      <div className="px-6 pt-3 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-ink-soft uppercase tracking-[0.12em]">Good morning</p>
          <h1 className="text-[22px] font-semibold text-ink mt-0.5">Aarav Sharma</h1>
        </div>
        <div className="relative">
          <button className="size-11 rounded-full bg-surface shadow-[var(--shadow-soft)] grid place-items-center">
            <Bell className="size-5 text-ink" strokeWidth={1.8} />
          </button>
          {changeDetected && (
            <span className="absolute top-2 right-2.5 size-2.5 rounded-full bg-destructive ring-2 ring-background" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Live Status Banner */}
        <div className="px-6">
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "var(--gradient-mint)" }}>
            <div className="size-10 rounded-full bg-white/25 backdrop-blur grid place-items-center">
              <ShieldCheck className="size-5 text-ink" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="pulse-dot" />
                <p className="text-[13px] font-semibold text-ink">DigiYatra Active</p>
              </div>
              <p className="text-[11px] text-ink/70 mt-0.5">Live Sync enabled · Biometric ready</p>
            </div>
          </div>
        </div>

        {/* Boarding Pass */}
        <div className="px-6 mt-5">
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)]" style={{ background: "var(--gradient-hero)" }}>
            <div className="p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-white/15 backdrop-blur grid place-items-center">
                    <Plane className="size-4 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">IndiGo</p>
                    <p className="text-[12px] font-semibold">6E 2134</p>
                  </div>
                </div>
                <span className="chip bg-mint text-ink">
                  <span className="size-1.5 rounded-full bg-ink" /> ON TIME
                </span>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Delhi</p>
                  <p className="font-display text-[42px] font-bold leading-none mt-1">DEL</p>
                  <p className="text-[11px] text-white/70 mt-1.5">06:40 · T3</p>
                </div>
                <div className="flex-1 px-4 pb-2">
                  <div className="relative h-px bg-white/30">
                    <Plane className="size-4 text-mint absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" fill="currentColor" strokeWidth={0} />
                  </div>
                  <p className="text-center text-[10px] text-white/55 mt-2 tracking-[0.15em]">2H 15M</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Bengaluru</p>
                  <p className="font-display text-[42px] font-bold leading-none mt-1">BLR</p>
                  <p className="text-[11px] text-white/70 mt-1.5">09:25 · T2</p>
                </div>
              </div>
            </div>

            <div className="perforation" style={{ backgroundColor: "transparent" }} />

            <div className="bg-white/[0.06] backdrop-blur p-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Gate</p>
                <p className="font-display text-[18px] font-semibold text-white mt-1">B12</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Seat</p>
                <p className="font-display text-[18px] font-semibold text-white mt-1">14A</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Boarding</p>
                <p className="font-display text-[18px] font-semibold text-white mt-1">06:10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status Card */}
        <div className="px-6 mt-4">
          <button
            onClick={() => changeDetected && onNavigate("change")}
            className={`w-full rounded-2xl p-4 flex items-center gap-3 text-left transition-all ${
              changeDetected
                ? "bg-destructive/10 border border-destructive/20"
                : "bg-surface shadow-[var(--shadow-soft)]"
            }`}
          >
            <div className={`size-10 rounded-xl grid place-items-center ${
              changeDetected ? "bg-destructive/15" : "bg-mint/20"
            }`}>
              {changeDetected ? (
                <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Bell className="size-5 text-destructive" strokeWidth={2} />
                </motion.div>
              ) : (
                <Wifi className="size-5 text-success" strokeWidth={2} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-ink">
                {changeDetected ? "Flight details changed" : "Last synced"}
              </p>
              <p className="text-[11px] text-ink-soft mt-0.5 truncate">
                {changeDetected ? "Tap to review and sync now" : "Just now · 06:42 IST"}
              </p>
            </div>
            <ChevronRight className="size-4 text-ink-soft" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="px-6 mt-5">
          <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-soft mb-3">Quick actions</p>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction icon={<QrCode className="size-5" />} label="QR Pass" />
            <QuickAction icon={<MapPin className="size-5" />} label="Terminal" />
            <QuickAction icon={<RefreshCw className="size-5" />} label="Resync" />
          </div>
        </div>

        {/* Journey timeline */}
        <div className="px-6 mt-5">
          <div className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-soft)]">
            <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-soft mb-3">Your journey</p>
            <div className="space-y-3">
              <Step done label="Airport entry" sub="Verified · 05:48" />
              <Step done label="Check-in" sub="Completed · 06:05" />
              <Step active label="Security gate" sub="Next · ~10 min" onClick={() => onNavigate("security")} />
              <Step label="Boarding gate B12" sub="06:10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="rounded-2xl bg-surface p-3 shadow-[var(--shadow-soft)] flex flex-col items-center gap-2">
      <div className="size-9 rounded-xl bg-accent grid place-items-center text-primary">{icon}</div>
      <span className="text-[11px] font-medium text-ink">{label}</span>
    </button>
  );
}

function Step({ done, active, label, sub, onClick }: { done?: boolean; active?: boolean; label: string; sub: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={!onClick} className="w-full flex items-center gap-3 text-left disabled:cursor-default">
      <div className={`size-7 rounded-full grid place-items-center shrink-0 ${
        done ? "bg-success" : active ? "bg-accent ring-2 ring-mint" : "bg-muted"
      }`}>
        {done ? (
          <svg className="size-3.5 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span className={`size-2 rounded-full ${active ? "bg-success" : "bg-ink-soft/30"}`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-medium ${active ? "text-ink" : done ? "text-ink-soft" : "text-ink-soft"}`}>{label}</p>
        <p className="text-[10px] text-ink-soft mt-0.5">{sub}</p>
      </div>
      {active && <ChevronRight className="size-4 text-ink-soft" />}
    </button>
  );
}
