const express = require("express");
const specializations = express.Router();
const {
  createSpecializations,
} = require("../controllers/specializationController");

specializations.post("/specializations/bulk", createSpecializations);
module.exports = specializations;
