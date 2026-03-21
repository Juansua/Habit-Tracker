export const DeleteConfirmModal = ({ habit, onConfirm, onCancel }) => {
  if (!habit) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.25)',
          boxShadow: '0 0 40px rgba(239,68,68,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" style={{ color: '#f87171' }}>
            <path
              d="M9 3h2m-6 3h10l-1 10H7L6 6zm3 3v5m2-5v5"
              stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-base font-semibold text-white mb-1">Eliminar hábito</h2>
        <p className="text-sm mb-1" style={{ color: '#94a3b8' }}>
          ¿Eliminar{' '}
          <span className="font-medium" style={{ color: '#e2e8f0' }}>
            "{habit.name}"
          </span>
          ?
        </p>
        <p className="text-xs mb-6" style={{ color: '#ef444466', color: '#f87171', opacity: 0.7 }}>
          Se perderán todos los registros y rachas de este hábito.
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-smooth cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-smooth cursor-pointer"
            style={{
              background: 'rgba(239,68,68,0.25)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#fca5a5',
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
