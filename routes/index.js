var express = require("express");
var router = express.Router();
var User = require("../models/User");

// Get the homepage
router.get("/", function(req, res, next) {
  res.render("index", { title: "Home" });
});

module.exports = router;
