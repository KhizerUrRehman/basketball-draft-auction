require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const playerRoutes = require("./routes/playerRoutes");
const captainRoutes = require("./routes/captainRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/players", playerRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/logs", logRoutes);

// In-Memory Auction State
let auctionState = {
  currentPlayer: null,
  logs: [],
  bids: [], // Track all bids
  winningBid: null,
};

// REST API to fetch the current auction state
app.get("/api/auction-state", (req, res) => {
  res.json(auctionState);
});

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send current auction state to the new client
  socket.emit("auctionState", auctionState);

  // Listen for auction start
  socket.on("startAuction", (data) => {
    const { player } = data;

    if (!player || !player.name) {
      console.error("Invalid player data received for auction start");
      return;
    }

    auctionState.currentPlayer = player;
    auctionState.logs.push(`Auction started for ${player.name}`);
    auctionState.bids = []; // Reset bids for the new auction
    auctionState.winningBid = null;
    io.emit("auctionState", auctionState); // Broadcast updated state
  });

  // Listen for new bids
  socket.on("placeBid", (data) => {
    const { captain, bid } = data;

    if (!captain || typeof bid !== "number" || bid <= 0) {
      console.error("Invalid bid data received:", data);
      return;
    }

    // Add the bid to the logs and state
    auctionState.logs.push(`Captain ${captain} placed a bid of $${bid}`);
    auctionState.bids.push({ captain, bid });

    // Update the winning bid if this is the highest bid
    if (!auctionState.winningBid || bid > auctionState.winningBid.bid) {
      auctionState.winningBid = { captain, bid };
    }

    io.emit("auctionState", auctionState); // Broadcast updated state
  });

  // Listen for auction end
  socket.on("endAuction", (data) => {
    const { player, winningBid } = data;

    if (!player || !winningBid || !winningBid.captain || !winningBid.bid) {
      console.error("Invalid auction end data received:", data);
      return;
    }

    auctionState.logs.push(
      `Player ${player.name} sold to ${winningBid.captain} for $${winningBid.bid}`
    );
    auctionState.currentPlayer = null;
    auctionState.winningBid = null;
    auctionState.bids = []; // Clear bids for the next auction
    io.emit("auctionState", auctionState); // Broadcast updated state
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
