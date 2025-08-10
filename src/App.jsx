import React, { useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/Login'
import SchedulePage from './pages/Schedule'
import AdminPage from './pages/Admin'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuth } from './shared/AuthContext'

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  function linkClass(isActive) {
    return `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'
    }`
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-800" onClick={closeMenu}>Barbearia Pro</Link>

        <div className="flex items-center gap-2 md:gap-3">
          <nav className="hidden md:flex items-center gap-3">
            <NavLink
              to="/"
              className={({ isActive }) => linkClass(isActive && location.pathname === '/')}
            >
              Início
            </NavLink>
            <NavLink
              to="/agendar"
              className={({ isActive }) => linkClass(isActive)}
            >
              Agendar
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => linkClass(isActive)}
            >
              Admin
            </NavLink>
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); closeMenu() }}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
              >
                Sair ({user?.username})
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `ml-2 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`
                }
              >
                Entrar
              </NavLink>
            )}
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <NavLink
              to="/"
              className={({ isActive }) => linkClass(isActive && location.pathname === '/')}
              onClick={closeMenu}
            >
              Início
            </NavLink>
            <NavLink
              to="/agendar"
              className={({ isActive }) => linkClass(isActive)}
              onClick={closeMenu}
            >
              Agendar
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => linkClass(isActive)}
              onClick={closeMenu}
            >
              Admin
            </NavLink>
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); closeMenu() }}
                className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800"
              >
                Sair ({user?.username})
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`
                }
                onClick={closeMenu}
              >
                Entrar
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agende seu corte com facilidade</h1>
          <p className="mt-3 text-gray-600">
            Escolha data, horário e serviço. Sem complicação.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/agendar" className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800">Agendar agora</Link>
            <Link to="/admin" className="px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200">Área do admin</Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <ul className="space-y-3 text-gray-700">
            <li>✂️ Cortes clássicos e modernos</li>
            <li>🧴 Barba completa e modelagem</li>
            <li>🕒 Horários flexíveis</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/agendar" element={<SchedulePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Barbearia Pro. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
} 