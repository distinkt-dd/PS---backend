import { Router } from 'express'
import { ReviewController } from './reviews.controller'
import { ReviewService } from './reviews.service'
import { validate } from '@/middleware/validate.middleware'
import { reviewsCreateDto, reviewsUpdateDto } from './dto/reviews.dto'

const router = Router()
const reviewService = new ReviewService()
const reviewController = new ReviewController(reviewService)

router.post(
  '/',
  validate(reviewsCreateDto),
  reviewController.createReview.bind(reviewController)
)

router.get(
  '/',
  reviewController.getReviews.bind(reviewController)
)

router.post(
  '/updated/:id',
  validate(reviewsUpdateDto),
  reviewController.updateReview.bind(reviewController)
)

router.delete(
  '/:id',
  reviewController.deleteReview.bind(reviewController)
)

export const reviewRouter = router