const SCHEMES = {
  purple: {
    bg: '#110f1a',
    border: 'rgba(168,85,247,0.25)',
    shadow: 'rgba(168,85,247,0.08)',
    iconBg: 'rgba(168,85,247,0.12)',
    iconBorder: 'rgba(168,85,247,0.25)',
    iconColor: '#c084fc',
    confirmBg: 'rgba(168,85,247,0.2)',
    confirmBorder: 'rgba(168,85,247,0.35)',
    confirmColor: '#e9d5ff',
  },
  red: {
    bg: '#1a0f0f',
    border: 'rgba(239,68,68,0.25)',
    shadow: 'rgba(239,68,68,0.1)',
    iconBg: 'rgba(239,68,68,0.15)',
    iconBorder: 'rgba(239,68,68,0.3)',
    iconColor: '#f87171',
    confirmBg: 'rgba(239,68,68,0.25)',
    confirmBorder: 'rgba(239,68,68,0.4)',
    confirmColor: '#fca5a5',
  },
}

export const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  icon,
  scheme = 'purple',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null

  const s = SCHEMES[scheme]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{
          background: s.bg,
          border: `1px solid ${s.border}`,
          boxShadow: `0 0 40px ${s.shadow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        {icon && (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}`, color: s.iconColor }}
          >
            {icon}
          </div>
        )}

        {/* Text */}
        <h2 className="text-base font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>{message}</p>

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
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl transition-smooth cursor-pointer"
            style={{
              background: s.confirmBg,
              border: `1px solid ${s.confirmBorder}`,
              color: s.confirmColor,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
