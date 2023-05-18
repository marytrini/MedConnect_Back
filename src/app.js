const express = require("express");
const passport = require("passport");
const { createServer } = require("http");
const dotenv = require("dotenv");
const { router } = require("./routes/router.js");

//start
dotenv.config({
  path: "./.env",
});
const app = express();
const httpServer = createServer(app);

//express vars
app.set("port", process.env.PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("dev"));
// app.use(
//   require("cors")({
//     origin: "*",
//   })
// );
app.use(
  require("cors")({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static("./src/storage"));

app.use("/", router);

app.use(function (err, req, res, next) {
  res.status(500).json(err);
});

module.exports = {
  httpServer,
  app,
};
