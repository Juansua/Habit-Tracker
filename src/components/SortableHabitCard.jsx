import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HabitCard } from './HabitCard'

export const SortableHabitCard = ({ habit, completions, onToggle, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: habit.id,
  })

  const dragProps = {
    ref: setNodeRef,
    style: { transform: CSS.Transform.toString(transform), transition },
    attributes,
    handleListeners: listeners,
    isDragging,
  }

  return (
    <HabitCard
      habit={habit}
      completions={completions}
      onToggle={onToggle}
      onDelete={onDelete}
      dragProps={dragProps}
    />
  )
}
