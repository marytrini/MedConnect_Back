const { Router } = require("express");
const specializations = require("./specializations.js");
const { register } = require("./register.js");
const { login } = require("./login.js");
const router = Router();

router.get("/", function (req, res) {
  res.send("Server Online");
});

router.use("/register", register);
router.use("/login", login);

router.use("/", specializations);

module.exports = {
  router,
};
