import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowRight, Plane } from "lucide-react";
import { StatusBar } from "./StatusBar";

interface Props {
  onContinue: () => void;
}

export function SyncSuccessScreen({ onContinue }: Props) {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar tint="dark" />

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6">
        {/* Success animation */}
        <div className="flex flex-col items-center pt-8">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.15, 1] }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="size-24 rounded-full grid place-items-center shadow-[var(--shadow-mint)]"
              style={{ background: "var(--gradient-mint)" }}
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Check className="size-12 text-ink" strokeWidth={3} />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute inset-0 rounded-full bg-mint"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-[28px] font-semibold text-ink mt-6"
          >
            You're all set
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[13px] text-ink-soft mt-2 text-center max-w-[280px]"
          >
            Your boarding pass and biometric token are in sync. Walk straight to security.
          </motion.p>
        </div>

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 mx-auto w-fit chip bg-success/15 text-ink border border-success/30 px-3 py-1.5"
        >
          <ShieldCheck className="size-3.5" strokeWidth={2.5} />
          BIOMETRIC READY
        </motion.div>

        {/* Updated boarding pass */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-hero)" }}
        >
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
                <Check className="size-3" strokeWidth={3} /> UPDATED
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="font-display text-[36px] font-bold leading-none">DEL</p>
                <p className="text-[11px] text-white/70 mt-1.5">06:40</p>
              </div>
              <Plane className="size-4 text-mint -rotate-45 mb-3" fill="currentColor" strokeWidth={0} />
              <div className="text-right">
                <p className="font-display text-[36px] font-bold leading-none">BLR</p>
                <p className="text-[11px] text-white/70 mt-1.5">09:25</p>
              </div>
            </div>
          </div>

          <div className="perforation" style={{ backgroundColor: "transparent" }} />

          <div className="bg-white/[0.08] backdrop-blur p-5 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Gate</p>
              <p className="font-display text-[18px] font-semibold text-white mt-1">B12</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Seat</p>
              <div className="flex items-center gap-1.5 mt-1">
                <p className="font-display text-[18px] font-semibold text-mint">08C</p>
                <span className="text-[9px] text-mint">NEW</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Zone</p>
              <div className="flex items-center gap-1.5 mt-1">
                <p className="font-display text-[18px] font-semibold text-mint">2</p>
                <span className="text-[9px] text-mint">NEW</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sync receipt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 rounded-2xl bg-surface shadow-[var(--shadow-soft)] p-4 space-y-2.5"
        >
          <Receipt label="Synced at" value="09:41:14 IST" />
          <Receipt label="Token ID" value="DY-7F2A•••91C" mono />
          <Receipt label="Valid through" value="Boarding · 06:10" />
        </motion.div>
      </div>

      <div className="px-6 pb-6 pt-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[var(--shadow-elevated)]"
        >
          Proceed to Security
          <ArrowRight className="size-5" strokeWidth={2.4} />
        </motion.button>
      </div>
    </div>
  );
}

function Receipt({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-ink-soft">{label}</span>
      <span className={`text-ink font-semibold ${mono ? "font-mono text-[11px]" : ""}`}>{value}</span>
    </div>
  );
}
