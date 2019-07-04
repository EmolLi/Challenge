const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  err => {
    if (err) console.log(err);
  }
);

/* insert data into db
let rawdata = fs.readFileSync("games.json");
let games = JSON.parse(rawdata);

const Game = require("./models/Game");

Game.collection.insert(games, function(err, docs) {
  if (err) {
    return console.error(err);
  } else {
    console.log("Multiple documents inserted to Collection");
  }
});
console.log(games.length);
*/
