import { today, formatDateSpanish } from '../utils/dates'

export const Header = ({ completedToday, totalHabits, progressPct, activeView, setActiveView, user, onSignOut }) => {
  const todayLabel = formatDateSpanish(today())

  return (
    <header className="sticky top-0 z-10 px-4 pt-6 pb-4"
      style={{ background: 'linear-gradient(to bottom, #0f0f1a 80%, transparent)' }}>
      <div className="max-w-lg mx-auto">
        {/* Title row */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Mis Hábitos</h1>
            <p className="text-xs text-slate-400 mt-0.5 capitalize">{todayLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-3xl font-bold text-white">{progressPct}%</span>
              <p className="text-xs text-slate-400">completado hoy</p>
            </div>
            {/* Avatar + sign out */}
            {user && (
              <button
                onClick={onSignOut}
                title="Cerrar sesión"
                className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-smooth hover:ring-2 hover:ring-indigo-500"
              >
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'rgba(99,102,241,0.4)' }}>
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full progress-bar-fill"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {completedToday} de {totalHabits} hábitos completados
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.05)' }}>
          {['hoy', 'estadisticas'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition-smooth cursor-pointer"
              style={{
                background: activeView === view ? 'rgba(99,102,241,0.3)' : 'transparent',
                color: activeView === view ? '#a5b4fc' : '#94a3b8',
                border: activeView === view ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
              }}
            >
              {view === 'hoy' ? 'Hoy' : 'Estadísticas'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
