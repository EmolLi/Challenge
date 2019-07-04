const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// logger
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use("/api", require("./routes/"));
app.listen(process.env.PORT || 3050, function() {
  console.log(`server is listening on port ${process.env.PORT || 3050}!`);
});

/* insert data into db
let rawdata = fs.readFileSync("games.json");
let games = JSON.parse(rawdata);

const Game = require("./models/Game");

Game.insertMany(games, function(err, docs) {
  if (err) {
    return console.error(err);
  } else {
    console.log("Multiple documents inserted to Collection");
  }
});
console.log(games.length);
 */
