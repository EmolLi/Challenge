const router = require("express").Router();
const Game = require("../models/Game");

router.post("/search", (req, res) => {
  const {
    genre, // array
    subgenre, // array
    title, // string
    pid, // string
    ratingGte, // number
    ratingLt, // number
    rCountGte, // number
    rCountLt // number
  } = req.body;

  const query = {};

  let numbers = ["ratingGte", "ratingLt", "rCountLt", "rCountGte"];
  let arrays = ["genre", "subgenre"];
  for (let n of numbers) {
    if (req.body[n] && isNaN(req.body[n])) {
      res.status(400);
      res.send(`Error: ${n} should be a number.`);
      return;
    }
  }
  for (let n of arrays) {
    if (req.body[n] && !Array.isArray(req.body[n])) {
      res.status(400);
      res.send(`Error: ${n} should be an array.`);
      return;
    }
  }

  if (genre && genre.length > 0) query.genre = { $in: genre };
  if (subgenre && subgenre.length > 0) query.subgenre = { $in: subgenre };
  if (title) query.title = new RegExp(title, "i");
  if (pid) query.pid = new RegExp(pid, "i");
  if (ratingGte) query.rating = { $gte: ratingGte };
  if (ratingLt)
    query.rating = query.rating
      ? { ...query.rating, $lt: ratingLt }
      : { $lt: ratingLt };
  if (rCountGte) query.rCount = { $gte: rCountGte };
  if (rCountLt)
    query.rCount = query.rCount
      ? { ...query.rCount, $lt: rCountLt }
      : { $lt: rCountLt };

  Game.find(query, (err, doc) => {
    if (err) {
      res.status(500);
      console.log(err);
      res.send(`Error.`);
    } else res.send(doc);
  });
});

router.get("*", function(req, res) {
  res.send("Hello~");
});

router.post("*", function(req, res) {
  res.send("Hello~");
});
module.exports = router;
