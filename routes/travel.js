var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/travel", function(req, res, next) {
  res.render("travel", { title: "Travel" });
  console.log("test works");
});

module.exports = router;
