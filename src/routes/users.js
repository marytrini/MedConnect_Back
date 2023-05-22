const express = require("express");
const router = express.Router();
const { userGet } = require("../controllers/userController");

router.get("/", userGet);
router.get("/:id");
router.put("/:id");
router.delete("/:id");

module.exports = router;
