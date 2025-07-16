import { useState, useEffect } from "react"

import { getUserSessions } from "../../services/userSessions"
export const SessionList = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        getUserSessions().then(data => setSessions(data))
    }, [])

    const user = JSON.parse(localStorage.getItem("honey_user"))
    const userId = user?.id
    const userSessions = sessions.filter(session => session.userId === userId)

    return (
        <div>
            <h1>Session List</h1>
            <button>+ New Training Session</button>
            <ul>
                {userSessions.map(session => (
                    <div key={session.id}>
                        <h2>{session.title}</h2>
                        <p>Date: {session.date}</p>
                        <p>Duration: {session.duration} minutes</p>
                        <p>Intensity: {session.intensity}</p>
                        <p>Notes: {session.notes}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}