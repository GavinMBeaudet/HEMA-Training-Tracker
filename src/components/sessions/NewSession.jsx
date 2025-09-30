import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWeaponTypes,
  getTrainingTypes,
  getTrainingFocuses,
  createTrainingSession,
} from "../../services/userSessions";
import "./SessionForm.css";

export const NewSession = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [weaponType, setWeaponType] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [notes, setNotes] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [trainingTypes, setTrainingTypes] = useState([]);
  const [trainingFocuses, setTrainingFocuses] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getWeaponTypes().then(setWeaponTypes);
    getTrainingTypes().then(setTrainingTypes);
    getTrainingFocuses().then(setTrainingFocuses);
  }, []);

  const handleFocusAreaChange = (id) => {
    setFocusAreas((prev) =>
      prev.includes(id)
        ? prev.filter((focusId) => focusId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("HEMA_user"));
    const session = {
      userId: user.id,
      title,
      date,
      duration,
      weaponTypeId: weaponType,
      trainingTypeId: trainingType,
      intensity: Number(intensity),
      notes,
      focusAreas,
    };
    await createTrainingSession(session);
    navigate("/sessions");
  };

  return (
    <div>
      <h1>New Training Sessions</h1>
      <form className="session-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Session Title"
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label>Duration(minutes)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div>
          <label>Weapon Type</label>
          <select
            value={weaponType}
            onChange={(event) => setWeaponType(event.target.value)}
          >
            <option value="">Select a weapon type</option>
            {weaponTypes.map((weapontype) => (
              <option key={weapontype.id} value={weapontype.id}>
                {weapontype.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Training Type</label>
          <select
            value={trainingType}
            onChange={(event) => setTrainingType(event.target.value)}
          >
            <option value="">Select a training type</option>
            {trainingTypes.map((trainingType) => (
              <option key={trainingType.id} value={trainingType.id}>
                {trainingType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Intensity</label>
          <input
            type="number"
            min="1"
            max="10"
            value={intensity}
            onChange={(event) => setIntensity(event.target.value)}
          />
        </div>
        <div>
          <label>Focus Areas</label>
          <div className="focus-areas-grid">
            {trainingFocuses.map((focus) => (
              <label key={focus.id} className="focus-area-checkbox">
                <input
                  type="checkbox"
                  value={focus.id}
                  checked={focusAreas.includes(focus.id)}
                  onChange={() => handleFocusAreaChange(focus.id)}
                />
                {focus.name}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">SAVE TRAINING SESSION</button>
          <button type="button" onClick={() => navigate("/sessions")}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
