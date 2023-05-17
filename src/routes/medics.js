const express = require("express");
const router = express.Router();
const {
  createMedic,
  getMedics,
  getMedic,
  updateMedic,
  deleteMedic,
} = require("../controllers/medicsController");

router.get("/", getMedics);
router.get("/:id", getMedic);
router.post("/create", createMedic);
router.put("/:id", updateMedic);
router.delete("/:id", deleteMedic);

module.exports = router;
