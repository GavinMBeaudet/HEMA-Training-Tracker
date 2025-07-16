export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
      res.json()
    )
  }

export const createUser = (user) => {
    // user should be an object with email and password
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
}

export const loginUser = (email, password) => {
    return fetch(`http://localhost:8088/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .then((res) => res.json())
}