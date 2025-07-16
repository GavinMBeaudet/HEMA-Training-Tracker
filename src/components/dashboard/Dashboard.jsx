import { useEffect, useState } from 'react';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    hoursTrained: 0,
    avgIntensity: 0
  });

  useEffect(() => {
    // Placeholder: fetch and calculate stats for the logged-in user here
    // For now, set dummy data
    setStats({
      totalSessions: 12,
      hoursTrained: 18,
      avgIntensity: 7.2
    });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome back, fighter!</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
        <div>
          <h2>{stats.totalSessions}</h2>
          <p>Total Sessions</p>
        </div>
        <div>
          <h2>{stats.hoursTrained}</h2>
          <p>Hours Trained</p>
        </div>
        <div>
          <h2>{stats.avgIntensity}</h2>
          <p>Avg Intensity</p>
        </div>
      </div>
      <button>+ New Training Session</button>
    </div>
  );
}
