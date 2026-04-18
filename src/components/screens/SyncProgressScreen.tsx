import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StatusBar } from "./StatusBar";
import { Check, Fingerprint, ShieldCheck, Plane } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const STEPS = [
  { icon: Plane, label: "Fetching airline data" },
  { icon: Fingerprint, label: "Updating biometric token" },
  { icon: ShieldCheck, label: "Securing credentials" },
];

export function SyncProgressScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(() => onComplete(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="flex h-full flex-col" style={{ background: "var(--gradient-hero)" }}>
      <StatusBar tint="light" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-8">
        {/* Animated rings */}
        <div className="relative size-56 grid place-items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-mint/40"
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            />
          ))}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-2 border-transparent border-t-mint border-r-mint/50"
          />

          <div className="size-32 rounded-full bg-white/10 backdrop-blur-xl grid place-items-center border border-white/20">
            <motion.div
              key={step}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="size-16 rounded-2xl grid place-items-center"
              style={{ background: "var(--gradient-mint)" }}
            >
              {(() => {
                const Icon = STEPS[step].icon;
                return <Icon className="size-8 text-ink" strokeWidth={2} />;
              })()}
            </motion.div>
          </div>
        </div>

        <motion.h2
          key={`title-${step}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[26px] font-semibold text-white mt-12 text-center leading-tight"
        >
          Updating your<br />travel credentials…
        </motion.h2>
        <p className="text-[13px] text-white/60 mt-3 text-center max-w-[260px]">
          Securely re-issuing your biometric token with the latest boarding pass
        </p>

        {/* Step pills */}
        <div className="mt-10 w-full space-y-2.5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isDone = i < step;
            const isActive = i === step;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur transition-all ${
                  isActive ? "bg-white/15 border border-mint/40" : "bg-white/5 border border-white/10"
                }`}
              >
                <div className={`size-9 rounded-xl grid place-items-center shrink-0 ${
                  isDone ? "bg-mint" : isActive ? "bg-white/20" : "bg-white/10"
                }`}>
                  {isDone ? (
                    <Check className="size-4 text-ink" strokeWidth={3} />
                  ) : (
                    <Icon className={`size-4 ${isActive ? "text-mint" : "text-white/50"}`} strokeWidth={2} />
                  )}
                </div>
                <span className={`text-[13px] font-medium flex-1 ${
                  isActive ? "text-white" : isDone ? "text-white/70" : "text-white/40"
                }`}>{s.label}</span>
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="size-3.5 rounded-full border-2 border-mint border-t-transparent"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-[11px] text-white/40 pb-8 tracking-wider">END-TO-END ENCRYPTED · GOVT. OF INDIA</p>
    </div>
  );
}
