var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var formData = require("express-form-data");
var os = require("os");
var cors = require("cors");
var helmet = require("helmet");
var jwt = require('./services/jwtMiddleware.service');
const errorHandler = require('./services/errorHandler.service');

var app = express();

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

//security, not even close
app.use(cors(corsOptions));
app.use(helmet());
app.use(jwt());

app.use("/api", require("./controllers/crud.controller"));
app.use("/auth", require("./controllers/auth.controller"));
app.use("/categories", require("./controllers/category.controller"));

//global error handler
app.use(errorHandler);

module.exports = app;
