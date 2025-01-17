import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/AuctionLog.css";

const socket = io("https://rbl-auction.onrender.com");

const AuctionLog = () => {
  const [logs, setLogs] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winningBid, setWinningBid] = useState(null);

  useEffect(() => {
    socket.on("auctionState", (state) => {
      setLogs(state.logs);
      setCurrentPlayer(state.currentPlayer);
      setWinningBid(state.winningBid);
    });
  }, []);

  return (
    <div className="auction-log">
      <h1>Live Auction Log</h1>
      <div className="current-auction">
        {currentPlayer ? (
          <div>
            <h2>{currentPlayer.name}</h2>
            <p>Position: {currentPlayer.position}</p>
            <p>
              Winning Bid: ${winningBid?.bid || "None"} by{" "}
              {winningBid?.captain || "No Captain"}
            </p>
          </div>
        ) : (
          <p>No active auction</p>
        )}
      </div>
            {[...logs].reverse().map((log, index) => (
              <li key={index}>{log}</li>
            ))}
    </div>
  );
};

export default AuctionLog;
