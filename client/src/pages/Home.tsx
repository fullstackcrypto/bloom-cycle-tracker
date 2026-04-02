/*
 * Bloom — Cycle Tracker
 * Main page orchestrating all views: Home, Log, Calendar, Insights, Settings.
 * Design: Botanical Wellness / Organic Naturalism
 * - Warm parchment base (#FDFAF7)
 * - DM Serif Display + Nunito typography
 * - Organic shapes, gentle animations
 */

import { useState, useRef, useCallback } from "react";
import { useBloomStorage } from "@/hooks/useStorage";
import type { ViewType, Profile } from "@/lib/constants";
import { todayKey } from "@/lib/helpers";
import SetupWizard from "@/components/SetupWizard";
import NavBar from "@/components/NavBar";
import Toast from "@/components/Toast";
import HomeView from "@/components/views/HomeView";
import LogView from "@/components/views/LogView";
import CalendarView from "@/components/views/CalendarView";
import InsightsView from "@/components/views/InsightsView";
import SettingsView from "@/components/views/SettingsView";

export default function Home() {
  const { profile, logs, loading, saveProfile, saveLogs, resetAll } = useBloomStorage();
  const [view, setView] = useState<ViewType>("home");
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const handleSetupComplete = useCallback(
    (p: Profile) => {
      saveProfile(p);
      flash("You're all set! 🌸");
    },
    [saveProfile, flash]
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FDFAF7]">
        <div className="text-6xl" style={{ animation: "spin 2s linear infinite" }}>
          🌸
        </div>
      </div>
    );
  }

  // Setup wizard for first-time users
  if (!profile) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  return (
    <div className="max-w-[430px] mx-auto bg-[#FDFAF7] min-h-screen relative pb-20">
      <Toast message={toast} />

      <div className="hide-scrollbar overflow-y-auto" style={{ minHeight: "calc(100vh - 80px)" }}>
        {view === "home" && (
          <HomeView
            profile={profile}
            setView={setView}
            setSelectedDate={setSelectedDate}
          />
        )}

        {view === "log" && (
          <LogView
            selectedDate={selectedDate}
            logs={logs}
            saveLogs={saveLogs}
            flash={flash}
          />
        )}

        {view === "calendar" && (
          <CalendarView
            profile={profile}
            logs={logs}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setView={setView}
          />
        )}

        {view === "insights" && <InsightsView logs={logs} />}

        {view === "settings" && (
          <SettingsView
            profile={profile}
            saveProfile={saveProfile}
            resetAll={() => {
              resetAll();
              setView("home");
            }}
            flash={flash}
          />
        )}
      </div>

      <NavBar view={view} setView={setView} setSelectedDate={setSelectedDate} />
    </div>
  );
}
