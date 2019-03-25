var express = require("express");
var router = express.Router();
var User = require("../models/User");

// Get the homepage
router.get("/", function(req, res, next) {
  if (req.session) {
    return res.render("index_admin", { title: "Home" });
    console.log("test works for admin");
  } else {
    return res.render("index", { title: "Home" });
    console.log("test works");
  }
});

// Get the food pages
router.get("/food", function(req, res, next) {
  if (req.session) {
    return res.render("food_admin", { title: "Food" });
    console.log("test works for admin");
  } else {
    return res.render("food", { title: "Food" });
    console.log("test works");
  }
});

// Get travel page
router.get("/travel", function(req, res, next) {
  if (req.session) {
    return res.render("travel_admin", { title: "Travel" });
    console.log("test works for admin");
  } else {
    return res.render("travel", { title: "Travel" });
    console.log("test works");
  }
});

// Get movies page
router.get("/movies", function(req, res, next) {
  if (req.session) {
    return res.render("movie_admin", { title: "Movie" });
    console.log("test works for admin");
  } else {
    return res.render("movie", { title: "Movie" });
    console.log("test works");
  }
});

// Get gryffin page
router.get("/gryffin", function(req, res, next) {
  if (req.session) {
    return res.render("gryffin_admin", { title: "Gryffin" });
    console.log("test works for admin");
  } else {
    return res.render("gryffin", { title: "Gryffin" });
    console.log("test works");
  }
});

/* GET admin login */
router.get("/admin", function(req, res, next) {
  return res.render("admin", { title: "Admin" });
  console.log("test works for admin");
});
module.exports = router;

// Post /admin
router.post("/admin", function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/index");
      }
    });
  } else {
    var err = new Error("Email and password are required");
    err.status = 401;
    return next(err);
  }
});
module.exports = router;
