import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/AuctionScreen.css";

const socket = io("https://rbl-auction.onrender.com");

const AuctionScreen = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [captains, setCaptains] = useState([]);
  const [bids, setBids] = useState([]);
  const [winningBid, setWinningBid] = useState(null);
  const [logs, setLogs] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [bidInputs, setBidInputs] = useState({}); // Track inputs separately

  // Fetch players and captains
  const fetchAuctionData = async () => {
    try {
      const playerResponse = await fetch(
        "https://rbl-auction.onrender.com/api/players?auctioned=false"
      );
      const playerData = await playerResponse.json();
      setPlayers(playerData);

      const captainResponse = await fetch(
        "https://rbl-auction.onrender.com/api/captains"
      );
      const captainData = await captainResponse.json();
      setCaptains(captainData);
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  // Restore auction state on page load
  const restoreAuctionState = async () => {
    try {
      const response = await fetch("https://rbl-auction.onrender.com/api/auction-state");
      const state = await response.json();
      setCurrentPlayer(state.currentPlayer);
      setBids(state.bids);
      setLogs(state.logs);
      setWinningBid(state.winningBid);
    } catch (error) {
      console.error("Error restoring auction state:", error);
    }
  };

  // Initialize auction
  const initializeAuction = (playerId) => {
    const selectedPlayer = players.find((player) => player._id === playerId);
    setCurrentPlayer(selectedPlayer);
    setBids(
      captains.map((captain) => ({
        captain: captain.name,
        captainId: captain._id,
        bid: 0,
      }))
    );

    const message = `Auction started for ${selectedPlayer.name}`;
    setLogs((prevLogs) => [...prevLogs, message]);

    // Notify other clients
    socket.emit("startAuction", { player: selectedPlayer });
  };

  // Handle bid input change
  const handleBidInputChange = (captainId, amount) => {
    setBidInputs((prev) => ({
      ...prev,
      [captainId]: amount,
    }));
  };

  // Handle bid submission
  const submitBid = (captainId) => {
    const amount = parseInt(bidInputs[captainId] || 0, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const captainName = captains.find((cap) => cap._id === captainId).name;

    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.captainId === captainId ? { ...bid, bid: amount } : bid
      )
    );

    const message = `Captain ${captainName} placed a bid of $${amount}`;
    setLogs((prevLogs) => [...prevLogs, message]);

    if (!winningBid || amount > winningBid.bid) {
      setWinningBid({ captain: captainName, bid: amount });
    }

    socket.emit("placeBid", { captain: captainName, bid: amount });
  };

  // Finalize auction
  const finalizeAuction = async () => {
    if (!winningBid || !currentPlayer) {
      alert("No winning bid to finalize!");
      return;
    }
  
    try {
      const captainId = captains.find((cap) => cap.name === winningBid.captain)._id;

      // Assign the player to the captain
      await fetch(`https://rbl-auction.onrender.com/api/players/${currentPlayer._id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captainId, price: winningBid.bid }),
      });

      // Deduct the bid amount from the captain's budget
      await fetch(`https://rbl-auction.onrender.com/api/captains/${captainId}/deduct-budget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: winningBid.bid }),
      });

      const message = `Player ${currentPlayer.name} assigned to Captain ${winningBid.captain} for $${winningBid.bid}`;
      setLogs((prevLogs) => [...prevLogs, message]);

      // Refresh captains to reflect updated budgets
      const captainResponse = await fetch("https://rbl-auction.onrender.com/api/captains");
      const updatedCaptains = await captainResponse.json();
      setCaptains(updatedCaptains);

      // Remove the player from the pool and reset the auction
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player._id !== currentPlayer._id)
      );
      setCurrentPlayer(null);
      setWinningBid(null);

      // Notify other clients
      socket.emit("endAuction", {
        player: currentPlayer,
        winningBid,
      });
    } catch (error) {
      console.error("Error finalizing auction:", error);
      alert("Failed to finalize auction. Please try again.");
    }
  };

  useEffect(() => {
    fetchAuctionData();
    restoreAuctionState();

    socket.on("auctionState", (state) => {
      setCurrentPlayer(state.currentPlayer);
      setBids(state.bids);
      setLogs(state.logs);
      setWinningBid(state.winningBid);
      setCaptains(state.captains || []); // Ensure captains are updated if part of state
    });

    return () => {
      socket.off("auctionState");
    };
  }, []);

  return (
    <div className="auction-screen">
      {!currentPlayer && (
        <div className="auction-player-selection">
          <h2>Select a Player to Start Auction</h2>
          <select
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(e.target.value)}
          >
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name} - {player.position}
              </option>
            ))}
          </select>
          <button
            onClick={() => initializeAuction(selectedPlayerId)}
            disabled={!selectedPlayerId}
          >
            Start Auction
          </button>
        </div>
      )}

      {currentPlayer && (
        <div className="auction-in-progress">
          <div className="bidding-section">
            {captains.map((captain) => (
              <div key={captain._id} className="captain-card">
                <h3>{captain.name}</h3>
                <p>Budget: ${captain.budget}</p>
                <input
                  type="number"
                  min="0"
                  value={bidInputs[captain._id] || ""}
                  onChange={(e) =>
                    handleBidInputChange(captain._id, e.target.value)
                  }
                />
                <button onClick={() => submitBid(captain._id)}>
                  Place Bid
                </button>
              </div>
            ))}
          </div>

          <div className="auction-controls">
            <h1>Auction for: {currentPlayer.name}</h1>
            <p>Position: {currentPlayer.position}</p>
            <p>Starting Price: ${currentPlayer.startingPrice}</p>
            <p>
              Current Winning Bid: ${winningBid?.bid || "None"} by{" "}
              {winningBid?.captain || "No Captain"}
            </p>
            <button onClick={finalizeAuction}>Finalize Auction</button>
          </div>
        </div>
      )}

      <div className="auction-logs">
        <h3>Auction Logs</h3>
        <ul>
          {[...logs].reverse().map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuctionScreen;
