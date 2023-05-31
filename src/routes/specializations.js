const express = require("express");
const router = express.Router();
//const uploadMiddleware = require("../utils/handleStorage");
const {
  createSpecializations,
  getSpecializations,
  deleteSpecializations,
  getSpecialization,
  updateSpecialization,
  restoreSpec,
  getAllSpecializations,
} = require("../controllers/specializationController");

router.get("/", getSpecializations);
router.get("/all", getAllSpecializations);
router.get("/:id", getSpecialization);
router.post("/", createSpecializations);
router.put("/:id", updateSpecialization);
router.delete("/:id", deleteSpecializations);
router.patch("/:id", restoreSpec);
module.exports = router;
