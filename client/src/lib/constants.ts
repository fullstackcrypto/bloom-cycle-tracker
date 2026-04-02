/*
 * Bloom — Cycle Tracker
 * Design: Botanical Wellness / Organic Naturalism
 * Data constants for cycle phases, moods, symptoms, and flow levels.
 */

export interface Phase {
  name: string;
  color: string;
  bg: string;
  icon: string;
  tip: string;
}

export interface MoodOption {
  emoji: string;
  label: string;
}

export interface SymptomOption {
  emoji: string;
  label: string;
}

export interface FlowLevel {
  label: string;
  dots: number;
  color: string;
}

export interface Profile {
  name: string;
  cycleLength: number;
  periodLength: number;
  lastPeriod: string;
}

export interface DayLog {
  moods?: string[];
  symptoms?: string[];
  flow?: number;
  note?: string;
}

export type Logs = Record<string, DayLog>;

export type ViewType = "home" | "log" | "calendar" | "insights" | "settings";

export const PHASES: Phase[] = [
  { name: "Menstrual", color: "#D94F5C", bg: "#FFF0F2", icon: "🔥", tip: "Rest & recharge — gentle walks, warm drinks" },
  { name: "Follicular", color: "#E8923E", bg: "#FFF5EC", icon: "🌱", tip: "Energy rising — great for starting new things" },
  { name: "Ovulation", color: "#3DAA6D", bg: "#EEFAF2", icon: "✨", tip: "Peak energy — socialize, create, move" },
  { name: "Luteal", color: "#7E57C2", bg: "#F5F0FF", icon: "🌙", tip: "Slow down — cozy nights, comfort food" },
];

export const MOODS: MoodOption[] = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Low" },
  { emoji: "😤", label: "Irritable" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🥰", label: "Loving" },
  { emoji: "😴", label: "Tired" },
  { emoji: "⚡", label: "Energized" },
];

export const SYMPTOMS: SymptomOption[] = [
  { emoji: "💫", label: "Cramps" },
  { emoji: "🤕", label: "Headache" },
  { emoji: "😣", label: "Bloating" },
  { emoji: "🍫", label: "Cravings" },
  { emoji: "💤", label: "Fatigue" },
  { emoji: "🎭", label: "Mood swings" },
  { emoji: "😓", label: "Breakouts" },
  { emoji: "🫶", label: "Tender" },
  { emoji: "✅", label: "Great!" },
];

export const FLOW_LEVELS: FlowLevel[] = [
  { label: "None", dots: 0, color: "#ccc" },
  { label: "Spotting", dots: 1, color: "#F4A6B0" },
  { label: "Light", dots: 2, color: "#E8758A" },
  { label: "Medium", dots: 3, color: "#D94F5C" },
  { label: "Heavy", dots: 4, color: "#B83045" },
];

export const NAV_ITEMS = [
  { id: "home" as ViewType, icon: "🌸", label: "Home" },
  { id: "log" as ViewType, icon: "📝", label: "Log" },
  { id: "calendar" as ViewType, icon: "📅", label: "Calendar" },
  { id: "insights" as ViewType, icon: "📊", label: "Insights" },
  { id: "settings" as ViewType, icon: "⚙️", label: "Settings" },
];
