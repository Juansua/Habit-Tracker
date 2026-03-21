import { useState } from 'react'

export const AddHabitForm = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-smooth cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.15)',
          color: '#64748b',
        }}
      >
        <span className="text-xl leading-none">+</span>
        <span>Agregar nuevo hábito</span>
      </button>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.3)',
      }}
    >
      <input
        autoFocus
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del hábito..."
        maxLength={50}
        className="w-full bg-transparent text-white text-sm outline-none placeholder-slate-500 mb-3"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-2 text-sm font-medium rounded-lg transition-smooth cursor-pointer disabled:opacity-40"
          style={{ background: 'rgba(99,102,241,0.5)', color: '#c7d2fe' }}
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setName('') }}
          className="px-4 py-2 text-sm rounded-lg transition-smooth cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
