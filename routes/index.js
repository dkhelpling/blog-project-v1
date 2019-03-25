var express = require("express");
var router = express.Router();
var User = require("../models/User");

// Get the homepage
router.get("/", function(req, res, next) {
  if (req.session) {
    res.render("index_admin", { title: "Home" });
    console.log("test works for admin");
  } else {
    res.render("index", { title: "Home" });
    console.log("test works");
  }
});
module.exports = router;
