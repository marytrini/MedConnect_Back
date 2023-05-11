const { Router } = require("express");
const specializations = require("./specializations.js");
const { register } = require("./register.js");
const { login } = require("./login.js");
const router = Router();
const appointment = require("./appointment.js");
const medics = require("./medics.js");
const cities = require("./cities.js");
router.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.send("Server Online");
  } else {
    res.send("unauthorized");
  }
});

router.use("/register", register);
router.use("/login", login);

router.use("/specializations", specializations);
router.use("/appointment", appointment);
router.use("/medics", medics);
router.use("/cities", cities);
module.exports = {
  router,
};
