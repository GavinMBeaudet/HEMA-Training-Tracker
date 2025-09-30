import { useState, useEffect } from "react";
import {
  getUserSessions,
  getTrainingFocuses,
  getWeaponTypes,
} from "../../services/userSessions";
import { useNavigate } from "react-router-dom";
import { deleteTrainingSession } from "../../services/userSessions";
import "./Session.css";
import { FilterSession } from "./FilterSession";

export const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [focuses, setFocuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWeaponType, setSelectedWeaponType] = useState("");
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserSessions().then((trainingSessionObj) =>
      setSessions(trainingSessionObj)
    );

    getTrainingFocuses().then(setFocuses);

    getWeaponTypes().then(setWeaponTypes);
  }, []);

  useEffect(() => {
    let filtered = sessions;

    if (searchTerm) {
      filtered = filtered.filter((session) =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedWeaponType) {
      filtered = filtered.filter(
        (session) => String(session.weaponTypeId) === String(selectedWeaponType)
      );
    }

    setFilteredSessions(filtered);
  }, [searchTerm, selectedWeaponType, sessions]);

  const user = JSON.parse(localStorage.getItem("HEMA_user"));
  const userId = user.id;
  const userSessions = filteredSessions.filter((session) => session.userId === userId);

  const handleDelete = async (id) => {
    await deleteTrainingSession(id);
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const getFocusAreaNames = (focusAreaIds) => {
    return focusAreaIds
      .map((id) => {
        const f = focuses.find((f) => f.id === id);
        return f ? f.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="container-session">
      <h1>Session List</h1>
      <FilterSession
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        weaponTypes={weaponTypes}
        selectedWeaponType={selectedWeaponType}
        setSelectedWeaponType={setSelectedWeaponType}
      />
      <button
        className="new-session-btn"
        onClick={() => navigate("/sessions/new")}
      >
        + New Training Session
      </button>
      <ul className="session-list">
        {userSessions.map((session) => (
          <div key={session.id} className="session-card">
            <div className="session-card-header">
              <h2>{session.title}</h2>
              <div className="session-card-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/sessions/edit/${session.id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(session.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="session-meta-row">
              <span>Date: {session.date}</span>
              <span>Duration: {session.duration} minutes</span>
              <span>Intensity: {session.intensity}</span>
              <span>
                Weapon:{" "}
                {weaponTypes.find((w) => w.id === session.weaponTypeId)?.name}
              </span>
            </div>
            <div className="session-tags">
              {session.focusAreas?.map((id) => {
                const focus = focuses.find((f) => f.id === id);
                return focus ? (
                  <span key={id} className="session-tag">
                    {focus.name}
                  </span>
                ) : null;
              })}
            </div>
            <div>
              <span className="notes-label">Notes</span>
              <p>{session.notes}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
