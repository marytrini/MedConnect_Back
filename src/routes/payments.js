const express = require("express");
const router = express.Router();
const {
  createOrder,
  recieveWebhook,
} = require("../controllers/paymentsController");

router.post("/create-order", createOrder);
router.get("/success", (req, res) => {});
router.get("/failure", (req, res) => {});
router.get("/pending", (req, res) => {});
router.get("/webhook", recieveWebhook);

module.exports = router;
