/*
 * Bloom — Cycle Tracker
 * Insights view: aggregated mood and symptom patterns over time.
 * Botanical Wellness aesthetic with warm tones and progress bars.
 */

import { MOODS, SYMPTOMS, type Logs } from "@/lib/constants";
import { motion } from "framer-motion";

const INSIGHTS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508251297/gzdzzibSnzHDdKrMCz9XFG/bloom-insights-pattern-2CDyyV3ZwaAacwKVvBRGTo.webp";

interface InsightsViewProps {
  logs: Logs;
}

function computeInsights(logs: Logs) {
  const entries = Object.entries(logs);
  if (entries.length < 2) return null;

  const moods: Record<string, number> = {};
  const symptoms: Record<string, number> = {};

  entries.forEach(([, l]) => {
    (l.moods || []).forEach((m) => (moods[m] = (moods[m] || 0) + 1));
    (l.symptoms || []).forEach((s) => (symptoms[s] = (symptoms[s] || 0) + 1));
  });

  const topMoods = Object.entries(moods)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const topSymptoms = Object.entries(symptoms)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return { total: entries.length, topMoods, topSymptoms };
}

export default function InsightsView({ logs }: InsightsViewProps) {
  const data = computeInsights(logs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-5 pt-5 pb-6"
    >
      <h2 className="font-serif text-[22px] text-[#4A3F3A]">Insights</h2>

      {!data ? (
        <div className="flex flex-col items-center justify-center pt-20">
          <div
            className="w-32 h-32 rounded-full bg-cover bg-center opacity-40 mb-4"
            style={{ backgroundImage: `url(${INSIGHTS_BG})` }}
          />
          <span className="text-5xl mb-3">🌱</span>
          <p className="text-[#8A7F7A] text-center leading-relaxed max-w-[260px]">
            Log at least 2 days to start seeing your patterns here.
          </p>
        </div>
      ) : (
        <>
          {/* Total logged */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center gap-4 bg-[#F5F0ED] rounded-2xl p-5 mb-5 mt-3"
          >
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-serif text-3xl text-[#4A3F3A]">{data.total}</p>
              <p className="text-[#8A7F7A] text-[13px]">days logged</p>
            </div>
          </motion.div>

          {/* Top Moods */}
          {data.topMoods.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6"
            >
              <p className="text-[15px] font-bold text-[#6B5E57] mb-3">Top Moods</p>
              {data.topMoods.map(([mood, count]) => {
                const m = MOODS.find((x) => x.label === mood);
                return (
                  <div key={mood} className="flex items-center gap-2.5 mb-2.5 text-[13px]">
                    <span className="min-w-[100px]">
                      {m?.emoji} {mood}
                    </span>
                    <div className="flex-1 h-2 bg-[#E8E0DA] rounded overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(100, (count / data.total) * 100)}%`,
                          background: "#D94F5C",
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#A99E98] min-w-[28px] text-right">
                      {count}×
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Top Symptoms */}
          {data.topSymptoms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-6"
            >
              <p className="text-[15px] font-bold text-[#6B5E57] mb-3">Top Symptoms</p>
              {data.topSymptoms.map(([sym, count]) => {
                const s = SYMPTOMS.find((x) => x.label === sym);
                return (
                  <div key={sym} className="flex items-center gap-2.5 mb-2.5 text-[13px]">
                    <span className="min-w-[100px]">
                      {s?.emoji} {sym}
                    </span>
                    <div className="flex-1 h-2 bg-[#E8E0DA] rounded overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(100, (count / data.total) * 100)}%`,
                          background: "#7E57C2",
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#A99E98] min-w-[28px] text-right">
                      {count}×
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
