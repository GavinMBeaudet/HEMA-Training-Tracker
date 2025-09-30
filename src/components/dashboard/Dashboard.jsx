import { useEffect, useState } from "react";
import { getUserSessions } from "../../services/userSessions";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    hoursTrained: 0,
    avgIntensity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("HEMA_user"));
    const userId = user?.id;
    getUserSessions().then((sessions) => {
      const userSessions = sessions.filter(
        (session) => session.userId === userId
      );
      const totalSessions = userSessions.length;

      let hoursTrained = 0;
      for (const sessions of userSessions) {
        if (sessions.duration) {
          hoursTrained += sessions.duration / 60;
        }
      }
      hoursTrained = Math.round(hoursTrained * 10) / 10;

      let totalIntensity = 0;
      for (const sessions of userSessions) {
        totalIntensity += Number(sessions.intensity);
      }
      let avgIntensity =
        userSessions.length > 0
          ? (totalIntensity / userSessions.length).toFixed(1)
          : 0;

      setStats({
        totalSessions,
        hoursTrained,
        avgIntensity,
      });
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome back, fighter!</h1>
        <div className="dashboard-stats">
          <div className="dashboard-card">
            <h2>{stats.totalSessions}</h2>
            <p>Total Sessions</p>
          </div>
          <div className="dashboard-card">
            <h2>{stats.hoursTrained}</h2>
            <p>Hours Trained</p>
          </div>
          <div className="dashboard-card">
            <h2>{stats.avgIntensity}</h2>
            <p>Avg Intensity</p>
          </div>
        </div>
        <button
          className="new-session-btn"
          onClick={() => navigate("/sessions/new")}
        >
          + New Training Session
        </button>
      </div>
    </div>
  );
};
