import React from "react";
import "../styles/Captain.css";

const CaptainDashboard = ({ team, budget }) => {
  return (
    <div className="captain-container">
      <h1 className="captain-header">Your Team</h1>
      <p className="budget-info">Remaining Budget: ${budget}</p>
      <div className="team-list">
        {team.length > 0 ? (
          team.map((player, index) => (
            <div key={index} className="player-card">
              <h2 className="player-name">{player.name}</h2>
              <p className="player-position">Position: {player.position}</p>
              <p className="player-price">Bought for: ${player.price}</p>
            </div>
          ))
        ) : (
          <p className="no-players">No players in this team yet.</p>
        )}
      </div>
    </div>
  );
};

export default CaptainDashboard;
