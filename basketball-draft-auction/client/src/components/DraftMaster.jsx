import React, { useState, useEffect } from "react";
import "../styles/DraftMaster.css";

const DraftMaster = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [captains, setCaptains] = useState([]);
  const [playerAssignments, setPlayerAssignments] = useState({});
  const [editingPrices, setEditingPrices] = useState({});
  const [editingBudgets, setEditingBudgets] = useState({});
  const [editingInitialBudgets, setEditingInitialBudgets] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const fetchData = async () => {
    try {
      const playerResponse = await fetch(
        "https://rbl-auction.onrender.com/api/players?auctioned=false"
      );
      const playerData = await playerResponse.json();
      setPlayers(playerData);
      setFilteredPlayers(playerData);

      const captainResponse = await fetch("https://rbl-auction.onrender.com/api/captains");
      const captainData = await captainResponse.json();
      setCaptains(captainData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignPlayer = async (playerId, captainId) => {
    if (!captainId) {
      alert("Please select a captain before assigning a player.");
      return;
    }
    try {
      await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          captainId,
          price: 0  // <--- add price: 0 here
        }),
      });
      fetchData(); // Refresh data after assignment
    } catch (error) {
      console.error("Error assigning player:", error);
    }
  };
  

  const removePlayer = async (playerId) => {
    try {
      await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}`, {
        method: "DELETE",
      });
      fetchData(); // Refresh data after removal
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const handleSelectCaptain = (playerId, captainId) => {
    setPlayerAssignments((prevAssignments) => ({
      ...prevAssignments,
      [playerId]: captainId,
    }));
  };

  const handlePriceChange = (playerId, newPrice) => {
    setEditingPrices((prevPrices) => ({
      ...prevPrices,
      [playerId]: newPrice,
    }));
  };

  const updatePrice = async (playerId) => {
    const newPrice = editingPrices[playerId];
    if (!newPrice) {
      alert("Please enter a valid price.");
      return;
    }
    try {
      await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startingPrice: newPrice }),
      });
      fetchData(); // Refresh data after updating price
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...filteredPlayers].sort((a, b) => {
      return order === "ascending"
        ? a.startingPrice - b.startingPrice
        : b.startingPrice - a.startingPrice;
    });
    setFilteredPlayers(sorted);
  };

  const updateCaptainBudget = async (captainId) => {
    const budget = editingBudgets[captainId];
    const initialBudget = editingInitialBudgets[captainId];
    if (budget === undefined && initialBudget === undefined) {
      alert("Please enter a valid budget or initial budget.");
      return;
    }
    try {
      await fetch(`https://rbl-auction.onrender.com/api/captains/${captainId}/budget`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget, initialBudget }),
      });
      fetchData(); // Refresh data after updating budget
    } catch (error) {
      console.error("Error updating captain budget:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="draftmaster-container">
      <h1>Draft Master</h1>

      <div className="captain-management">
  <h2>Manage Captains</h2>
  <ul>
    {captains.map((captain) => (
      <li key={captain._id} className="captain-item">
        <div className="captain-info">
          {captain.name} ({captain.team}) - Remaining Budget: ${captain.budget}
        </div>
        <div>
          <input
            type="number"
            min="0"
            value={editingBudgets[captain._id] || ""}
            onChange={(e) =>
              setEditingBudgets((prev) => ({
                ...prev,
                [captain._id]: e.target.value,
              }))
            }
            placeholder="Edit Budget"
          />
          <input
            type="number"
            min="0"
            value={editingInitialBudgets[captain._id] || ""}
            onChange={(e) =>
              setEditingInitialBudgets((prev) => ({
                ...prev,
                [captain._id]: e.target.value,
              }))
            }
            placeholder="Edit Initial Budget"
          />
          <button
            onClick={() => updateCaptainBudget(captain._id)}
            className="update-budget-button"
          >
            Update Budgets
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>


      <div className="player-pool">
        <h2>Player Pool</h2>
        <ul>
  {filteredPlayers.map((player) => (
    <li key={player._id} className="player-item">
      <div className="player-info">
        {player.name} ({player.position}) - ${player.startingPrice}
      </div>
      <div className="price-edit">
        <input
          type="number"
          min="0"
          value={editingPrices[player._id] || ""}
          onChange={(e) =>
            handlePriceChange(player._id, e.target.value)
          }
          placeholder="Edit Price"
        />
        <button
          className="update-price-button"
          onClick={() => updatePrice(player._id)}
        >
          Update Price
        </button>
      </div>
      <div className="assign-controls">
        <select
          value={playerAssignments[player._id] || ""}
          onChange={(e) =>
            handleSelectCaptain(player._id, e.target.value)
          }
        >
          <option value="">Assign to Captain</option>
          {captains.map((captain) => (
            <option key={captain._id} value={captain._id}>
              {captain.name}
            </option>
          ))}
        </select>
        <button
          className="assign-button"
          onClick={() =>
            assignPlayer(player._id, playerAssignments[player._id])
          }
        >
          Assign
        </button>
      </div>
      <button
        className="remove-button"
        onClick={() => removePlayer(player._id)}
      >
        Remove
      </button>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
};

export default DraftMaster;
