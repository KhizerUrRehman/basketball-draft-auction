const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  contact: { type: String },
  startingPrice: { type: Number, default: 50 }, // Default value for startingPrice
  auctioned: { type: Boolean, default: false },
  priorTeam: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    default: 'Unknown'
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Player", playerSchema);
