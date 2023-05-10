const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hola desde citas");
});
router.post("/", (req, res) => {
  res.send("hola desde citas");
});
module.exports = router;
