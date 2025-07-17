import { Routes, Route, Outlet } from 'react-router-dom'
import { NavBar } from './components/nav/NavBar'
import { SessionList } from './components/sessions/Session'
import { NewSession } from './components/sessions/NewSession'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Dashboard } from './components/dashboard/Dashboard'
import { useState } from 'react'
import './App.css'

export const App = () => {
  const [sessions, setSessions] = useState([])
  const isLoggedIn = !!localStorage.getItem("honey_user");

  return (
    <Routes>
       <Route
        path="/"
        element={
          <>
            {isLoggedIn && <NavBar />}
            <Outlet />
          </>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sessions" element={<SessionList sessions={sessions} />} />
        <Route path="/sessions/new" element={<NewSession />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  )
}