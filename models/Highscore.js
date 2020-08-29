const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HighscoreSchema = new Schema({
    User: {
      type: String,
      required: true
    },
    points: {
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: new Date()
    }
  });
  module.exports = Highscore = mongoose.model("highscores", HighscoreSchema);