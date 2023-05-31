const express = require("express");
const router = express.Router();
const {
  createMedicoCalification,
  getMedicsCalification,
} = require("../controllers/medico-calificationController");

router.get("/", getMedicsCalification);

router.post("/", createMedicoCalification);
module.exports = router;
