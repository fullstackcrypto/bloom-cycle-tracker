/*
 * Bloom — Cycle Tracker
 * Home view: greeting, ring visualization, phase card, countdown, quick log button.
 * Botanical Wellness aesthetic with warm tones and gentle animations.
 */

import Ring from "@/components/Ring";
import { PHASES, type Profile, type ViewType } from "@/lib/constants";
import { formatDate, todayKey, getCycleDay, getPhaseIndex, getDaysUntilPeriod } from "@/lib/helpers";
import { motion } from "framer-motion";

interface HomeViewProps {
  profile: Profile;
  setView: (v: ViewType) => void;
  setSelectedDate: (d: string) => void;
}

export default function HomeView({ profile, setView, setSelectedDate }: HomeViewProps) {
  const today = todayKey();
  const phaseIdx = getPhaseIndex(today, profile.lastPeriod, profile.cycleLength, profile.periodLength) ?? 0;
  const phase = PHASES[phaseIdx];
  const cycleDay = getCycleDay(today, profile.lastPeriod, profile.cycleLength);
  const untilPeriod = getDaysUntilPeriod(profile.lastPeriod, profile.cycleLength);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-5 pt-5 pb-6"
    >
      {/* Stable SEO headings — visually hidden, meaningful for search and screen readers */}
      <h1 className="sr-only">Private cycle tracking made simple</h1>
      <h2 className="sr-only">Track periods, moods, symptoms, and cycle insights</h2>

      {/* Header */}
      <div className="mb-1">
        <p className="font-serif text-[26px] text-[#4A3F3A]">
          {profile.name ? `Hi ${profile.name}` : "Hey there"} 🌸
        </p>
        <p className="text-[#A99E98] text-[13px] mt-1">{formatDate(today)}</p>
      </div>

      {/* Ring */}
      <div className="flex justify-center my-4">
        <Ring cycleDay={cycleDay} phaseIdx={phaseIdx} profile={profile} />
      </div>

      {/* Phase card */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-2xl p-4 mb-3.5"
        style={{ background: phase.bg, borderLeft: `4px solid ${phase.color}` }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[22px]">{phase.icon}</span>
          <span className="font-bold text-base" style={{ color: phase.color }}>
            {phase.name} Phase
          </span>
        </div>
        <p className="text-[#6B5E57] text-[13px] leading-relaxed">{phase.tip}</p>
      </motion.div>

      {/* Countdown */}
      {untilPeriod !== null && phaseIdx !== 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#F5F0ED] rounded-2xl px-5 py-4 flex items-center gap-3 mb-3.5"
        >
          <span className="font-serif text-4xl text-[#D94F5C]">{untilPeriod}</span>
          <span className="text-sm text-[#6B5E57]">days until next period</span>
        </motion.div>
      )}

      {phaseIdx === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#FFF0F2] rounded-2xl px-5 py-4 mb-3.5"
        >
          <span className="text-sm text-[#D94F5C] font-bold">
            🩸 Period is here — take it easy today
          </span>
        </motion.div>
      )}

      {/* Quick log button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onClick={() => {
          setView("log");
          setSelectedDate(today);
        }}
        className="w-full py-4 bg-[#4A3F3A] text-white rounded-2xl text-base font-bold hover:bg-[#3D3430] active:scale-[0.98] transition-all mt-1"
      >
        📝 Log Today
      </motion.button>
    </motion.div>
  );
}
