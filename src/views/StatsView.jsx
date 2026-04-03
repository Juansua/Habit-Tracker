import {
  getLast7Days,
  getLast30Days,
  getDayLabel,
  getShortDate,
} from "../utils/dates";
import {
  computeCurrentStreak,
  computeBestStreak,
  computeTotalCompleted,
} from "../utils/streaks";
import { CalendarView } from "./CalendarView";

const StatBadge = ({ label, value, color }) => (
  <div
    className="flex flex-col items-center p-3 rounded-xl flex-1"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <span className="text-2xl font-bold" style={{ color }}>
      {value}
    </span>
    <span className="text-xs text-slate-500 mt-0.5 text-center leading-tight">
      {label}
    </span>
  </div>
);

const MiniGrid7 = ({ habitId, completions, color, onToggle }) => {
  const days = getLast7Days();
  return (
    <div className="flex gap-1.5 mt-3">
      {days.map((day) => {
        const done = !!completions[`${habitId}_${day}`];
        return (
          <button
            key={day}
            onClick={() => onToggle(habitId, day)}
            title={getShortDate(day)}
            className="flex flex-col items-center gap-1 flex-1 cursor-pointer transition-smooth"
          >
            <span className="text-[9px] text-slate-600 uppercase">
              {getDayLabel(day)}
            </span>
            <div
              className="w-full aspect-square rounded-md transition-smooth"
              style={{
                background: done ? color : "rgba(255,255,255,0.05)",
                border: `1px solid ${done ? color + "88" : "rgba(255,255,255,0.08)"}`,
                transform: done ? "scale(1.05)" : "scale(1)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

const HeatMap30 = ({ habitId, completions, color, onToggle }) => {
  const days = getLast30Days();
  return (
    <div className="mt-3">
      <p className="text-[10px] text-slate-600 mb-1.5">Últimos 30 días</p>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
      >
        {days.map((day) => {
          const done = !!completions[`${habitId}_${day}`];
          return (
            <button
              key={day}
              onClick={() => onToggle(habitId, day)}
              title={getShortDate(day)}
              className="aspect-square rounded cursor-pointer transition-smooth"
              style={{
                background: done ? color : "rgba(255,255,255,0.05)",
                border: `1px solid ${done ? color + "66" : "rgba(255,255,255,0.06)"}`,
                opacity: done ? 1 : 0.6,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const HabitStats = ({ habit, completions, onToggle }) => {
  const streak = computeCurrentStreak(habit.id, completions);
  const best = computeBestStreak(habit.id, completions);
  const total = computeTotalCompleted(habit.id, completions);

  return (
    <div
      className="rounded-xl p-4 transition-smooth"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.07)`,
      }}
    >
      {/* Habit name */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ background: habit.color }}
        />
        <span className="font-semibold text-sm text-white">{habit.name}</span>
      </div>

      {/* Stats row */}
      <div className="flex gap-2 mb-1">
        <StatBadge
          label="Racha actual"
          value={streak === 0 ? "—" : `${streak}🔥`}
          color={habit.color}
        />
        <StatBadge
          label="Mejor racha"
          value={best === 0 ? "—" : `${best}⭐`}
          color="#f59e0b"
        />
        <StatBadge label="Total días" value={total} color="#94a3b8" />
      </div>

      {/* 7-day grid */}
      <MiniGrid7
        habitId={habit.id}
        completions={completions}
        color={habit.color}
        onToggle={onToggle}
      />

      {/* 30-day heatmap */}
      <HeatMap30
        habitId={habit.id}
        completions={completions}
        color={habit.color}
        onToggle={onToggle}
      />
    </div>
  );
};

export const StatsView = ({
  habits,
  completions,
  onToggle,
  statsTab: tab,
  onStatsTabChange: setTab,
}) => {
  if (habits.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 text-center py-16">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-slate-400 text-sm">
          Agrega hábitos para ver estadísticas
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Sub-tabs */}
      <div className="flex gap-4 mb-4">
        {["resumen", "calendario"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-sm capitalize cursor-pointer transition-smooth"
            style={{
              color: tab === t ? "#ffffff" : "#475569",
              fontWeight: tab === t ? 500 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "resumen" ? (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitStats
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : (
        <CalendarView habits={habits} completions={completions} />
      )}
    </div>
  );
};
