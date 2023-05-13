const express = require("express");
const router = express.Router();
const {
  createMedic,
  getMedics,
  getMedic,
  deleteMedic,
} = require("../controllers/medicsController");

router.get("/", getMedics);
router.get("/:id", getMedic);
router.post("/create", createMedic);
router.delete("/:id", deleteMedic);

module.exports = router;
