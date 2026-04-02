/*
 * Bloom — Cycle Tracker
 * Custom hook for localStorage persistence.
 * All data stays on-device for privacy.
 */

import { useState, useEffect, useCallback } from "react";
import type { Profile, Logs } from "@/lib/constants";

const PROFILE_KEY = "bloom-profile";
const LOGS_KEY = "bloom-logs";

export function useBloomStorage() {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [logs, setLogsState] = useState<Logs>({});
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      }
    } catch {}

    try {
      const savedLogs = localStorage.getItem(LOGS_KEY);
      if (savedLogs) {
        setLogsState(JSON.parse(savedLogs));
      }
    } catch {}

    setLoading(false);
  }, []);

  const saveProfile = useCallback((p: Profile | null) => {
    setProfileState(p);
    if (p) {
      try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch {}
    } else {
      try { localStorage.removeItem(PROFILE_KEY); } catch {}
    }
  }, []);

  const saveLogs = useCallback((l: Logs) => {
    setLogsState(l);
    try { localStorage.setItem(LOGS_KEY, JSON.stringify(l)); } catch {}
  }, []);

  const resetAll = useCallback(() => {
    try { localStorage.removeItem(PROFILE_KEY); } catch {}
    try { localStorage.removeItem(LOGS_KEY); } catch {}
    setProfileState(null);
    setLogsState({});
  }, []);

  return { profile, logs, loading, saveProfile, saveLogs, resetAll };
}
