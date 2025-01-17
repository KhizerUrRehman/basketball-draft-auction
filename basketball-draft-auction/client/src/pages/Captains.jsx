import React, { useState, useEffect } from "react";
import "../styles/Captain.css";

const Captains = () => {
  const [captains, setCaptains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaptains = async () => {
    try {
      const response = await fetch("https://rbl-auction.onrender.com/api/captains");
      const data = await response.json();
      setCaptains(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching captains:", err);
      setError("Failed to load captains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptains();
  }, []);

  return (
    <div className="captains-container">
      <h1>Captains Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : captains.length === 0 ? (
        <p>No captains found.</p>
      ) : (
        <div className="captains-list">
          {captains.map((captain) => {
            const teamCost = captain.players.reduce(
              (total, player) => total + (player.price || 0),
              0
            );
            const remainingBudget = captain.initialBudget - teamCost;

            return (
              <div key={captain._id} className="captain-card">
                <h2>
                  {captain.name} ({captain.team})
                </h2>
                <h3>Team:</h3>
                <ul>
                  {captain.players && captain.players.length > 0 ? (
                    captain.players.map((player, index) => (
                      <li key={index}>
                        {player.name} - {player.position} - ${player.price}
                      </li>
                    ))
                  ) : (
                    <li>No players in team yet.</li>
                  )}
                </ul>
                <p>Remaining Budget: ${remainingBudget}</p>
                <p>Total Team Cost: ${teamCost}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Captains;
