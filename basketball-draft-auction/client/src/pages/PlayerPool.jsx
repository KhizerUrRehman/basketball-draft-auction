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
  const [selectedPositions, setSelectedPositions] = useState({
    Guard: false,
    Forward: false,
    Center: false
  });
  const [sortBy, setSortBy] = useState('price');

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

  // Update the filtering and sorting logic
  const filteredAndSortedPlayers = players
    .filter(player => {
      // If no positions are selected, show all players
      const anyPositionSelected = Object.values(selectedPositions).some(value => value);
      if (!anyPositionSelected) return true;
      
      // Show only players in selected positions
      return selectedPositions[player.position];
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'ascending' 
          ? a.startingPrice - b.startingPrice 
          : b.startingPrice - a.startingPrice;
      } else {
        // Sort by availability
        return sortOrder === 'ascending'
          ? a.availability.localeCompare(b.availability)
          : b.availability.localeCompare(a.availability);
      }
    });

  return (
    <div className="player-pool-container">
      <h1>Player Pool</h1>

      <div className="filter-controls">
        <div className="position-filters">
          <h3>Filter by Position:</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={selectedPositions.Guard}
                onChange={() => setSelectedPositions(prev => ({
                  ...prev,
                  Guard: !prev.Guard
                }))}
              />
              Guard
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedPositions.Forward}
                onChange={() => setSelectedPositions(prev => ({
                  ...prev,
                  Forward: !prev.Forward
                }))}
              />
              Forward
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedPositions.Center}
                onChange={() => setSelectedPositions(prev => ({
                  ...prev,
                  Center: !prev.Center
                }))}
              />
              Center
            </label>
          </div>
        </div>

        <div className="sort-controls">
          <h3>Sort by:</h3>
          <select 
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
          >
            <option value="price-ascending">Price (Low to High)</option>
            <option value="price-descending">Price (High to Low)</option>
            <option value="availability-ascending">Availability (A to Z)</option>
            <option value="availability-descending">Availability (Z to A)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading players...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredAndSortedPlayers.length === 0 ? (
        <p>No players in the pool.</p>
      ) : (
        <div className="player-grid">
          {filteredAndSortedPlayers.map((player) => (
            <div key={player._id} className="player-card">
              <h2>{player.name}</h2>
              <div className="player-age">Position: {player.position}</div>
              <div className="player-age">Height: {player.contact}</div>
              <div className="player-age">Expected starting bid: ${player.startingPrice}</div>
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
