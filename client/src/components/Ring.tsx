/*
 * Bloom — Cycle Tracker
 * Ring visualization component showing cycle phases as colored arcs
 * with a floating day marker. Botanical Wellness aesthetic.
 */

import { PHASES } from "@/lib/constants";
import type { Profile } from "@/lib/constants";

interface RingProps {
  cycleDay: number | null;
  phaseIdx: number;
  profile: Profile;
}

export default function Ring({ cycleDay, phaseIdx, profile }: RingProps) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 82;
  const sw = 18;
  const { cycleLength: cl, periodLength: pl } = profile;

  const segments: [number, number][] = [
    [0, pl / cl],
    [pl / cl, Math.floor(cl * 0.45) / cl],
    [Math.floor(cl * 0.45) / cl, Math.floor(cl * 0.55) / cl],
    [Math.floor(cl * 0.55) / cl, 1],
  ];

  const cdNorm = cycleDay ? (cycleDay - 0.5) / cl : 0;
  const mAngle = cdNorm * 360 - 90;
  const mRad = (mAngle * Math.PI) / 180;
  const mx = cx + r * Math.cos(mRad);
  const my = cy + r * Math.sin(mRad);

  const phase = PHASES[phaseIdx];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-sm"
    >
      {/* Background ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#F0EBE6"
        strokeWidth={sw}
        opacity={0.5}
      />

      {/* Phase segments */}
      {segments.map(([s, e], i) => {
        const sa = s * 360 - 90;
        const ea = e * 360 - 90;
        const sr = (sa * Math.PI) / 180;
        const er = (ea * Math.PI) / 180;
        const la = e - s > 0.5 ? 1 : 0;
        return (
          <path
            key={i}
            d={`M ${cx + r * Math.cos(sr)} ${cy + r * Math.sin(sr)} A ${r} ${r} 0 ${la} 1 ${cx + r * Math.cos(er)} ${cy + r * Math.sin(er)}`}
            fill="none"
            stroke={PHASES[i].color}
            strokeWidth={sw}
            strokeLinecap="round"
            opacity={phaseIdx === i ? 1 : 0.2}
            style={{
              transition: "opacity 0.5s ease",
            }}
          />
        );
      })}

      {/* Day marker */}
      {cycleDay && (
        <>
          <circle
            cx={mx}
            cy={my}
            r={14}
            fill="white"
            stroke={phase.color}
            strokeWidth={3}
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          />
          <circle
            cx={mx}
            cy={my}
            r={5}
            fill={phase.color}
          />
        </>
      )}

      {/* Center text */}
      <text
        x={cx}
        y={cy - 14}
        textAnchor="middle"
        style={{
          fontSize: 30,
          fontWeight: 700,
          fill: phase.color,
          fontFamily: "'DM Serif Display', serif",
        }}
      >
        Day {cycleDay || "—"}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        style={{
          fontSize: 14,
          fill: "#8A7F7A",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 600,
        }}
      >
        {phase.name}
      </text>
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        style={{
          fontSize: 11,
          fill: "#A99E98",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        of {profile.cycleLength}
      </text>
    </svg>
  );
}
