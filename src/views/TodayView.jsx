import { HabitCard } from '../components/HabitCard'
import { AddHabitForm } from '../components/AddHabitForm'

export const TodayView = ({ habits, completions, onToggle, onDelete, onAdd }) => {
  if (habits.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 space-y-3">
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🌱</div>
          <p className="text-slate-400 text-sm mb-1">No tienes hábitos todavía</p>
          <p className="text-slate-600 text-xs">Agrega tu primer hábito para empezar</p>
        </div>
        <AddHabitForm onAdd={onAdd} />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 space-y-2">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          completions={completions}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
      <div className="pt-2">
        <AddHabitForm onAdd={onAdd} />
      </div>
    </div>
  )
}
