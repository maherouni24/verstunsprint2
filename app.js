var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// import routes
var indexRouter = require("./routes");
const authRoutes = require("./routes/auth");
const reclamationRoutes = require("./routes/reclamation");
const statistiqueRoutes = require("./routes/statistique");


const userRoutes = require("./routes/user");

var app = express();
var db=require('./models');
db.sequelize.sync().then(()=>{
  console.log('db connected')
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", authRoutes);
app.use("/reclamation", reclamationRoutes);
app.use("/statistique", statistiqueRoutes);

app.use("/user", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized Access: Invalid JWT token !" });
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 8000);
  res.render("error");
});

module.exports = app;