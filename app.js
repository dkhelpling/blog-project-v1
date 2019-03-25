var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");

var mongoDB = "mongodb://localhost:27017/userlist";

mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
let db = mongoose.connection;

// Checking connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", err => {
  console.log(err);
});

// Bring in routes

var index = require("./routes/index");
var travel = require("./routes/travel");
var movies = require("./routes/movies");
var gryffin = require("./routes/gryffin");
var food = require("./routes/food");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Use sessions for tracking logins
app.use(
  session({
    secret: "treehouse loves you",
    resave: true,
    saveUninitialized: false
  })
);

// Make the db accessible to the router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Load routes
app.use("/", index);
app.use("/travel", travel);
app.use("/movies", movies);
app.use("/gryffin", gryffin);
app.use("/food", food);

// create post schema for mongoose
var adminSchema = new mongoose.Schema({ firstName: String, lastName: String });
var User = mongoose.model("User", nameSchema);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
