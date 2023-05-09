const express = require("express");
const router = express.Router();
const {
  createSpecializations,
} = require("../controllers/specializationController");

router.post("/specializations/bulk", createSpecializations);
module.exports = router;
