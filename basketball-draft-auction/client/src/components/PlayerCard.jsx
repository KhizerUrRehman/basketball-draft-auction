import React from "react";
import "../styles/PlayerCard.css";


const PlayerCard = ({ player, onSelect }) => {
  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <h2>{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Height: {player.contact}</p>
      <div className="player-detail">
        <span className="label">Age:</span>
        <span className="value">{player.age}</span>
      </div>
      <div className="player-detail">
        <span className="label">Prior Team:</span>
        <span className="value">{player.priorTeam}</span>
      </div>
      <div className="player-detail">
        <span className="label">Status:</span>
        <span className="value">{player.availability}</span>
      </div>
    </div>
  );
};

export default PlayerCard;
