var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/gryffin", function(req, res, next) {
  res.render("gryffin", { title: "Gryffin" });
  console.log("test works");
});

module.exports = router;
