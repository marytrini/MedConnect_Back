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

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://med-connect-front.vercel.app"
//   ); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://med-connect-clinica.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, access-control-allow-credentials"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_SECRET],
    maxAge: 24 * 60 * 60 * 100,
    // domain: "med-connect-front.vercel.app",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

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
