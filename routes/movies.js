var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET movies listing. */
router.get("/movies", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
