import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../shared/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const { ok, role } = await login(username.trim(), password)
    if (!ok) {
      setError('Credenciais inválidas')
      return
    }
    const from = (location.state && location.state.from) || (role === 'admin' ? '/admin' : '/agendar')
    navigate(from, { replace: true })
  }

  return (
    <section className="mx-auto max-w-md px-4 py-6 sm:py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900">Entrar</h2>
        <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuário</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Seu usuário"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 text-white py-2 hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  )
} 