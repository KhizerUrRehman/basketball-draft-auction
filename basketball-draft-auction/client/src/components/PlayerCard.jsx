import React from "react";
import "../styles/PlayerCard.css";


const PlayerCard = ({ player, onSelect }) => {
  return (
    <div className="player-card" onClick={() => onSelect(player)}>
      <h2>{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Height: {player.contact}</p>
    </div>
  );
};

export default PlayerCard;
