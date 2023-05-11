const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {
  createSpecializations,
  getSpecializations,
  deleteSpecializations,
  getSpecialization,
} = require("../controllers/specializationController");

router.get("/", getSpecializations);
router.get("/:id", getSpecialization);
router.post("/", uploadMiddleware.single("image"), createSpecializations);
router.delete("/:id", deleteSpecializations);
module.exports = router;
