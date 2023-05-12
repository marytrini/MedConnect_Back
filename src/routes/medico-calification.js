const express = require("express");
const router = express.Router();
const {
  createMedicoCalification,
} = require("../controllers/medico-calificationController");
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/", createMedicoCalification);
module.exports = router;
