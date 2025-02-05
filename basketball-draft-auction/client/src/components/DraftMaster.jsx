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
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [editingCaptainNames, setEditingCaptainNames] = useState({});
  const [editingTeamNames, setEditingTeamNames] = useState({});
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: '',
    age: '',
    priorTeam: '',
    availability: 'Available',
    startingPrice: ''
  });
  const [editingAvailability, setEditingAvailability] = useState({});
  const [editingHeight, setEditingHeight] = useState({});

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const playerResponse = await fetch(
        "https://rbl-auction.onrender.com/api/players?auctioned=false"
      );
      const playerData = await playerResponse.json();
      console.log("Fetched players:", playerData);
      setPlayers(playerData);
      setFilteredPlayers(playerData);

      const captainResponse = await fetch("https://rbl-auction.onrender.com/api/captains");
      const captainData = await captainResponse.json();
      console.log("Fetched captains:", captainData);
      setCaptains(captainData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignPlayer = async (playerId, captainId) => {
    console.log("Assigning player", playerId, "to captain", captainId);
    if (!captainId) {
      alert("Please select a captain before assigning a player.");
      return;
    }
    try {
      const response = await fetch(
        `https://rbl-auction.onrender.com/api/players/${playerId}/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            captainId,
            price: 0  // <--- add price: 0 here
          }),
        }
      );
      console.log("Assign response status:", response.status);
      fetchData(); // Refresh data after assignment
    } catch (error) {
      console.error("Error assigning player:", error);
    }
  };

  const removePlayer = async (playerId) => {
    console.log("Removing player:", playerId);
    try {
      const response = await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}`, {
        method: "DELETE",
      });
      console.log("Remove response status:", response.status);
      fetchData(); // Refresh data after removal
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const handleSelectCaptain = (playerId, captainId) => {
    console.log("Selecting captain for player:", playerId, "Captain ID:", captainId);
    setPlayerAssignments((prevAssignments) => ({
      ...prevAssignments,
      [playerId]: captainId,
    }));
  };

  const handlePriceChange = (playerId, newPrice) => {
    console.log("Changing price for player:", playerId, "New Price:", newPrice);
    setEditingPrices((prevPrices) => ({
      ...prevPrices,
      [playerId]: newPrice,
    }));
  };

  const updatePrice = async (playerId) => {
    const newPrice = editingPrices[playerId];
    console.log("Updating price for player:", playerId, "Price:", newPrice);
    if (!newPrice || isNaN(newPrice)) {
      alert("Please enter a valid price.");
      return;
    }
    try {
      const response = await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startingPrice: parseInt(newPrice, 10) }),
      });
      console.log("Update price response status:", response.status);
      fetchData(); // Refresh data after updating price
      setEditingPrices((prev) => {
        const newPrices = { ...prev };
        delete newPrices[playerId];
        return newPrices;
      });
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Failed to update price. Please try again.");
    }
  };

  const handleSearch = (query) => {
    console.log("Handling search. Query:", query);
    setSearchQuery(query);
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered players:", filtered);
    setFilteredPlayers(filtered);
  };

  const handleSort = (order) => {
    console.log("Sorting players. Order:", order);
    setSortOrder(order);
    const sorted = [...filteredPlayers].sort((a, b) => {
      return order === "ascending"
        ? a.startingPrice - b.startingPrice
        : b.startingPrice - a.startingPrice;
    });
    console.log("Sorted players:", sorted);
    setFilteredPlayers(sorted);
  };

  const updateCaptainBudget = async (captainId) => {
    const budget = editingBudgets[captainId];
    const initialBudget = editingInitialBudgets[captainId];
    console.log("Updating captain budget. Captain ID:", captainId, "Budget:", budget, "Initial Budget:", initialBudget);
    if (budget === undefined && initialBudget === undefined) {
      alert("Please enter a valid budget or initial budget.");
      return;
    }
    try {
      const response = await fetch(`https://rbl-auction.onrender.com/api/captains/${captainId}/budget`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget, initialBudget }),
      });
      console.log("Update budget response status:", response.status);
      fetchData(); // Refresh data after updating budget
    } catch (error) {
      console.error("Error updating captain budget:", error);
    }
  };

  const updateCaptainDetails = async (captainId) => {
    const newName = editingCaptainNames[captainId];
    const newTeam = editingTeamNames[captainId];
    
    if (!newName && !newTeam) {
      alert("Please enter a new name or team name to update.");
      return;
    }

    try {
      const response = await fetch(`https://rbl-auction.onrender.com/api/captains/${captainId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName || undefined,
          team: newTeam || undefined
        }),
      });
      
      if (response.ok) {
        fetchData(); // Refresh data after update
        // Clear the editing states
        setEditingCaptainNames(prev => {
          const newState = { ...prev };
          delete newState[captainId];
          return newState;
        });
        setEditingTeamNames(prev => {
          const newState = { ...prev };
          delete newState[captainId];
          return newState;
        });
      } else {
        alert("Failed to update captain details");
      }
    } catch (error) {
      console.error("Error updating captain details:", error);
      alert("Error updating captain details");
    }
  };

  const addNewPlayer = async (e) => {
    e.preventDefault();
    
    if (!newPlayer.name || !newPlayer.position || !newPlayer.age || !newPlayer.startingPrice) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch('https://rbl-auction.onrender.com/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPlayer,
          age: parseInt(newPlayer.age),
          startingPrice: parseInt(newPlayer.startingPrice),
          auctioned: false
        })
      });

      if (response.ok) {
        fetchData(); // Refresh the player list
        // Reset form
        setNewPlayer({
          name: '',
          position: '',
          age: '',
          priorTeam: '',
          availability: 'Available',
          startingPrice: ''
        });
      } else {
        alert('Failed to add player');
      }
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Error adding player');
    }
  };

  const updatePlayerDetails = async (playerId) => {
    const newPrice = editingPrices[playerId];
    const newAvailability = editingAvailability[playerId];
    const newHeight = editingHeight[playerId];
    
    if (!newPrice && !newAvailability && !newHeight) {
      alert("No changes to update");
      return;
    }

    try {
      const response = await fetch(`https://rbl-auction.onrender.com/api/players/${playerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(newPrice && { startingPrice: parseInt(newPrice) }),
          ...(newAvailability && { availability: newAvailability }),
          ...(newHeight && { height: newHeight })
        }),
      });

      if (response.ok) {
        fetchData();
        // Clear the editing states
        setEditingPrices(prev => {
          const newState = { ...prev };
          delete newState[playerId];
          return newState;
        });
        setEditingAvailability(prev => {
          const newState = { ...prev };
          delete newState[playerId];
          return newState;
        });
        setEditingHeight(prev => {
          const newState = { ...prev };
          delete newState[playerId];
          return newState;
        });
      } else {
        alert("Failed to update player details");
      }
    } catch (error) {
      console.error("Error updating player details:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted. Fetching initial data...");
    fetchData();
  }, []);

  return (
    <div className="draft-master">
      <h1>Draft Master</h1>
      
      <div className="add-player-form">
        <h2>Add New Player</h2>
        <form onSubmit={addNewPlayer}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Player Name *"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              required
            />
            <select
              value={newPlayer.position}
              onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
              required
            >
              <option value="">Select Position *</option>
              <option value="Guard">Guard</option>
              <option value="Forward">Forward</option>
              <option value="Center">Center</option>
            </select>
            <input
              type="number"
              placeholder="Age *"
              value={newPlayer.age}
              onChange={(e) => setNewPlayer({...newPlayer, age: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Prior Team"
              value={newPlayer.priorTeam}
              onChange={(e) => setNewPlayer({...newPlayer, priorTeam: e.target.value})}
            />
            <input
              type="number"
              placeholder="Starting Price *"
              value={newPlayer.startingPrice}
              onChange={(e) => setNewPlayer({...newPlayer, startingPrice: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="add-player-button">Add Player</button>
        </form>
      </div>

      <div className="captain-management">
        <h2>Manage Captains</h2>
        <ul>
          {captains.map((captain) => (
            <li key={captain._id} className="captain-item">
              <div className="captain-info">
                <div className="name-edit">
                  <input
                    type="text"
                    value={editingCaptainNames[captain._id] || ""}
                    onChange={(e) =>
                      setEditingCaptainNames((prev) => ({
                        ...prev,
                        [captain._id]: e.target.value,
                      }))
                    }
                    placeholder={captain.name}
                  />
                  <input
                    type="text"
                    value={editingTeamNames[captain._id] || ""}
                    onChange={(e) =>
                      setEditingTeamNames((prev) => ({
                        ...prev,
                        [captain._id]: e.target.value,
                      }))
                    }
                    placeholder={captain.team}
                  />
                  <button
                    onClick={() => updateCaptainDetails(captain._id)}
                    className="update-captain-button"
                  >
                    Update Details
                  </button>
                </div>
                <div>Remaining Budget: ${captain.budget}</div>
              </div>
              <div className="budget-edit">
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
              <div className="player-edit-controls">
                <input
                  type="number"
                  min="0"
                  value={editingPrices[player._id] || ""}
                  onChange={(e) => setEditingPrices(prev => ({
                    ...prev,
                    [player._id]: e.target.value
                  }))}
                  placeholder="Edit Price"
                  className="edit-input"
                />
                <select
                  value={editingAvailability[player._id] || ""}
                  onChange={(e) => setEditingAvailability(prev => ({
                    ...prev,
                    [player._id]: e.target.value
                  }))}
                  className="edit-select"
                >
                  <option value="">Edit Availability</option>
                  <option value="Available">Available</option>
                  <option value="Injured">Injured</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <input
                  type="text"
                  value={editingHeight[player._id] || ""}
                  onChange={(e) => setEditingHeight(prev => ({
                    ...prev,
                    [player._id]: e.target.value
                  }))}
                  placeholder="Edit Height"
                  className="edit-input"
                />
                <button
                  className="update-button"
                  onClick={() => updatePlayerDetails(player._id)}
                >
                  Update Details
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
