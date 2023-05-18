const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
require("dotenv").config();
const { router } = require("./routes/router.js");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cookieParser());
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
