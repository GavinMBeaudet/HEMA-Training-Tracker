// Check if we're in production (deployed) vs development (localhost)
const isProduction = window.location.hostname !== 'localhost';

// Static data for demo purposes
const staticSessions = [
  {
    id: 1,
    userId: 1,
    title: "Demo Sword Training",
    date: "2024-01-15",
    duration: 90,
    weaponTypeId: 1,
    trainingTypeId: 1,
    intensity: 7,
    notes: "Demo session - worked on basic sword forms",
    focusAreas: [1, 2, 3]
  },
  {
    id: 2,
    userId: 2,
    title: "Demo Sparring Session",
    date: "2024-01-17", 
    duration: 60,
    weaponTypeId: 2,
    trainingTypeId: 2,
    intensity: 8,
    notes: "Demo sparring session",
    focusAreas: [4, 5]
  }
];

const staticWeaponTypes = [
  { id: 1, name: "Sword" },
  { id: 2, name: "Mace and Shield" },
  { id: 3, name: "Halberd" },
  { id: 4, name: "Dagger" },
  { id: 5, name: "Spear" },
  { id: 6, name: "Unarmed" }
];

const staticTrainingTypes = [
  { id: 1, name: "Technique Practice" },
  { id: 2, name: "Sparring" },
  { id: 3, name: "Form Training" },
  { id: 4, name: "Conditioning" },
  { id: 5, name: "Meditation" },
  { id: 6, name: "Weapon Maintenance" }
];

const staticTrainingFocuses = [
  { id: 1, name: "Footwork" },
  { id: 2, name: "Precision" },
  { id: 3, name: "Speed" },
  { id: 4, name: "Power" },
  { id: 5, name: "Defense" },
  { id: 6, name: "Flexibility" },
  { id: 7, name: "Endurance" },
  { id: 8, name: "Balance" }
];

export const getUserSessions = () => {
  if (isProduction) {
    return Promise.resolve(staticSessions);
  }
  return fetch('http://localhost:8088/trainingSessions').then(res => res.json())
}

export const getWeaponTypes = () => {
  if (isProduction) {
    return Promise.resolve(staticWeaponTypes);
  }
  return fetch('http://localhost:8088/weaponTypes').then(res => res.json())
}

export const getTrainingTypes = () => {
  if (isProduction) {
    return Promise.resolve(staticTrainingTypes);
  }
  return fetch('http://localhost:8088/trainingTypes').then(res => res.json())
}

export const getTrainingFocuses = () => {
  if (isProduction) {
    return Promise.resolve(staticTrainingFocuses);
  }
  return fetch('http://localhost:8088/trainingFocuses').then(res => res.json())
}

export const createTrainingSession = (session) => {
  if (isProduction) {
    const newSession = { ...session, id: Date.now() };
    staticSessions.push(newSession);
    return Promise.resolve(newSession);
  }
  return fetch('http://localhost:8088/trainingSessions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
  }).then(res => res.json());
}

export const deleteTrainingSession = (id) => {
  if (isProduction) {
    const index = staticSessions.findIndex(s => s.id === id);
    if (index > -1) staticSessions.splice(index, 1);
    return Promise.resolve();
  }
  return fetch(`http://localhost:8088/trainingSessions/${id}`, {
    method: 'DELETE'
  });
};

export const updateTrainingSession = (id, updatedSession) => {
  if (isProduction) {
    const index = staticSessions.findIndex(s => s.id === id);
    if (index > -1) staticSessions[index] = { ...updatedSession, id };
    return Promise.resolve(staticSessions[index]);
  }
  return fetch(`http://localhost:8088/trainingSessions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSession),
  }).then(res => res.json());
};