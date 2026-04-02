/*
 * Bloom — Cycle Tracker
 * Setup wizard for first-time users. 3 steps: Welcome, Last Period, Cycle Details.
 * Botanical Wellness aesthetic with warm gradients and gentle animations.
 */

import { useState, useMemo } from "react";
import type { Profile } from "@/lib/constants";
import { toKey } from "@/lib/helpers";
import { motion, AnimatePresence } from "framer-motion";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508251297/gzdzzibSnzHDdKrMCz9XFG/bloom-hero-bg-7eit49EGcfcC9iMxcgeVBK.webp";

interface SetupWizardProps {
  onComplete: (profile: Profile) => void;
}

export default function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const handleDone = () => {
    onComplete({ name, cycleLength, periodLength, lastPeriod });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFAF7]/80 via-[#FFF0F2]/60 to-[#F5F0FF]/80" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 pb-7 max-w-[380px] w-full flex flex-col items-center shadow-[0_8px_40px_rgba(139,107,91,0.15)]"
        >
          {step === 0 && (
            <>
              <div className="text-6xl mb-3">🌸</div>
              <h1 className="font-serif text-4xl text-[#D94F5C] mb-1">Bloom</h1>
              <p className="text-[#8A7F7A] text-[15px] mb-2">Your cycle, beautifully simple</p>
              <div className="bg-[#EEFAF2] text-[#3DAA6D] px-4 py-2.5 rounded-xl text-[13px] font-semibold text-center mt-4 w-full">
                🔒 Your cycle data is stored locally on your device
              </div>
              <input
                className="w-full mt-4 px-4 py-3.5 border-2 border-[#E8E0DA] rounded-2xl text-base bg-[#FDFAF7] text-[#4A3F3A] placeholder:text-[#C4BAB2] focus:border-[#D94F5C]/30 transition-colors"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 py-3.5 bg-[#D94F5C] text-white rounded-2xl text-base font-bold hover:bg-[#C4454F] active:scale-[0.98] transition-all"
              >
                Get Started →
              </button>
            </>
          )}

          {step === 1 && (() => {
            const today = new Date();
            const recentDates = Array.from({ length: 45 }, (_, i) => {
              const d = new Date(today);
              d.setDate(d.getDate() - i);
              return d;
            });
            return (
              <>
                <div className="text-5xl mb-3">📅</div>
                <h2 className="font-serif text-[22px] text-[#4A3F3A] mb-1.5 text-center">
                  When did your last period start?
                </h2>
                <p className="text-[#A99E98] text-[13px] mb-4">Best guess is fine! Tap a date below.</p>
                <div className="w-full max-h-[200px] overflow-y-auto rounded-2xl border-2 border-[#E8E0DA] bg-[#FDFAF7] hide-scrollbar">
                  {recentDates.map((d) => {
                    const key = toKey(d);
                    const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    const isSelected = lastPeriod === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setLastPeriod(key)}
                        className={`w-full px-4 py-3 text-left text-sm border-b border-[#E8E0DA]/50 last:border-b-0 transition-all ${
                          isSelected
                            ? 'bg-[#D94F5C] text-white font-bold'
                            : 'text-[#4A3F3A] hover:bg-[#F5F0ED]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {lastPeriod && (
                  <p className="text-[13px] text-[#3DAA6D] font-semibold mt-2">
                    ✓ Selected: {new Date(lastPeriod + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
                <div className="flex gap-3 mt-4 w-full">
                  <button
                    onClick={() => setStep(0)}
                    className="px-5 py-3.5 bg-transparent text-[#8A7F7A] border-2 border-[#E8E0DA] rounded-2xl text-[15px] hover:bg-[#F5F0ED] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!lastPeriod}
                    className="flex-1 py-3.5 bg-[#D94F5C] text-white rounded-2xl text-base font-bold hover:bg-[#C4454F] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            );
          })()}

          {step === 2 && (
            <>
              <div className="text-5xl mb-3">⚙️</div>
              <h2 className="font-serif text-[22px] text-[#4A3F3A] mb-4 text-center">
                Cycle details
              </h2>

              <div className="w-full mb-5">
                <p className="text-sm font-bold text-[#6B5E57] mb-1">
                  Cycle length{" "}
                  <span className="font-normal text-[#A99E98] text-xs">(period to period)</span>
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setCycleLength(Math.max(20, cycleLength - 1))}
                    className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold min-w-[80px] text-center text-[#4A3F3A]">
                    {cycleLength} days
                  </span>
                  <button
                    onClick={() => setCycleLength(Math.min(45, cycleLength + 1))}
                    className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="w-full mb-2">
                <p className="text-sm font-bold text-[#6B5E57] mb-1">Period length</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setPeriodLength(Math.max(2, periodLength - 1))}
                    className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold min-w-[80px] text-center text-[#4A3F3A]">
                    {periodLength} days
                  </span>
                  <button
                    onClick={() => setPeriodLength(Math.min(10, periodLength + 1))}
                    className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-5 w-full">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 bg-transparent text-[#8A7F7A] border-2 border-[#E8E0DA] rounded-2xl text-[15px] hover:bg-[#F5F0ED] transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleDone}
                  className="flex-1 py-3.5 bg-[#D94F5C] text-white rounded-2xl text-base font-bold hover:bg-[#C4454F] active:scale-[0.98] transition-all"
                >
                  Done ✓
                </button>
              </div>
            </>
          )}

          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-[#D94F5C] scale-110" : "bg-[#E0D5CF]"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
