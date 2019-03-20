var express = require("express");
var router = express.Router();
var userlist = require("../models/userlist");

/* GET home page. */
router.get("/", function(req, res, next) {
  userlist.find({}, function(err, userlists) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        userslists: userlists
      });
    }
  });
  // var db = req.db;
  // var collection = db.get("usercollection");
  // collection.find({}, {}, (e, docs) => {
  //   res.render("userlist", { userlist: docs });
  //   console.log("I made it this far");
  // });
});
module.exports = router;
