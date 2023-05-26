const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/paymentsController");

router.post("/create-order", createOrder);
router.get("/success", (req, res) => {});
router.get("/webhook", (req, res) => {});

module.exports = router;
