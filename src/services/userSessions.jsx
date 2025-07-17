export const getUserSessions = () => {
    return fetch('http://localhost:8088/trainingSessions').then(res => res.json())
}

export const getWeaponTypes = () => {
    return fetch('http://localhost:8088/weaponTypes').then(res => res.json())
}

export const getTrainingTypes = () => {
    return fetch('http://localhost:8088/trainingTypes').then(res => res.json())
}

export const getTrainingFocuses = () => {
    return fetch('http://localhost:8088/trainingFocuses').then(res => res.json())
}

export const createTrainingSession = (session) => {
    return fetch('http://localhost:8088/trainingSessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
    }).then(res => res.json());
}

export const deleteTrainingSession = (id) => {
  return fetch(`http://localhost:8088/trainingSessions/${id}`, {
    method: 'DELETE'
  });
};

export const updateTrainingSession = (id, updatedSession) => {
  return fetch(`http://localhost:8088/trainingSessions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSession),
  }).then(res => res.json());
};