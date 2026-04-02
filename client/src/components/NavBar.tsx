/*
 * Bloom — Cycle Tracker
 * Bottom navigation bar with organic, warm styling.
 */

import { NAV_ITEMS, type ViewType } from "@/lib/constants";
import { todayKey } from "@/lib/helpers";

interface NavBarProps {
  view: ViewType;
  setView: (v: ViewType) => void;
  setSelectedDate: (d: string) => void;
}

export default function NavBar({ view, setView, setSelectedDate }: NavBarProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-[#E8E0DA] flex justify-around py-2 pb-5 z-50">
      {NAV_ITEMS.map((tab) => {
        const isActive = view === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setView(tab.id);
              if (tab.id === "log") setSelectedDate(todayKey());
            }}
            className="flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-200"
          >
            <span
              className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[10px] transition-colors duration-200 ${
                isActive
                  ? "text-[#D94F5C] font-bold"
                  : "text-[#A99E98] font-normal"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-[#D94F5C] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
