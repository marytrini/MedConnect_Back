const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { sessionConfig } = require("./utils/session/session.js");
const { router } = require("./routes/router.js");
const { useLocalStrategy } = require("./utils/Passport/passport.js");

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
app.use(express.static("./src/storage"));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(useLocalStrategy());

//test

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

app.use("/", router);

module.exports = {
  httpServer,
  app,
};
