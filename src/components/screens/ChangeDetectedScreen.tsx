import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { StatusBar } from "./StatusBar";

interface Props {
  onBack: () => void;
  onSync: () => void;
}

export function ChangeDetectedScreen({ onBack, onSync }: Props) {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar tint="dark" />

      <div className="px-6 pt-2 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="size-10 rounded-full bg-surface shadow-[var(--shadow-soft)] grid place-items-center">
          <ArrowLeft className="size-5 text-ink" strokeWidth={2} />
        </button>
        <div>
          <p className="text-[11px] font-medium text-ink-soft uppercase tracking-[0.12em]">Live Sync</p>
          <h1 className="text-[18px] font-semibold text-ink">Change Detected</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6">
        {/* Alert hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 bg-gradient-to-br from-[oklch(1_0_0)] to-[oklch(0.97_0.04_60)] border border-warning/30 shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="size-12 rounded-2xl bg-warning/20 grid place-items-center shrink-0"
            >
              <AlertTriangle className="size-6 text-warning-foreground" strokeWidth={2} fill="oklch(0.85 0.18 75)" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-[16px] font-semibold text-ink">Your flight details have changed</h2>
              <p className="text-[12px] text-ink-soft mt-1 leading-relaxed">
                IndiGo has updated your boarding pass. Sync now to keep your biometric token valid at security.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-ink-soft">
            <Clock className="size-3.5" />
            <span>Detected 12 seconds ago via airline API</span>
          </div>
        </motion.div>

        {/* Diff comparison */}
        <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-soft mt-6 mb-3">What changed</p>

        <div className="space-y-3">
          <DiffRow label="Seat" oldValue="14A" newValue="08C" highlight />
          <DiffRow label="Boarding zone" oldValue="Zone 4" newValue="Zone 2" highlight />
          <DiffRow label="Gate" oldValue="B12" newValue="B12" />
          <DiffRow label="Boarding time" oldValue="06:10" newValue="06:10" />
        </div>

        {/* Why sync */}
        <div className="mt-6 rounded-2xl bg-surface shadow-[var(--shadow-soft)] p-4">
          <p className="text-[12px] font-semibold text-ink">Why this matters</p>
          <p className="text-[11px] text-ink-soft mt-1.5 leading-relaxed">
            Your biometric travel token is bound to your boarding pass. Without sync, security gates may reject your face scan and require manual verification.
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="px-6 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSync}
          className="w-full h-14 rounded-2xl text-ink font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[var(--shadow-mint)]"
          style={{ background: "var(--gradient-mint)" }}
        >
          Sync Now
          <ArrowRight className="size-5" strokeWidth={2.4} />
        </motion.button>
        <button className="w-full mt-3 text-[12px] text-ink-soft font-medium">
          Use fallback QR boarding pass
        </button>
      </div>
    </div>
  );
}

function DiffRow({ label, oldValue, newValue, highlight }: { label: string; oldValue: string; newValue: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl bg-surface shadow-[var(--shadow-soft)] p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-soft">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex-1">
          <p className={`font-display text-[20px] font-semibold ${highlight ? "text-ink-soft line-through" : "text-ink-soft"}`}>{oldValue}</p>
          <p className="text-[10px] text-ink-soft/70 mt-0.5">Previous</p>
        </div>
        <ArrowRight className={`size-5 ${highlight ? "text-success" : "text-ink-soft/40"}`} strokeWidth={2.2} />
        <div className="flex-1 text-right">
          <p className={`font-display text-[20px] font-semibold ${highlight ? "text-success" : "text-ink"}`}>{newValue}</p>
          <p className="text-[10px] text-ink-soft/70 mt-0.5">Updated</p>
        </div>
      </div>
    </div>
  );
}
