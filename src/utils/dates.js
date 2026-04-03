export const toYMD = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const today = () => toYMD(new Date())

export const formatDateSpanish = (dateStr) => {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(toYMD(d))
  }
  return days
}

export const getLast30Days = () => {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(toYMD(d))
  }
  return days
}

export const getDayLabel = (dateStr) => {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('es-ES', { weekday: 'short' })
}

export const getShortDate = (dateStr) => {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export const getMonthLabel = (year, month) => {
  const date = new Date(year, month, 1)
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

// Returns an array of YYYY-MM-DD strings for every day in the month,
// padded with nulls at the start so day 1 falls on the correct weekday (Mon=0).
export const getDaysInMonth = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay()
  // Convert Sunday-based (0) to Monday-based (0)
  const leadingNulls = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(leadingNulls).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const m = String(month + 1).padStart(2, '0')
    const day = String(d).padStart(2, '0')
    cells.push(`${year}-${m}-${day}`)
  }
  return cells
}
