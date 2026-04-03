import { today, toYMD } from './dates'

export const computeCurrentStreak = (habitId, completions) => {
  let streak = 0
  const todayStr = today()
  const d = new Date()

  // Check if today is completed; if not, start from yesterday
  const todayKey = `${habitId}_${todayStr}`
  if (!completions[todayKey]) {
    d.setDate(d.getDate() - 1)
  }

  while (true) {
    const key = `${habitId}_${toYMD(d)}`
    if (completions[key]) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export const computeBestStreak = (habitId, completions) => {
  const keys = Object.keys(completions)
    .filter((k) => k.startsWith(`${habitId}_`) && completions[k])
    .map((k) => k.replace(`${habitId}_`, ''))
    .sort()

  if (keys.length === 0) return 0

  let best = 1
  let current = 1

  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(keys[i - 1] + 'T12:00:00')
    const curr = new Date(keys[i] + 'T12:00:00')
    const diff = (curr - prev) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      current++
      if (current > best) best = current
    } else {
      current = 1
    }
  }

  return best
}

export const computeTotalCompleted = (habitId, completions) => {
  return Object.keys(completions).filter(
    (k) => k.startsWith(`${habitId}_`) && completions[k]
  ).length
}

export const computeDayCompletion = (habits, completions, dateStr) => {
  if (habits.length === 0) return { completed: 0, total: 0, pct: 0 }
  const completed = habits.filter((h) => !!completions[`${h.id}_${dateStr}`]).length
  return { completed, total: habits.length, pct: Math.round((completed / habits.length) * 100) }
}
