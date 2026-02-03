import { Request, Response } from 'express'
import { ReviewService } from './reviews.service'

export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  async createReview(req: Request, res: Response) {
    try {
      const review = await this.reviewService.createReview(req.body)
      res.status(201).json(review)
    } catch (e) {
      res.status(500).json({
        message: `Ошибка создания отзыва, повторите попытку позже ${e}`,
      })
    }
  }

  async getReviews(req: Request, res: Response) {
    try {
      const reviews = await this.reviewService.getReviews()
      res.status(201).json(reviews)
    } catch (e) {
      res.status(500).json({ message: `Ошибка получения всех отзывов: ${e}` })
    }
  }

  async updateReview(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: 'Неверный формат id',
        })
      }
      await this.reviewService.updateReview(id, req.body)
      res.json({
        success: true,
        message: 'Отзыв изменен!',
      })
    } catch (e) {
      console.error(`Ошибка изменения отзыва: ${e}`)
      res.status(500).json({
        success: false,
        message: 'Не удалось изменить сообщение. Попробуйте позже!',
      })
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: 'Неверный формат id',
        })
      }
      await this.reviewService.deleteReviews(id)
      res.json({
        success: true,
        message: 'Отзыв удален!',
      })
    } catch (e) {
      console.error(`Ошибка удаления отзыва ${e}`)
      res.status(500).json({
        success: false,
        message:
          'Не удалось удалить отзыв. Возможно отзыв, который вы пытветесь удалить - не найден!',
      })
    }
  }
}