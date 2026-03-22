import { DndContext, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableHabitCard } from '../components/SortableHabitCard'
import { AddHabitForm } from '../components/AddHabitForm'

export const TodayView = ({ habits, completions, onToggle, onDelete, onAdd, onReorder }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const from = habits.findIndex((h) => h.id === active.id)
    const to = habits.findIndex((h) => h.id === over.id)
    onReorder(arrayMove(habits, from, to))
  }

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
    <div className="max-w-lg mx-auto px-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={habits.map((h) => h.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {habits.map((habit) => (
              <SortableHabitCard
                key={habit.id}
                habit={habit}
                completions={completions}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="pt-2">
        <AddHabitForm onAdd={onAdd} />
      </div>
    </div>
  )
}
