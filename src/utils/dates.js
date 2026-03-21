export const toYMD = (date) => {
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split('T')[0]
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
