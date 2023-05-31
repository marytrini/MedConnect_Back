const express = require("express");

require("dotenv").config();
const passportSetup = require("./config/passport");
const passport = require("passport");
const { createServer } = require("http");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const { router } = require("./routes/router.js");

const app = express();
const httpServer = createServer(app);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://medconnect-clinica-production.up.railway.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, access-control-allow-credentials"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_SECRET],
    maxAge: 24 * 60 * 60 * 100,
    domain: "med-connect-clinica.vercel.app",
  })
);
app.use(passport.initialize());
app.use(passport.session());

//express vars
app.set("port", process.env.PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("dev"));

app.use(express.static("./src/storage"));

app.use("/", router);

app.use(function (err, req, res, next) {
  res.status(500).json(err);
});

module.exports = {
  httpServer,
  app,
};
