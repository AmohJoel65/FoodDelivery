const express = require('express');
const { addReview, getFoodReviews, getAllReviews, deleteReview } = require('../controllers/reviewController');
const { validate, addReviewSchema } = require('../middleware/validation');

const reviewRouter = express.Router();

reviewRouter.post('/add', validate(addReviewSchema), addReview);
reviewRouter.get('/food/:foodId', getFoodReviews);
reviewRouter.get('/all', getAllReviews);
reviewRouter.delete('/:reviewId', deleteReview);

module.exports = reviewRouter;
