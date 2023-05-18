const express = require("express");
const router = express.Router();
const {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/medicalScheduleController");

router.get("/", getSchedule);
router.post("/create", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
