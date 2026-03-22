import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { today } from '../utils/dates'

const COLORS = [
  '#6366f1',
  '#ec4899',
  '#10b981',
  '#f59e0b',
  '#3b82f6',
  '#a855f7',
  '#ef4444',
  '#14b8a6',
]

export const useHabits = (userId) => {
  const [habits, setHabits] = useState([])
  const [completions, setCompletions] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetch all habits and completions for this user
  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setLoading(true)

      const { data: habitsData } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at')

      const { data: completionsData } = await supabase
        .from('completions')
        .select('habit_id, day')
        .in('habit_id', (habitsData ?? []).map((h) => h.id))

      setHabits(habitsData ?? [])

      // Reconstruct flat object { "habitId_YYYY-MM-DD": true }
      const flat = {}
      for (const c of completionsData ?? []) {
        flat[`${c.habit_id}_${c.day}`] = true
      }
      setCompletions(flat)
      setLoading(false)
    }

    fetchData()
  }, [userId])

  const addHabit = async (name) => {
    const color = COLORS[habits.length % COLORS.length]
    const { data, error } = await supabase
      .from('habits')
      .insert({ name, color, user_id: userId })
      .select()
      .single()

    if (!error) setHabits((prev) => [...prev, data])
  }

  const removeHabit = async (id) => {
    await supabase.from('habits').delete().eq('id', id)
    setHabits((prev) => prev.filter((h) => h.id !== id))
    setCompletions((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${id}_`)) delete next[k]
      })
      return next
    })
  }

  const toggleCompletion = async (habitId, day) => {
    const key = `${habitId}_${day}`
    const isCurrentlyDone = !!completions[key]

    // Optimistic update
    setCompletions((prev) => ({ ...prev, [key]: !isCurrentlyDone }))

    if (isCurrentlyDone) {
      await supabase
        .from('completions')
        .delete()
        .eq('habit_id', habitId)
        .eq('day', day)
    } else {
      await supabase
        .from('completions')
        .insert({ habit_id: habitId, day })
    }
  }

  const todayStr = today()
  const completedToday = habits.filter((h) => !!completions[`${h.id}_${todayStr}`]).length
  const progressPct = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0

  return {
    habits,
    completions,
    loading,
    addHabit,
    removeHabit,
    toggleCompletion,
    completedToday,
    progressPct,
  }
}
