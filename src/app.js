const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { sessionConfig } = require("./utils/session/session.js");
const {
  serializeUser,
  deserializeUser,
  passportLocalStrategy,
} = require("./passport.js");
const localStrategy = require("passport-local");

//start
dotenv.config({
  path: "./.env",
});
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//express vars
app.set("port", process.env.PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("dev"));
app.use(
  require("cors")({
    origin: "*",
  })
);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

module.exports = {
  httpServer,
  app,
};
