import { useState } from "react";
import { getDaysInMonth, getMonthLabel, toYMD } from "../utils/dates";
import { computeDayCompletion } from "../utils/streaks";

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

const DayCell = ({ dateStr, habits, completions }) => {
  const todayStr = toYMD(new Date());
  const isFuture = dateStr > todayStr;
  const isToday = dateStr === todayStr;
  const { pct, completed, total } = computeDayCompletion(
    habits,
    completions,
    dateStr,
  );

  const dayNum = parseInt(dateStr.split("-")[2], 10);

  const bright = pct > 50 && !isFuture;
  const textColor = bright ? "#848c96" : "#5a6474";

  return (
    <div
      className="aspect-square rounded-lg relative flex items-center justify-center"
      style={{
        background:
          isFuture || pct === 0
            ? "rgba(255,255,255,0.04)"
            : `rgba(99,102,241,${(pct / 100) * 0.7 + 0.1})`,
        border: isToday
          ? "1px solid rgba(99,102,241,0.6)"
          : "1px solid rgba(255,255,255,0.06)",
        opacity: isFuture ? 0.35 : 1,
      }}
      title={isFuture ? undefined : `${completed}/${total} hábitos`}
    >
      <span
        className="absolute top-1 left-1.5 text-[9px] leading-none"
        style={{ color: textColor }}
      >
        {dayNum}
      </span>
      {!isFuture && (
        <span
          className="text-[13px] font-bold leading-none"
          style={{
            color: bright ? "#afb6d3" : pct === 0 ? "#2a2d30" : "#596372",
          }}
        >
          {pct}%
        </span>
      )}
    </div>
  );
};

export const CalendarView = ({ habits, completions }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const cells = getDaysInMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    const isCurrentMonth =
      year === now.getFullYear() && month === now.getMonth();
    if (isCurrentMonth) return;
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-smooth"
          style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8" }}
        >
          ‹
        </button>
        <span className="text-sm font-medium text-white capitalize">
          {getMonthLabel(year, month)}
        </span>
        <button
          onClick={nextMonth}
          disabled={isCurrentMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-smooth"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: isCurrentMonth ? "#334155" : "#94a3b8",
            cursor: isCurrentMonth ? "default" : "pointer",
          }}
        >
          ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] text-slate-600 font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateStr, i) =>
          dateStr === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <DayCell
              key={dateStr}
              dateStr={dateStr}
              habits={habits}
              completions={completions}
            />
          ),
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[10px] text-slate-600">0%</span>
        {[0.1, 0.25, 0.45, 0.65, 0.8].map((o) => (
          <div
            key={o}
            className="w-3 h-3 rounded-sm"
            style={{ background: `rgba(99,102,241,${o})` }}
          />
        ))}
        <span className="text-[10px] text-slate-600">100%</span>
      </div>
    </div>
  );
};
