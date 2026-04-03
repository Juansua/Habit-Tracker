import { ConfirmModal } from './ConfirmModal'

const TrashIcon = (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
    <path
      d="M9 3h2m-6 3h10l-1 10H7L6 6zm3 3v5m2-5v5"
      stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

export const DeleteConfirmModal = ({ habit, onConfirm, onCancel }) => (
  <ConfirmModal
    open={!!habit}
    scheme="red"
    icon={TrashIcon}
    title="Eliminar hábito"
    message={
      habit
        ? <>¿Eliminar <span className="font-medium" style={{ color: '#e2e8f0' }}>"{habit.name}"</span>? Se perderán todos los registros y rachas.</>
        : null
    }
    confirmLabel="Eliminar"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
)
