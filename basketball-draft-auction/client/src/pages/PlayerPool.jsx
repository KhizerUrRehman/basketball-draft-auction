import React, { useEffect, useState } from "react";
import "../styles/PlayerPool.css";

const PlayerPool = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPosition, setFilterPosition] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://rbl-auction.onrender.com/api/players?auctioned=false"
        );
        if (!response.ok) throw new Error("Failed to fetch players.");
        const data = await response.json();
        setPlayers(data);
        setFilteredPlayers(data); // Initialize filtered players
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players by position
  const handleFilterPosition = (position) => {
    setFilterPosition(position);
    const filtered = position
      ? players.filter((player) => player.position === position)
      : players;
    setFilteredPlayers(filtered);
  };

  // Sort players by price
  const handleSortOrder = (order) => {
    setSortOrder(order);
    const sorted = [...filteredPlayers].sort((a, b) => {
      return order === "ascending"
        ? a.startingPrice - b.startingPrice
        : b.startingPrice - a.startingPrice;
    });
    setFilteredPlayers(sorted);
  };

  return (
    <div className="player-pool-container">
      <h1>Player Pool</h1>

      <div className="filters">
        {/* Position Filter */}
        <select
          value={filterPosition}
          onChange={(e) => handleFilterPosition(e.target.value)}
          className="filter-select"
        >
          <option value="">All Positions</option>
          <option value="Guard">Guard</option>
          <option value="Forward">Forward</option>
          <option value="Center">Center</option>
        </select>

        {/* Price Sort */}
        <select
          value={sortOrder}
          onChange={(e) => handleSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="ascending">Sort by Price: Low to High</option>
          <option value="descending">Sort by Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p>Loading players...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredPlayers.length === 0 ? (
        <p>No players in the pool.</p>
      ) : (
        <div className="player-grid">
          {filteredPlayers.map((player) => (
            <div key={player._id} className="player-card">
              <h2>{player.name}</h2>
              <p>Position: {player.position}</p>
              <p>Contact: {player.contact}</p>
              <p>Starting Price: ${player.startingPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerPool;
