import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../shared/AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
} 