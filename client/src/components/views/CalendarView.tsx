/*
 * Bloom — Cycle Tracker
 * Calendar view: monthly grid with phase-colored cells and log indicators.
 * Botanical Wellness aesthetic with warm tones.
 */

import { useState } from "react";
import { PHASES, type Profile, type Logs, type ViewType } from "@/lib/constants";
import { toKey, todayKey, getPhaseIndex, monthLabel } from "@/lib/helpers";
import { motion } from "framer-motion";

interface CalendarViewProps {
  profile: Profile;
  logs: Logs;
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  setView: (v: ViewType) => void;
}

export default function CalendarView({
  profile,
  logs,
  selectedDate,
  setSelectedDate,
  setView,
}: CalendarViewProps) {
  const [calMonth, setCalMonth] = useState(new Date());

  const calYear = calMonth.getFullYear();
  const calMo = calMonth.getMonth();
  const firstDay = new Date(calYear, calMo, 1).getDay();
  const daysInMonth = new Date(calYear, calMo + 1, 0).getDate();

  const calCells: (string | null)[] = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    calCells.push(toKey(new Date(calYear, calMo, i)));
  }

  const today = todayKey();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-5 pt-5 pb-6"
    >
      <h2 className="font-serif text-[22px] text-[#4A3F3A]">Calendar</h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between my-3">
        <button
          onClick={() => setCalMonth(new Date(calYear, calMo - 1, 1))}
          className="w-9 h-9 rounded-xl bg-[#F5F0ED] flex items-center justify-center text-xl text-[#4A3F3A] hover:bg-[#EBE4DD] active:scale-95 transition-all"
        >
          ‹
        </button>
        <span className="font-serif text-lg text-[#4A3F3A]">{monthLabel(calMonth)}</span>
        <button
          onClick={() => setCalMonth(new Date(calYear, calMo + 1, 1))}
          className="w-9 h-9 rounded-xl bg-[#F5F0ED] flex items-center justify-center text-xl text-[#4A3F3A] hover:bg-[#EBE4DD] active:scale-95 transition-all"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[11px] text-[#A99E98] font-bold py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calCells.map((dateStr, i) => {
          if (!dateStr) return <div key={i} />;

          const day = new Date(dateStr + "T12:00:00").getDate();
          const ph = getPhaseIndex(
            dateStr,
            profile.lastPeriod,
            profile.cycleLength,
            profile.periodLength
          );
          const hasLog = !!logs[dateStr];
          const isSel = dateStr === selectedDate;
          const isTd = dateStr === today;
          const phColor = ph !== null ? PHASES[ph].color : "transparent";

          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDate(dateStr);
                setView("log");
              }}
              className="aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-150 active:scale-95"
              style={{
                background: isSel ? phColor : isTd ? "#F5F0ED" : "transparent",
                color: isSel ? "#fff" : isTd ? "#D94F5C" : "#4A3F3A",
                fontWeight: isTd || isSel ? 700 : 400,
                border:
                  isTd && !isSel
                    ? `2px solid ${phColor || "#D94F5C"}`
                    : "2px solid transparent",
              }}
            >
              {day}
              {hasLog && !isSel && (
                <div
                  className="w-[5px] h-[5px] rounded-full absolute bottom-1"
                  style={{ background: phColor || "#ccc" }}
                />
              )}
              {ph === 0 && !isSel && (
                <div className="absolute top-0.5 right-0.5 text-[8px]">🩸</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-3.5 mt-4 flex-wrap">
        {PHASES.map((p) => (
          <div key={p.name} className="flex items-center gap-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-[11px] text-[#6B5E57]">{p.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
