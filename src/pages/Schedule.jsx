import React, { useMemo, useState } from 'react'
import { saveAppointment } from '../shared/appointments'
import { barbers } from '../shared/barbers'

const services = [
  { id: 'corte', name: 'Corte', price: 35 },
  { id: 'corte simples', name: 'Corte Simples', price: 20 },
  { id: 'barba', name: 'Barba', price: 20 },
  { id: 'sobrancelha', name: 'Sobrancellha', price: 15 },
  { id: 'combo1', name: 'Corte + Barba', price: 50 },
  { id: 'combo2', name: 'Corte + Barba + Sobrancelha', price: 55 },
]

const allowedTimes = Array.from({ length: 11 }, (_, i) => `${String(i + 9).padStart(2, '0')}:00`)

function isAllowedDate(dateStr) {
  if (!dateStr) return false
  const d = new Date(`${dateStr}T00:00:00`)
  const day = d.getDay() // 0=Dom, 1=Seg, ..., 6=Sáb
  return day === 1 || day === 6
}

function isAllowedTime(timeStr) {
  if (!timeStr) return false
  const [hh, mm] = timeStr.split(':').map(Number)
  const minutes = hh * 60 + (mm || 0)
  const start = 9 * 60 // 09:00
  const end = 19 * 60 // 19:00
  return minutes >= start && minutes <= end
}

export default function SchedulePage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState(allowedTimes[0])
  const [service, setService] = useState(services[0].id)
  const [barberId, setBarberId] = useState(barbers[0].id)
  const [notes, setNotes] = useState('')
  const [success, setSuccess] = useState('')
  const [dateError, setDateError] = useState('')
  const [timeError, setTimeError] = useState('')

  const isValid = useMemo(() => {
    return (
      name &&
      phone &&
      date &&
      time &&
      service &&
      barberId &&
      isAllowedDate(date) &&
      isAllowedTime(time)
    )
  }, [name, phone, date, time, service, barberId])

  function handleSubmit(e) {
    e.preventDefault()
    let hasError = false
    if (!isAllowedDate(date)) {
      setDateError('Agendamentos apenas às segundas e sábados.')
      hasError = true
    }
    if (!isAllowedTime(time)) {
      setTimeError('Horários permitidos apenas entre 09:00 e 19:00.')
      hasError = true
    }
    if (hasError) return

    const barber = barbers.find((b) => b.id === barberId)
    const saved = saveAppointment({ name, phone, date, time, service, barber, notes })
    setSuccess(`Agendamento criado para ${saved.date} às ${saved.time} com ${barber.name}.`)
    setDateError('')
    setTimeError('')
    setName('')
    setPhone('')
    setDate('')
    setTime(allowedTimes[0])
    setService(services[0].id)
    setBarberId(barbers[0].id)
    setNotes('')
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-6 sm:py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900">Agendar horário</h2>
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <span className="text-xs text-gray-500">Somente segundas e sábados</span>
            </div>
            <input
              type="date"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={date}
              onChange={(e) => {
                const v = e.target.value
                setDate(v)
                setDateError(v && !isAllowedDate(v) ? 'Agendamentos apenas às segundas e sábados.' : '')
              }}
              required
            />
            {date && !isAllowedDate(date) && (
              <p className="mt-1 text-xs text-red-600">{dateError || 'Agendamentos apenas às segundas e sábados.'}</p>
            )}
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label className="block text-sm font-medium text-gray-700">Hora</label>
              <span className="text-xs text-gray-500">Entre 09:00 e 19:00</span>
            </div>
            <select
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={time}
              onChange={(e) => {
                const v = e.target.value
                setTime(v)
                setTimeError(v && !isAllowedTime(v) ? 'Horários permitidos apenas entre 09:00 e 19:00.' : '')
              }}
              required
            >
              {allowedTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {time && !isAllowedTime(time) && (
              <p className="mt-1 text-xs text-red-600">{timeError || 'Horários permitidos apenas entre 09:00 e 19:00.'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Serviço</label>
            <select
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name} - R$ {s.price}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Barbeiro</label>
            <select
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={barberId}
              onChange={(e) => setBarberId(e.target.value)}
              required
            >
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Observações</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Algo que devemos saber?"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-md bg-gray-900 text-white py-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar agendamento
            </button>
          </div>
        </form>
        {success && <p className="text-sm text-green-600 mt-4">{success}</p>}
      </div>
    </section>
  )
} 