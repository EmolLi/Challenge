const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let Game = new Schema({
  genre: String,
  imgURL: String,
  subgenre: String,
  title: String,
  pid: String,
  rating: Number,
  rCount: Number
});
module.exports = mongoose.model("Game", Game);
