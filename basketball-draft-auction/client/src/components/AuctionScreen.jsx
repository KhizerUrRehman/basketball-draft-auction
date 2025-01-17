import React, { useState, useEffect } from "react";
import "../styles/AuctionScreen.css";
import logo from "../assets/lob.jpg"; // Import the logo

const AuctionScreen = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [captains, setCaptains] = useState([]);
  const [bids, setBids] = useState([]);
  const [winningBid, setWinningBid] = useState(null);
  const [logs, setLogs] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  const fetchAuctionData = async () => {
    try {
      const playerResponse = await fetch(
        "https://rbl-auction.onrender.com/api/players?auctioned=false"
      );
      const playerData = await playerResponse.json();
      setPlayers(playerData);

      const captainResponse = await fetch("https://rbl-auction.onrender.com/api/captains");
      const captainData = await captainResponse.json();
      setCaptains(captainData);
    } catch (error) {
      console.error("Error fetching auction data:", error);
    }
  };

  const initializeAuction = async (playerId) => {
    const selectedPlayer = players.find((player) => player._id === playerId);

    try {
      const captainResponse = await fetch("https://rbl-auction.onrender.com/api/captains");
      const updatedCaptains = await captainResponse.json();
      setCaptains(updatedCaptains);

      setCurrentPlayer(selectedPlayer);
      setBids(
        updatedCaptains.map((captain) => ({
          captain: captain.name,
          captainId: captain._id,
          bid: 0,
        }))
      );
      setLogs((prevLogs) => [
        ...prevLogs,
        `Auction started for ${selectedPlayer.name}`,
      ]);
    } catch (error) {
      console.error("Error initializing auction:", error);
      alert("Failed to start auction. Please try again.");
    }
  };

  const placeBid = (captainId, amount) => {
    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.captainId === captainId ? { ...bid, bid: amount } : bid
      )
    );
  };

  const submitBid = (captainId) => {
    const captainName = captains.find((cap) => cap._id === captainId).name;
    const amount = bids.find((bid) => bid.captainId === captainId).bid;
    const logMessage = `Captain ${captainName} placed a bid of $${amount}`;
    setLogs((prevLogs) => [...prevLogs, logMessage]);
  };

  const finalizeAuction = async () => {
    if (!winningBid || !currentPlayer) {
      alert("No winning bid to finalize!");
      return;
    }

    try {
      await fetch(
        `https://rbl-auction.onrender.com/api/players/${currentPlayer._id}/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            captainId: winningBid.captainId,
            price: winningBid.bid, // Include the price in the request
          }),
        }
      );

      await fetch(
        `https://rbl-auction.onrender.com/api/captains/${winningBid.captainId}/deduct-budget`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: winningBid.bid }),
        }
      );

      setLogs((prevLogs) => [
        ...prevLogs,
        `Player ${currentPlayer.name} assigned to Captain ${winningBid.captain} for $${winningBid.bid}`,
      ]);

      setPlayers(players.filter((player) => player._id !== currentPlayer._id));
      setCurrentPlayer(null);
      setWinningBid(null);
    } catch (error) {
      console.error("Error finalizing auction:", error);
      alert("Failed to finalize auction. Please try again.");
    }
  };

  useEffect(() => {
    fetchAuctionData();
  }, []);

  useEffect(() => {
    const maxBid = bids.reduce(
      (max, bid) => (bid.bid > max.bid ? bid : max),
      { bid: 0 }
    );
    setWinningBid(maxBid);
  }, [bids]);

  return (
    <div>   

      <div className="auction-container">
        {currentPlayer ? (
          <>
            <div className="auction-player">
              <h1 className="player-name">{currentPlayer.name}</h1>
              <p className="player-details">
                Position: {currentPlayer.position} | Starting Price: $
                {currentPlayer.startingPrice}
              </p>
            </div>

            <div className="captains-grid">
              {bids.map((bid) => (
                <div key={bid.captainId} className="captain-card">
                  <h3>{bid.captain}</h3>
                  <p>
                    Budget: $
                    {captains.find((cap) => cap._id === bid.captainId)?.budget}
                  </p>
                  <input
                    type="number"
                    className="bid-input"
                    min="0"
                    max={
                      captains.find((cap) => cap._id === bid.captainId)?.budget
                    }
                    value={bid.bid}
                    onChange={(e) =>
                      placeBid(bid.captainId, parseInt(e.target.value, 10) || 0)
                    }
                  />
                  <button
                    onClick={() => submitBid(bid.captainId)}
                    className="bid-button"
                  >
                    Place Bid
                  </button>
                </div>
              ))}
            </div>

            <div className="auction-controls">
              <p>
                Current Winning Bid: ${winningBid?.bid || "None"} by{" "}
                {winningBid?.captain || "No Captain"}
              </p>
              <button onClick={finalizeAuction} className="finalize-button">
                Finalize Auction
              </button>
            </div>
          </>
        ) : (
          <div className="auction-player-selection">
            <h2>Select a Player to Auction</h2>
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
              className="start-auction-button"
              disabled={!selectedPlayerId}
            >
              Start Auction
            </button>
          </div>
        )}

        <div className="auction-logs">
          <h3>Auction Logs</h3>
          
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionScreen;
