import { Link } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/sessions">Sessions</Link>
            </li>
            <li className="navbar-item navbar-logout">
            <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("HEMA_user")
        navigate("/")
      }}
    >Logout</Link>
            </li>
        </ul>
    )
}