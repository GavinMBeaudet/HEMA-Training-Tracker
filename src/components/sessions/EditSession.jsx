import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWeaponTypes,
  getTrainingTypes,
  getTrainingFocuses,
  updateTrainingSession,
  getUserSessions,
} from "../../services/userSessions";

export const EditSession = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    getWeaponTypes().then(setWeaponTypes);
    getTrainingTypes().then(setTrainingTypes);
    getTrainingFocuses().then(setTrainingFocuses);
    // Fetch the session to edit
    getUserSessions().then((sessions) => {
      const session = sessions.find(s => s.id === Number(id));
      if (session) {
        setDate(session.date || "");
        setDuration(session.duration || "");
        setWeaponType(session.weaponTypeId || "");
        setTrainingType(session.trainingTypeId || "");
        setIntensity(session.intensity || "");
        setNotes(session.notes || "");
        setFocusAreas(session.focusAreas || []);
      }
    });
  }, [id]);

  const handleFocusAreaChange = (focusId) => {
    setFocusAreas((prev) =>
      prev.includes(focusId)
        ? prev.filter((id) => id !== focusId)
        : [...prev, focusId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("honey_user"));
    const updatedSession = {
      userId: user.id,
      date,
      duration,
      weaponTypeId: weaponType,
      trainingTypeId: trainingType,
      intensity,
      notes,
      focusAreas,
    };
    await updateTrainingSession(id, updatedSession);
    navigate("/sessions");
  };

  return (
    <div>
      <h1>Edit Training Session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Duration(minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Weapon Type</label>
          <select
            value={weaponType}
            onChange={(e) => setWeaponType(e.target.value)}
          >
            <option value="">Select a weapon type</option>
            {weaponTypes.map((wt) => (
              <option key={wt.id} value={wt.id}>
                {wt.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Training Type</label>
          <select
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
          >
            <option value="">Select a training type</option>
            {trainingTypes.map((tt) => (
              <option key={tt.id} value={tt.id}>
                {tt.name}
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
            onChange={(e) => setIntensity(e.target.value)}
          />
        </div>
        <div>
          <label>Focus Areas</label>
          <div>
            {trainingFocuses.map((focus) => (
              <label key={focus.id} style={{ marginRight: "1em" }}>
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
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">SAVE CHANGES</button>
          <button type="button" onClick={() => navigate("/sessions")}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
