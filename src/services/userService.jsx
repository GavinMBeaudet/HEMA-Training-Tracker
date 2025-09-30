// Check if we're in production (deployed) vs development (localhost)
const isProduction = window.location.hostname !== 'localhost';

// Static data for demo purposes
const staticUsers = [
  {
    id: 1,
    email: "john.doe@email.com",
    password: "hashedpassword123"
  },
  {
    id: 2,
    email: "demo@demo.com", 
    password: "demo"
  }
];

export const getUserByEmail = (email) => {
  if (isProduction) {
    // Return static data for demo
    const users = staticUsers.filter(user => user.email === email);
    return Promise.resolve(users);
  }
  
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  if (isProduction) {
    // For demo, just simulate success
    const newUser = { ...user, id: Date.now() };
    return Promise.resolve(newUser);
  }
  
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const loginUser = (email, password) => {
  if (isProduction) {
    // Return matching user for demo
    const users = staticUsers.filter(user => user.email === email && user.password === password);
    return Promise.resolve(users);
  }
  
  return fetch(`http://localhost:8088/users?email=${email}&password=${password}`)
    .then((res) => res.json())
}