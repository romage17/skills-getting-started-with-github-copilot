import React from "react";

export default function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <h4>{activity.title}</h4>
      <p>{activity.description}</p>
      <div className="activity-card-participants">
        <h5>Participants</h5>
        {activity.participants && activity.participants.length > 0 ? (
          <ul>
            {activity.participants.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        ) : (
          <span style={{ color: "#888" }}>No participants yet.</span>
        )}
      </div>
    </div>
  );
}