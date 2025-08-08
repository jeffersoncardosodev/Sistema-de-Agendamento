import React, { useEffect, useMemo, useState } from 'react'
import { listAppointments, removeAppointment, clearAppointments } from '../shared/appointments'

export default function AdminPage() {
  const [appointments, setAppointments] = useState([])
  const [queryDate, setQueryDate] = useState('')

  useEffect(() => {
    setAppointments(listAppointments())
  }, [])

  function handleRemove(id) {
    removeAppointment(id)
    setAppointments(listAppointments())
  }

  function handleClearAll() {
    if (confirm('Tem certeza que deseja limpar todos os agendamentos?')) {
      clearAppointments()
      setAppointments([])
    }
  }

  const filtered = useMemo(() => {
    if (!queryDate) return appointments
    return appointments.filter((a) => a.date === queryDate)
  }, [appointments, queryDate])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Agendamentos</h2>
          <p className="text-sm text-gray-500">Gerencie os horários marcados pelos clientes.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="date"
            value={queryDate}
            onChange={(e) => setQueryDate(e.target.value)}
            className="rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
          />
          <div className="flex gap-3">
            <button onClick={() => setQueryDate('')} className="px-3 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200">Limpar filtro</button>
            <button onClick={handleClearAll} className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Limpar tudo</button>
          </div>
        </div>
      </div>

      {/* Cards no mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 bg-white border border-gray-200 rounded-xl p-6">
            Nenhum agendamento encontrado.
          </div>
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-gray-900">{a.name}</div>
                  <div className="text-gray-600 text-sm">{a.phone}</div>
                </div>
                <button
                  onClick={() => handleRemove(a.id)}
                  className="px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                >
                  Remover
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div><span className="text-gray-500">Data:</span> {a.date}</div>
                <div><span className="text-gray-500">Hora:</span> {a.time}</div>
                <div><span className="text-gray-500">Serviço:</span> {a.service}</div>
                <div className="col-span-2"><span className="text-gray-500">Barbeiro:</span> {a.barber?.name || '-'}</div>
                {a.notes && (
                  <div className="col-span-2"><span className="text-gray-500">Obs:</span> {a.notes}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tabela do md pra cima */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Serviço</th>
                <th className="px-4 py-3">Barbeiro</th>
                <th className="px-4 py-3">Observações</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>Nenhum agendamento encontrado.</td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                    <td className="px-4 py-3">{a.phone}</td>
                    <td className="px-4 py-3">{a.date}</td>
                    <td className="px-4 py-3">{a.time}</td>
                    <td className="px-4 py-3">{a.service}</td>
                    <td className="px-4 py-3">{a.barber?.name || '-'}</td>
                    <td className="px-4 py-3 max-w-[280px] truncate" title={a.notes}>{a.notes}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemove(a.id)}
                        className="px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
} 