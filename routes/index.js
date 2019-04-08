var express = require("express");
var router = express.Router();
var User = require("../models/User");
var mid = require("../middleware");

// Get the homepage
router.get("/", function(req, res, next) {
  return res.render("index", { title: "Home" });
  console.log("test works");
});

// Get the food pages
router.get("/food", function(req, res, next) {
  return res.render("food", { title: "Food" });
  console.log("test works");
});

// Get travel page
router.get("/travel", function(req, res, next) {
  return res.render("travel", { title: "Travel" });
  console.log("test works");
});

// Get movies page
router.get("/movie", function(req, res, next) {
  return res.render("movie", { title: "Movie" });
  console.log("test works");
});

// Get gryffin page
router.get("/gryffin", function(req, res, next) {
  return res.render("gryffin", { title: "Gryffin" });
  console.log("test works");
});

router.get("/gryffin_admin", mid.requiresLogin, function(req, res, next) {
  return res.render("gryffin_admin", { title: "Gryffin" });
  console.log("test works");
});

router.get("/food_admin", mid.requiresLogin, function(req, res, next) {
  return res.render("food_admin", { title: "Food" });
  console.log("test works");
});

router.get("/travel_admin", mid.requiresLogin, function(req, res, next) {
  return res.render("travel_admin", { title: "Travel" });
  console.log("test works");
});

router.get("/movie_admin", mid.requiresLogin, function(req, res, next) {
  return res.render("movie_admin", { title: "Movie" });
  console.log("test works");
});

/* GET admin login */
router.get("/admin", function(req, res, next) {
  return res.render("admin", { title: "Admin" });
  console.log("test works for admin");
});

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
        return res.redirect("/");
      }
    });
  } else {
    var err = new Error("Email and password are required");
    err.status = 401;
    return next(err);
  }
});

// GET /logout
router.get("/logout", function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get("/register", function(req, res, next) {
  return res.render("register", { title: "Sign up" });
});

router.post("/register", function(req, res, next) {
  if (req.body.email && req.body.password && req.body.confirmPassword) {
    // Confirm that user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error("Passwords do not match .");
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      email: req.body.email,
      password: req.body.password
    };

    // use schema's  'create' method to insert document into Mongo
    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/index_admin");
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
