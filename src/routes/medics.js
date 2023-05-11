const express = require("express");
const router = express.Router();
const { createMedic, getMedics } = require("../controllers/medicsController");

router.get("/", getMedics);
router.post("/create", createMedic);

module.exports = router;
