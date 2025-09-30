import { Routes, Route, Outlet } from 'react-router-dom'
import { NavBar } from './components/nav/NavBar'
import { SessionList } from './components/sessions/Session'
import { NewSession } from './components/sessions/NewSession'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Dashboard } from './components/dashboard/Dashboard'
import { useState } from 'react'
import { EditSession } from './components/sessions/EditSession';
import './App.css'

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("HEMA_user"));

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
        <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sessions" element={<SessionList />} />
        <Route path="sessions/new" element={<NewSession />} />
        <Route path="sessions/edit/:id" element={<EditSession />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      </Route>
    </Routes>
  )
}