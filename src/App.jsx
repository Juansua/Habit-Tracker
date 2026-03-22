import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHabits } from './hooks/useHabits'
import { Header } from './components/Header'
import { TodayView } from './views/TodayView'
import { StatsView } from './views/StatsView'
import { DeleteConfirmModal } from './components/DeleteConfirmModal'
import { LoginScreen } from './components/LoginScreen'

function App() {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  const [activeView, setActiveView] = useState('hoy')
  const [habitToDelete, setHabitToDelete] = useState(null)

  const {
    habits,
    completions,
    loading: habitsLoading,
    addHabit,
    removeHabit,
    toggleCompletion,
    completedToday,
    progressPct,
  } = useHabits(user?.id)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: '#0f0f1a' }}>
        <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) return <LoginScreen onSignIn={signInWithGoogle} />

  const handleDeleteRequest = (id) => {
    const habit = habits.find((h) => h.id === id)
    if (habit) setHabitToDelete(habit)
  }

  const handleDeleteConfirm = () => {
    removeHabit(habitToDelete.id)
    setHabitToDelete(null)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }} />
      </div>

      <div className="relative z-0">
        <Header
          completedToday={completedToday}
          totalHabits={habits.length}
          progressPct={progressPct}
          activeView={activeView}
          setActiveView={setActiveView}
          user={user}
          onSignOut={signOut}
        />

        <main className="pb-12 pt-2">
          {habitsLoading ? (
            <div className="flex justify-center pt-16">
              <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            </div>
          ) : activeView === 'hoy' ? (
            <TodayView
              habits={habits}
              completions={completions}
              onToggle={toggleCompletion}
              onDelete={handleDeleteRequest}
              onAdd={addHabit}
            />
          ) : (
            <StatsView
              habits={habits}
              completions={completions}
              onToggle={toggleCompletion}
            />
          )}
        </main>
      </div>

      <DeleteConfirmModal
        habit={habitToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setHabitToDelete(null)}
      />
    </div>
  )
}

export default App
