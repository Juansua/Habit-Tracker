import { today } from '../utils/dates'
import { computeCurrentStreak } from '../utils/streaks'

export const HabitCard = ({ habit, completions, onToggle, onDelete }) => {
  const todayStr = today()
  const done = !!completions[`${habit.id}_${todayStr}`]
  const streak = computeCurrentStreak(habit.id, completions)

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth"
      style={{
        background: done
          ? `linear-gradient(135deg, ${habit.color}22, ${habit.color}11)`
          : 'rgba(255,255,255,0.04)',
        border: `1px solid ${done ? habit.color + '44' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {/* Color indicator */}
      <div className="w-1 self-stretch rounded-full flex-shrink-0"
        style={{ background: habit.color }} />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(habit.id, todayStr)}
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center checkbox-anim cursor-pointer"
        style={{
          background: done ? habit.color : 'transparent',
          border: `2px solid ${done ? habit.color : 'rgba(255,255,255,0.2)'}`,
        }}
        aria-label={done ? 'Desmarcar' : 'Marcar como completado'}
      >
        {done && (
          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
            <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Name */}
      <span
        className="flex-1 text-sm font-medium transition-smooth"
        style={{
          color: done ? '#e2e8f0' : '#94a3b8',
          textDecoration: done ? 'none' : 'none',
        }}
      >
        {habit.name}
      </span>

      {/* Streak badge */}
      {streak > 0 && (
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: `${habit.color}22`,
            color: habit.color,
            border: `1px solid ${habit.color}44`,
          }}
        >
          🔥 {streak}
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(habit.id)}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer hover:opacity-100"
        style={{ color: '#475569' }}
        aria-label="Eliminar hábito"
        title="Eliminar hábito"
      >
        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
