var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.post("/addpost", function(req, res, next) {
  var postData = new Post(req.body);
  postData
    .save()
    .then(result => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(400).send("Unable to save data");
    });
});

module.exports = router;
