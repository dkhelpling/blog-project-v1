var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/food", function(req, res, next) {
  res.render("food", { title: "Food" });
  console.log("test works");
});

module.exports = router;
