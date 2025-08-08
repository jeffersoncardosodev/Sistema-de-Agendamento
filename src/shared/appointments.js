const STORAGE_KEY = 'appointments'

export function listAppointments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export function saveAppointment(appointment) {
  const current = listAppointments()
  const withId = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...appointment }
  const updated = [...current, withId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return withId
}

export function removeAppointment(id) {
  const current = listAppointments()
  const updated = current.filter((a) => a.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function clearAppointments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
} 