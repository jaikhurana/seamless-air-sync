import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StatusBar } from "./StatusBar";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";

interface Props {
  onRestart: () => void;
}

export function SecurityGateScreen({ onRestart }: Props) {
  const [phase, setPhase] = useState<"scanning" | "verified">("scanning");

  useEffect(() => {
    const t = setTimeout(() => setPhase("verified"), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex h-full flex-col" style={{ background: "var(--gradient-hero)" }}>
      <StatusBar tint="light" />

      <div className="px-6 pt-2 pb-4">
        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-mint">Security Gate · T3</p>
        <h1 className="text-[20px] font-semibold text-white mt-1">Look at the camera</h1>
      </div>

      {/* Face scan area */}
      <div className="flex-1 px-6 flex flex-col items-center justify-center">
        <div className="relative size-72">
          {/* Outer glow */}
          <motion.div
            animate={{ scale: phase === "verified" ? [1, 1.05, 1] : 1, opacity: phase === "verified" ? 1 : 0.6 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: phase === "verified" ? "var(--gradient-mint)" : "oklch(0.78 0.16 165 / 0.3)" }}
          />

          {/* Camera frame */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/20">
            {/* Silhouette */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="face" cx="50%" cy="45%" r="40%">
                  <stop offset="0%" stopColor="oklch(0.7 0.05 60)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="oklch(0.3 0.04 265)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="85" rx="42" ry="55" fill="url(#face)" />
              <ellipse cx="100" cy="180" rx="65" ry="35" fill="url(#face)" />
            </svg>

            {/* Scan line */}
            {phase === "scanning" && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 280 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                className="absolute left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.85 0.15 165), transparent)", boxShadow: "0 0 20px oklch(0.85 0.15 165)" }}
              />
            )}

            {/* Mesh dots */}
            {phase === "scanning" && (
              <div className="absolute inset-0 grid place-items-center">
                {[...Array(24)].map((_, i) => {
                  const angle = (i / 24) * Math.PI * 2;
                  const r = 90;
                  return (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                      className="absolute size-1 rounded-full bg-mint"
                      style={{
                        left: `calc(50% + ${Math.cos(angle) * r}px)`,
                        top: `calc(50% + ${Math.sin(angle) * r}px)`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Corner brackets */}
          {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos) => (
            <div key={pos} className={`absolute ${pos} size-8`}>
              <div className="absolute top-0 left-0 w-5 h-[3px] rounded-full bg-mint" />
              <div className="absolute top-0 left-0 h-5 w-[3px] rounded-full bg-mint" />
            </div>
          ))}

          {/* Verified overlay */}
          <AnimatePresence>
            {phase === "verified" && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="size-28 rounded-full grid place-items-center shadow-[var(--shadow-mint)]" style={{ background: "var(--gradient-mint)" }}>
                  <Check className="size-14 text-ink" strokeWidth={3} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status text */}
        <div className="mt-10 text-center h-20">
          <AnimatePresence mode="wait">
            {phase === "scanning" ? (
              <motion.div key="s" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-center gap-2">
                  <span className="pulse-dot" />
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-mint">Scanning</p>
                </div>
                <p className="font-display text-[22px] font-semibold text-white mt-2">Verifying biometrics…</p>
              </motion.div>
            ) : (
              <motion.div key="v" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="size-4 text-mint" strokeWidth={2.5} />
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-mint">Verified · Live Sync</p>
                </div>
                <p className="font-display text-[26px] font-semibold text-white mt-2">Welcome, Aarav</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom info */}
      <AnimatePresence>
        {phase === "verified" && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 pb-6"
          >
            <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">Flight</p>
                  <p className="font-display text-[16px] font-semibold mt-0.5">6E 2134 · DEL → BLR</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/50">Gate · Seat</p>
                  <p className="font-display text-[16px] font-semibold mt-0.5">B12 · 08C</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                <Check className="size-3.5 text-mint" strokeWidth={3} />
                <p className="text-[11px] text-white/80">Verified via Live Sync · 0 manual checks</p>
              </div>
            </div>

            <button
              onClick={onRestart}
              className="w-full mt-4 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-white font-medium text-[13px] flex items-center justify-center gap-2"
            >
              Restart prototype
              <ArrowRight className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
