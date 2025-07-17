import { useState, useEffect } from "react"
import { getUserSessions } from '../../services/userSessions'
import { useNavigate } from "react-router-dom";

export const SessionList = () => {
    const [sessions, setSessions] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getUserSessions().then(data => setSessions(data))
    }, [])

    const user = JSON.parse(localStorage.getItem("honey_user"))
    const userId = user?.id
    const userSessions = sessions.filter(session => session.userId === userId)

    return (
        <div>
            <h1>Session List</h1>
            <button onClick={() => navigate("/sessions/new")}>+ New Training Session</button>
            <ul>
                {userSessions.map(session => (
                    <div key={session.id}>
                        <h2>{session.title}</h2>
                        <p>Date: {session.date}</p>
                        <p>Duration: {session.duration} minutes</p>
                        <p>Intensity: {session.intensity}</p>
                        <p>Notes: {session.notes}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}