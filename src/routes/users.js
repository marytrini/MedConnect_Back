const express = require("express");
const router = express.Router();
const {
  userGet,
  getUserId,
  deleteUser,
} = require("../controllers/userController");

router.get("/", userGet);
router.get("/:id", getUserId);
router.put("/:id");
router.delete("/:id", deleteUser);

module.exports = router;
