const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
} = require("../controllers/reviewsController");

router.get("/", getReviews);
router.post("/create", createReview);

module.exports = router;
