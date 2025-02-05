const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Captain = require("../models/Captain");

// Get all players or filter by auction status
router.get("/", async (req, res) => {
  const { auctioned } = req.query; // Optional query param
  try {
    const players = auctioned
      ? await Player.find({ auctioned: auctioned === "true" })
      : await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players", error });
  }
});

// Assign player to captain
router.post("/:id/assign", async (req, res) => {
  const { id } = req.params; // Player ID
  const { captainId, price } = req.body; // Captain ID and price

  try {
    // Find the player
    const player = await Player.findById(id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    // Check if the captain exists
    const captain = await Captain.findById(captainId);
    if (!captain) return res.status(404).json({ message: "Captain not found" });

    // Assign the player to the captain
    player.captain = captainId;
    player.auctioned = true; // Mark player as auctioned
    await player.save();

    // Add the player details to the captain's players array with the price
    captain.players.push({
      name: player.name,
      position: player.position,
      price // Add the price
    });
    await captain.save();

    res.status(200).json({ message: "Player assigned successfully", player });
  } catch (error) {
    res.status(500).json({ message: "Error assigning player", error });
  }
});


// Add a new player
router.post("/", async (req, res) => {
  const { name, position, priorTeam, availability, age, contact, startingPrice=50 } = req.body;
  const player = new Player({
    name,
    position,
    priorTeam,
    availability,
    age,
    contact,
    startingPrice
  });
  try {
    await player.save();
    res.status(201).json({ message: "Player added successfully", player });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ message: "Error adding player", error });
  }
});

// Delete a player
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findByIdAndDelete(id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json({ message: "Player deleted successfully", player });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ message: "Error deleting player", error });
  }
});

// Update a player's details
router.put("/:id", async (req, res) => {
  const { name, position, priorTeam, availability, age, startingPrice, contact } = req.body; // Added contact
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      { name, position, priorTeam, availability, age, startingPrice, contact }, // Added contact
      { new: true }
    );
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player updated successfully", updatedPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Error updating player", error });
  }
});


module.exports = router;
