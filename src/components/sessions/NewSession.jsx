import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserSessions, getWeaponTypes, getTrainingTypes, getTrainingFocuses, createTrainingSession } from '../../services/userSessions';

export const NewSession = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [weaponType, setWeaponType] = useState('');
  const [trainingType, setTrainingType] = useState('');
  const [intensity, setIntensity] = useState('');
  const [notes, setNotes] = useState('');
  const [focusAreas, setFocusAreas] = useState([]); 
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [trainingTypes, setTrainingTypes] = useState([]);
  const [trainingFocuses, setTrainingFocuses] = useState([]);

  useEffect(() => {
    getWeaponTypes().then(setWeaponTypes);
    getTrainingTypes().then(setTrainingTypes);
    getTrainingFocuses().then(setTrainingFocuses);
  }, []);

  const handleFocusAreaChange = (id) => {
    setFocusAreas(prev =>
      prev.includes(id) ? prev.filter(focusId => focusId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (event) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('honey_user'));
    const session = {
      userId: user.id,
      date,
      duration: duration,
      weaponTypeId: weaponType,
      trainingTypeId: trainingType,
      intensity: intensity,
      notes,
      focusAreas
    };
    createTrainingSession(session);
    navigate("/sessions");
  };

  return (
    <div>
      <h1>New Training Sessions</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label>Duration(minutes)</label>
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
        </div>
        <div>
          <label>Weapon Type</label>
          <select value={weaponType} onChange={e => setWeaponType(e.target.value)}>
            <option value="">Select a weapon type</option>
            {weaponTypes.map(wt => (
              <option key={wt.id} value={wt.id}>{wt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Training Type</label>
          <select value={trainingType} onChange={e => setTrainingType(e.target.value)}>
            <option value="">Select a training type</option>
            {trainingTypes.map(tt => (
              <option key={tt.id} value={tt.id}>{tt.name}</option>
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
            onChange={e => setIntensity(e.target.value)}
          />
        </div>
        <div>
          <label>Focus Areas</label>
          <div>
            {trainingFocuses.map(focus => (
              <label key={focus.id} style={{ marginRight: '1em' }}>
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
          <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
        <div>
          <button type="submit">SAVE TRAINING SESSION</button>
          <button type="button" onClick={() => navigate("/sessions")}>CANCEL</button>
        </div>
      </form>
    </div>
  );
} 