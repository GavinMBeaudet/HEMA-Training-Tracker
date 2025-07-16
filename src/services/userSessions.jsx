export const getUserSessions = () => {
    return fetch('http://localhost:8088/trainingSessions').then(res => res.json())
}