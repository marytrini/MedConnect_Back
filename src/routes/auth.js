const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/session");
const {
  registerCtrl,
  loginCtrl,
  loginSuccess,
  logoutUser,
} = require("../controllers/authController");
const {
  validatorRegisterUser,
  validatorLoginUser,
} = require("../validators/authValidator");
router.get("/loginn/success", authMiddleware, loginSuccess);
router.get("/logoutLocal", logoutUser);
router.post("/register", validatorRegisterUser, registerCtrl);
router.post("/login", validatorLoginUser, loginCtrl);
module.exports = router;
