const express = require("express");
const router = express.Router();
const {
  registerCtrl,
  loginCtrl,
  userGet,
} = require("../controllers/authController");
const {
  validatorRegisterUser,
  validatorLoginUser,
} = require("../validators/authValidator");
router.get("/", userGet);
router.post("/register", validatorRegisterUser, registerCtrl);
router.post("/login", validatorLoginUser, loginCtrl);
module.exports = router;
