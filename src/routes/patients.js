const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatient,
  createPatient,
} = require("../controllers/patientController");

router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/create", createPatient);

module.exports = router;
