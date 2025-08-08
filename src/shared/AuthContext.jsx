import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'auth_state'

const defaultAuthState = {
  isAuthenticated: false,
  user: null, // { username, role }
}

const AuthContext = createContext({
  ...defaultAuthState,
  login: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : defaultAuthState
    } catch (e) {
      return defaultAuthState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState))
  }, [authState])

  async function login(username, password) {
    // Autenticação básica: admin/admin123 => admin; qualquer outro usuário => cliente
    if (username === 'admin' && password === 'admin123') {
      setAuthState({ isAuthenticated: true, user: { username, role: 'admin' } })
      return { ok: true, role: 'admin' }
    }

    if (username && password) {
      setAuthState({ isAuthenticated: true, user: { username, role: 'cliente' } })
      return { ok: true, role: 'cliente' }
    }

    return { ok: false }
  }

  function logout() {
    setAuthState(defaultAuthState)
  }

  const value = useMemo(() => ({ ...authState, login, logout }), [authState])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
} 