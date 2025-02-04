import React, { useEffect, useState } from "react";
import "../styles/PlayerPool.css";

const PlayerPool = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPosition, setFilterPosition] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [searchQuery, setSearchQuery] = useState(""); // New search query state

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
    applyFilters(position, sortOrder, searchQuery);
  };

  // Sort players by price
  const handleSortOrder = (order) => {
    setSortOrder(order);
    applyFilters(filterPosition, order, searchQuery);
  };

  // Filter players by search query
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    applyFilters(filterPosition, sortOrder, query);
  };

  // Apply all filters: position, sort, and search
  const applyFilters = (position, order, query) => {
    let filtered = players;

    if (position) {
      filtered = filtered.filter((player) => player.position === position);
    }

    if (query) {
      filtered = filtered.filter((player) =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (order === "ascending") {
      filtered = filtered.sort((a, b) => a.startingPrice - b.startingPrice);
    } else {
      filtered = filtered.sort((a, b) => b.startingPrice - a.startingPrice);
    }

    setFilteredPlayers(filtered);
  };

  return (
    <div className="player-pool-container">
      <h1>Player Pool</h1>

      <div className="filters">
        {/* Search Filter */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="search-input"
        />

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
              <div className="player-age">Position: {player.position}</div>
              <div className="player-age">Height: {player.contact}</div>
              <div className="player-age">Expected starting bid: ${player.startingPrice}</div>
              <div className="player-age">Age: {player.age}</div>
              <div className="player-prior-team">Prior Team: {player.priorTeam}</div>
              <div className="player-availability">Status: {player.availability}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerPool;
