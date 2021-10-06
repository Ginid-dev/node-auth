const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// v1 Routes
const v1 = require("./api/v1");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/v1", v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Not found",
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

module.exports = app;
