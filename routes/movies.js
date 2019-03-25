var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET movies listing. */
router.get("/movies", function(req, res, next) {
  res.render("movies", { title: "Movies" });
  console.log("test works");
});

module.exports = router;
