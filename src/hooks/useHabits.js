import { useState, useEffect } from 'react'
import { today } from '../utils/dates'

const COLORS = [
  '#6366f1', // indigo
  '#ec4899', // pink
  '#10b981', // emerald
  '#f59e0b', // amber
  '#3b82f6', // blue
  '#a855f7', // purple
  '#ef4444', // red
  '#14b8a6', // teal
]

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const useHabits = () => {
  const [habits, setHabits] = useState(() => load('habits', []))
  const [completions, setCompletions] = useState(() => load('completions', {}))

  useEffect(() => { save('habits', habits) }, [habits])
  useEffect(() => { save('completions', completions) }, [completions])

  const addHabit = (name) => {
    const colorIndex = habits.length % COLORS.length
    const habit = {
      id: crypto.randomUUID(),
      name,
      color: COLORS[colorIndex],
      created_at: new Date().toISOString(),
    }
    setHabits((prev) => [...prev, habit])
  }

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id))
    setCompletions((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${id}_`)) delete next[k]
      })
      return next
    })
  }

  const toggleCompletion = (habitId, day) => {
    const key = `${habitId}_${day}`
    setCompletions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const isCompleted = (habitId, day) => {
    return !!completions[`${habitId}_${day}`]
  }

  const todayStr = today()
  const completedToday = habits.filter((h) => isCompleted(h.id, todayStr)).length
  const progressPct = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0

  return {
    habits,
    completions,
    addHabit,
    removeHabit,
    toggleCompletion,
    isCompleted,
    completedToday,
    progressPct,
  }
}
