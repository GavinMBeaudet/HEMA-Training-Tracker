import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "HEMA_user",
          JSON.stringify({
            id: createdUser.id
          })
        )
        setIsLoggedIn(true)
        navigate("/")
      }
    })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    if (user.password !== confirmPassword) {
      window.alert("Passwords do not match")
      return
    }
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists")
      } else {
        registerNewUser()
      }
    })
  }

  const updateUser = (event) => {
    const copy = { ...user }
    copy[event.target.id] = event.target.value
    setUser(copy)
  }

  return (<>
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>HEMA Training Tracker</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
    <section style={{ textAlign: "center" }}>
      <Link to="/login">Already have an account? Login</Link>
    </section>
    </>
  )
}
