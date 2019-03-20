var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var mongoDB =
  "mongodb+srv://admin:<password>@cluster0-ywchl.mongodb.net/test?retryWrites=true";

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

// Bring in models

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var travelRouter = require("./routes/travel");
var moviesRouter = require("./routes/movies");
var gryffinRouter = require("./routes/gryffin");
var foodRouter = require("./routes/food");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Make the db accessible to the router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/movies", moviesRouter);
app.use("/gryffin", gryffinRouter);
app.use("/food", foodRouter);

// create post schema for mongoose
var nameSchema = new mongoose.Schema({ firstName: String, lastName: String });
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
