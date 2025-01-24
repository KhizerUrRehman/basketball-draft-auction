const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  contact: { type: String },
  startingPrice: { type: Number, required: true },
  auctioned: { type: Boolean, default: false },
  priorTeam: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    default: 'Available'
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Player", playerSchema);
