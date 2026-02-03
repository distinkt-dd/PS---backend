import { PortfolioItemService } from './portfolio-item.service'
import { Request, Response } from 'express'
export class PortfolioItemController {
	constructor(private portfolioItemService: PortfolioItemService) {}

	async create(req: Request, res: Response) {
		try {
			const files = req.files as Express.Multer.File[]
			const portfolioItem = await this.portfolioItemService.createPortfolioItem(
				req.body,
				files,
			)
			res.status(201).json({
				success: true,
				message: 'Портфолио создано!',
				data: portfolioItem,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось создать портфолио!',
			})
		}
	}

	async update(req: Request, res: Response) {
		try {
			const files = req.files as Express.Multer.File[]
			const { id } = req.params
			if (Array.isArray(id)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			const updatePortfolioItem =
				await this.portfolioItemService.updatePortfolioItem(id, req.body, files)
			res.status(201).json({
				success: true,
				message: 'Портфолио обновлено!',
				data: updatePortfolioItem,
			})
		} catch (e) {
			console.log(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось обновить портфолио' })
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const portfolioItems = await this.portfolioItemService.getPortfolioItems()
			res.status(201).json({
				success: true,
				message: 'Портфолио items выведены',
				data: portfolioItems,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Ошибка в получении всех портфолио',
			})
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params
			if (Array.isArray(id)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}

			const stackItem = await this.portfolioItemService.deletePortfolioItem(id)

			res.status(201).json({
				success: true,
				message: 'Портфолио и его изображения успешно удалены',
				data: stackItem,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось удалить портфолио!' })
		}
	}
}
