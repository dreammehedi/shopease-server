const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const apiLimit = require("express-rate-limit");
const apiCallLimit = apiLimit({
  windowMs: 15 * 60 * 1000, // 10 minutes
  max: 50,
  message: "Too many requests from this IP, please try again later!",
});
const createError = require("http-errors");
const productRouter = require("./router/productRoute");
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(xssClean());
app.use(apiCallLimit);

// my router middleware
app.use("/api", productRouter);

// home route
app.get("/", (req, res) => {
  res.send("Welcome to the ShopEasy Server!");
});

// client error handler
app.use((req, res, next) => {
  next(createError(404, "Route not found!"));
});

// server error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
module.exports = app;
