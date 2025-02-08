import React, { useState, useEffect } from "react";
import "../styles/Captain.css";
import logo1 from "../assets/logos/Dragons.png";  // Update with your actual filenames
import logo2 from "../assets/logos/Wolves.png";
import logo3 from "../assets/logos/Spartans.png";
import logo4 from "../assets/logos/Sorcerors.png";
import logo5 from "../assets/logos/Knights.png";
import logo6 from "../assets/logos/Panthers.png";
import logo7 from "../assets/logos/Jets.png";
import logo8 from "../assets/logos/Phoenix.png";
import logo9 from "../assets/logos/Falcons.png";
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
      <div className="team-logos">
        <img src={logo1} alt="Team 1 Logo" />
        <img src={logo2} alt="Team 2 Logo" />
        <img src={logo3} alt="Team 3 Logo" />
        <img src={logo4} alt="Team 4 Logo" />
        <img src={logo5} alt="Team 5 Logo" />
        <img src={logo6} alt="Team 6 Logo" />
        <img src={logo7} alt="Team 7 Logo" />
        <img src={logo8} alt="Team 8 Logo" />
        <img src={logo9} alt="Team 9 Logo" />
      </div>
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
