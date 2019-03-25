var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET movies listing. */
router.get("/movies", function(req, res, next) {
  if (req.session) {
    res.render("movie_admin", { title: "Movie" });
    console.log("test works for admin");
  } else {
    res.render("movie", { title: "Movie" });
    console.log("test works");
  }
});
module.exports = router;
