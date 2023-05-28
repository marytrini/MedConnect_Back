const express = require("express");
const router = express.Router();
const {
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

router.get("/", getAppointment);
router.post("/create", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
module.exports = router;
