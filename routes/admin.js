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
