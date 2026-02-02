import { validate } from '@/middleware/validate.middleware'
import { Request, Response, Router } from 'express'
import { reviewsCreateDto, reviewsUpdateDto } from './dto/reviews.dto'
import { ReviewService } from './reviews.service'

const router = Router()
const reviewService = new ReviewService()

router.post(
	'/',
	validate(reviewsCreateDto),
	async (req: Request, res: Response) => {
		try {
			const review = await reviewService.createReview(req.body)
			res.status(201).json(review)
		} catch (e) {
			res.status(500).json({
				message: `Ошибка создания отзыва, повторите попытку позже ${e}`,
			})
		}
	},
)

router.get('/', async (req: Request, res: Response) => {
	try {
		const reviews = await reviewService.getReviews()
		res.status(201).json(reviews)
	} catch (e) {
		res.status(500).json({ message: `Ошибка получения всех отзывов: ${e}` })
	}
})

router.post(
	'/updated/:id',
	validate(reviewsUpdateDto),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			if (Array.isArray(id)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			await reviewService.updateReview(id, req.body)
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
	},
)

router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		if (Array.isArray(id)) {
			return res.status(400).json({
				success: false,
				message: 'Неверный формат id',
			})
		}
		await reviewService.deleteReviews(id)
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
})

export const reviewRouter = router
