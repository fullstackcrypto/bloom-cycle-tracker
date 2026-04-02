/*
 * Bloom — Cycle Tracker
 * Log view: Flow level, mood chips, symptom chips, and notes.
 * Botanical Wellness aesthetic with petal-shaped chips and warm tones.
 */

import { MOODS, SYMPTOMS, FLOW_LEVELS, type Logs, type DayLog } from "@/lib/constants";
import { formatDate, todayKey } from "@/lib/helpers";
import { motion } from "framer-motion";

interface LogViewProps {
  selectedDate: string;
  logs: Logs;
  saveLogs: (l: Logs) => void;
  flash: (msg: string) => void;
}

export default function LogView({ selectedDate, logs, saveLogs, flash }: LogViewProps) {
  const isToday = selectedDate === todayKey();
  const dayLog: DayLog = logs[selectedDate] || {};

  const toggleInLog = (field: "moods" | "symptoms", value: string) => {
    const arr = dayLog[field] || [];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    const updated = { ...logs, [selectedDate]: { ...dayLog, [field]: next } };
    saveLogs(updated);
    flash("Saved ✓");
  };

  const setFlow = (level: number) => {
    const updated = { ...logs, [selectedDate]: { ...dayLog, flow: level } };
    saveLogs(updated);
    flash("Saved ✓");
  };

  const setNote = (text: string) => {
    const updated = { ...logs, [selectedDate]: { ...dayLog, note: text } };
    saveLogs(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-5 pt-5 pb-6"
    >
      <h2 className="font-serif text-[22px] text-[#4A3F3A]">Log Your Day</h2>
      <p className="text-[#A99E98] text-[13px] mt-1">
        {formatDate(selectedDate)}
        {isToday ? " (today)" : ""}
      </p>

      {/* Flow */}
      <div className="mt-5">
        <p className="text-[15px] font-bold text-[#6B5E57] mb-2.5">Flow</p>
        <div className="flex gap-2">
          {FLOW_LEVELS.map((f, i) => (
            <button
              key={i}
              onClick={() => setFlow(i)}
              className="flex-1 py-2.5 px-1 rounded-xl border-none flex flex-col items-center gap-1 font-semibold text-[13px] transition-all duration-150 active:scale-95"
              style={{
                background: dayLog.flow === i ? f.color : "#F5F0ED",
                color: dayLog.flow === i ? "#fff" : "#6B5E57",
              }}
            >
              <span>{f.dots > 0 ? "●".repeat(f.dots) : "—"}</span>
              <span className="text-[10px] mt-0.5">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Moods */}
      <div className="mt-5">
        <p className="text-[15px] font-bold text-[#6B5E57] mb-2.5">Mood</p>
        <div className="grid grid-cols-4 gap-2">
          {MOODS.map((m) => {
            const active = (dayLog.moods || []).includes(m.label);
            return (
              <button
                key={m.label}
                onClick={() => toggleInLog("moods", m.label)}
                className="py-2.5 px-1 rounded-xl border-none flex flex-col items-center gap-1 font-semibold transition-all duration-150 active:scale-95"
                style={{
                  background: active ? "#D94F5C" : "#F5F0ED",
                  color: active ? "#fff" : "#6B5E57",
                  transform: active ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span className="text-lg">{m.emoji}</span>
                <span className="text-[11px]">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptoms */}
      <div className="mt-5">
        <p className="text-[15px] font-bold text-[#6B5E57] mb-2.5">Symptoms</p>
        <div className="grid grid-cols-3 gap-2">
          {SYMPTOMS.map((s) => {
            const active = (dayLog.symptoms || []).includes(s.label);
            return (
              <button
                key={s.label}
                onClick={() => toggleInLog("symptoms", s.label)}
                className="py-2.5 px-1 rounded-xl border-none flex flex-col items-center gap-1 font-semibold transition-all duration-150 active:scale-95"
                style={{
                  background: active ? "#7E57C2" : "#F5F0ED",
                  color: active ? "#fff" : "#6B5E57",
                  transform: active ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span className="text-lg">{s.emoji}</span>
                <span className="text-[11px]">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-5">
        <p className="text-[15px] font-bold text-[#6B5E57] mb-2.5">Notes</p>
        <textarea
          className="w-full px-3.5 py-3 border-2 border-[#E8E0DA] rounded-2xl text-sm bg-[#FDFAF7] text-[#4A3F3A] resize-none placeholder:text-[#C4BAB2] focus:border-[#D94F5C]/30 transition-colors"
          placeholder="Anything else? (optional)"
          value={dayLog.note || ""}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => flash("Saved \u2713")}
          rows={3}
        />
      </div>

      {/* Summary badge */}
      {(dayLog.moods?.length || dayLog.symptoms?.length || dayLog.flow !== undefined) && (
        <div className="mt-5 bg-[#EEFAF2] text-[#3DAA6D] px-4 py-2.5 rounded-xl text-[13px] font-semibold text-center">
          ✓ Your entry for this day is saved automatically
        </div>
      )}
    </motion.div>
  );
}
