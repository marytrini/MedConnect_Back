const express = require("express");
const router = express.Router();
const { createCity, getCities } = require("../controllers/citiesController");

router.get("/", getCities);
router.post("/", createCity);

module.exports = router;
