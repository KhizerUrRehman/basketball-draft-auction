import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/AuctionLog.css";
import logo from "../assets/lob.jpg";

const socket = io("https://rbl-auction.onrender.com");

const AuctionLog = () => {
  const [logs, setLogs] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winningBid, setWinningBid] = useState(null);

  useEffect(() => {
    socket.on("auctionState", (state) => {
      console.log("Received auctionState in AuctionLog:", state);
      setLogs(state.logs || []);
      setCurrentPlayer(state.currentPlayer);
      setWinningBid(state.winningBid);
    });

    return () => {
      socket.off("auctionState");
    };
  }, []);

  return (
    <div className="auction-log">
      <img src={logo} alt="Company Logo" className="logo" />
      <h1>Live Auction Log</h1>
      <div className="current-auction">
        {currentPlayer ? (
          <div>
            <h2>{currentPlayer.name}</h2>
            <p>Position: {currentPlayer.position}</p>
            <p>Age: {currentPlayer.age}</p>
            <p>Prior Team: {currentPlayer.priorTeam}</p>
            <p>Availability: {currentPlayer.availability}</p>
            <p>
              Current Winning Bid: ${winningBid?.bid || "None"} by {" "}
              {winningBid?.captain || "No Captain"}
            </p>
          </div>
        ) : (
          <p>No active auction</p>
        )}
      </div>

      <div className="auction-logs">
        {logs.length > 0 ? (
          <div>
            {[...logs].reverse().map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        ) : (
          <p>No logs available</p>
        )}
      </div>
    </div>
  );
};

export default AuctionLog;
