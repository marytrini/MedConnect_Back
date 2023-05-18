const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/session");
const checkRole = require("../middlewares/role");
const {
  createMedic,
  getMedics,
  getMedic,
  updateMedic,
  deleteMedic,
} = require("../controllers/medicsController");

router.get("/", authMiddleware, checkRole(["paciente"]), getMedics);
router.get("/:id", getMedic);
router.post("/create", createMedic);
router.put("/:id", updateMedic);
router.delete("/:id", deleteMedic);

module.exports = router;
