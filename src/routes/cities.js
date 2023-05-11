const express = require("express");
const router = express.Router();
const { createCity } = require("../controllers/citiesController");
router.post("/", createCity);

module.exports = router;
