const express = require("express");
const router = express.Router();
const {
  userGet,
  getUserId,
  deleteUser,
  restoreUser,
  userGetParanoid,
} = require("../controllers/userController");

router.get("/", userGet);
router.get("/all", userGetParanoid);
router.get("/:id", getUserId);
router.delete("/:id", deleteUser);
router.patch("/:id", restoreUser);

module.exports = router;
