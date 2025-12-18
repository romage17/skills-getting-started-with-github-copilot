import React from "react";
import './ActivityCard.css';

function ActivityCard({ activity }) {
  // Handler to unregister a participant
  const handleDelete = async (name) => {
    try {
      await fetch(`/activities/${encodeURIComponent(activity.title)}/unregister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: name })
      });
      // Optionally, trigger a refresh or callback here
      window.location.reload();
    } catch (err) {
      alert('Failed to unregister participant.');
    }
  };

  return (
    <div className="activity-card">
      <h4>{activity.title}</h4>
      <p>{activity.description}</p>
      <div className="activity-card-participants">
        <h5>Participants</h5>
        {activity.participants && activity.participants.length > 0 ? (
          <ul className="participants-list">
            {activity.participants.map((name, idx) => (
              <li key={idx} className="participant-item">
                {name}
                <span
                  className="delete-icon"
                  title="Remove participant"
                  onClick={() => handleDelete(name)}
                  style={{ cursor: 'pointer', marginLeft: 8 }}
                >
                  ❌
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <span style={{ color: "#888" }}>No participants yet.</span>
        )}
      </div>
    </div>
  );
}

export default ActivityCard;