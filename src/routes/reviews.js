const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewsController");

router.get("/", getReviews);
router.post("/create", createReview);
router.delete("/:id", deleteReview);

module.exports = router;
