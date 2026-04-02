/*
 * Bloom — Cycle Tracker
 * Settings view: edit profile, cycle details, and reset data.
 * Botanical Wellness aesthetic with warm tones.
 */

import { useState } from "react";
import type { Profile } from "@/lib/constants";
import { toKey } from "@/lib/helpers";
import { motion } from "framer-motion";

interface SettingsViewProps {
  profile: Profile;
  saveProfile: (p: Profile | null) => void;
  resetAll: () => void;
  flash: (msg: string) => void;
}

function DateListPicker({ value, onChange }: { value: string | undefined; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const dates = Array.from({ length: 45 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    return d;
  });

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 border-2 border-[#E8E0DA] rounded-2xl text-base bg-[#FDFAF7] text-[#4A3F3A] text-left hover:bg-[#F5F0ED] transition-colors"
      >
        {value
          ? new Date(value + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" })
          : "Tap to select a date"}
      </button>
      {open && (
        <div className="mt-2 max-h-[180px] overflow-y-auto rounded-2xl border-2 border-[#E8E0DA] bg-[#FDFAF7]">
          {dates.map((d) => {
            const key = toKey(d);
            const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const isSelected = value === key;
            return (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm border-b border-[#E8E0DA]/50 last:border-b-0 transition-all ${
                  isSelected ? "bg-[#D94F5C] text-white font-bold" : "text-[#4A3F3A] hover:bg-[#F5F0ED]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SettingsView({ profile, saveProfile, resetAll, flash }: SettingsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-5 pt-5 pb-6"
    >
      <h2 className="font-serif text-[22px] text-[#4A3F3A]">Settings</h2>

      {/* Name */}
      <div className="mt-5">
        <p className="text-sm font-bold text-[#6B5E57] mb-1">Name</p>
        <input
          className="w-full px-4 py-3.5 border-2 border-[#E8E0DA] rounded-2xl text-base bg-[#FDFAF7] text-[#4A3F3A] placeholder:text-[#C4BAB2] focus:border-[#D94F5C]/30 transition-colors"
          value={profile.name || ""}
          placeholder="Your name"
          onChange={(e) => saveProfile({ ...profile, name: e.target.value })}
        />
      </div>

      {/* Last period */}
      <div className="mt-5">
        <p className="text-sm font-bold text-[#6B5E57] mb-1">Last period start</p>
        <DateListPicker
          value={profile.lastPeriod}
          onChange={(val) => {
            saveProfile({ ...profile, lastPeriod: val });
            flash("Updated \u2713");
          }}
        />
      </div>

      {/* Cycle length */}
      <div className="mt-5">
        <p className="text-sm font-bold text-[#6B5E57] mb-1">Cycle length</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() =>
              saveProfile({ ...profile, cycleLength: Math.max(20, profile.cycleLength - 1) })
            }
            className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
          >
            −
          </button>
          <span className="text-lg font-bold min-w-[80px] text-center text-[#4A3F3A]">
            {profile.cycleLength} days
          </span>
          <button
            onClick={() =>
              saveProfile({ ...profile, cycleLength: Math.min(45, profile.cycleLength + 1) })
            }
            className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Period length */}
      <div className="mt-5">
        <p className="text-sm font-bold text-[#6B5E57] mb-1">Period length</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() =>
              saveProfile({ ...profile, periodLength: Math.max(2, profile.periodLength - 1) })
            }
            className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
          >
            −
          </button>
          <span className="text-lg font-bold min-w-[80px] text-center text-[#4A3F3A]">
            {profile.periodLength} days
          </span>
          <button
            onClick={() =>
              saveProfile({ ...profile, periodLength: Math.min(10, profile.periodLength + 1) })
            }
            className="w-11 h-11 rounded-xl border-2 border-[#E8E0DA] bg-[#FDFAF7] text-xl flex items-center justify-center text-[#4A3F3A] hover:bg-[#F5F0ED] active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Privacy badge */}
      <div className="bg-[#EEFAF2] text-[#3DAA6D] px-4 py-2.5 rounded-xl text-[13px] font-semibold text-center mt-6">
        🔒 Your cycle data is stored locally on this device
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm("Reset all data? This cannot be undone.")) {
            resetAll();
          }
        }}
        className="w-full mt-6 px-5 py-3.5 bg-transparent text-[#D94F5C] border-2 border-[#E8E0DA] rounded-2xl text-[15px] font-semibold hover:bg-[#FFF0F2] transition-colors"
      >
        Reset All Data
      </button>

      {/* App info */}
      <div className="mt-8 text-center">
        <p className="text-[#C4BAB2] text-xs">Bloom — Cycle Tracker v1.0</p>
        <p className="text-[#C4BAB2] text-xs mt-1">Made with 🌸 for you</p>
      </div>
    </motion.div>
  );
}
