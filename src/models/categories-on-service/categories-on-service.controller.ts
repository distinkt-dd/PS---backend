import { CategoriesOnServiceService } from './categories-on-service.service'
import { Request, Response } from 'express'

export class CategoryOnServiceController {
	constructor(private categoriesOnServiceService: CategoriesOnServiceService) {}

	async create(req: Request, res: Response) {
		try {
			const relation =
				await this.categoriesOnServiceService.addingCategoryToService(req.body)
			res.status(201).json({
				success: true,
				message: 'Категория успешно привязана к услуге!',
				relation,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось привязать категорию к услуге!',
				error: e instanceof Error ? e.message : 'Unknown error',
			})
		}
	}
	async assignCategories(req: Request, res: Response) {
		try {
			const { id } = req.params
			if (Array.isArray(id)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			const result =
				await this.categoriesOnServiceService.assignCategoriesToService(
					id,
					req.body,
				)
			res.status(201).json({
				success: true,
				message: `Успешно привязано ${result.count} категорий к услуге!`,
				...result,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось привязать категории!',
				error: e instanceof Error ? e.message : 'Unknown error',
			})
		}
	}
	async removeCategory(req: Request, res: Response) {
		try {
			const { serviceId, categoryId } = req.params
			if (Array.isArray(serviceId) || Array.isArray(categoryId)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			const result =
				await this.categoriesOnServiceService.removeCategoryFromService(
					serviceId,
					categoryId,
				)
			res.status(200).json({
				success: true,
				message: 'Категория успешно удалена из услуги!',
				result,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось удалить категорию из услуги!',
				error: e instanceof Error ? e.message : 'Unknown error',
			})
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const relations =
				await this.categoriesOnServiceService.getAllCategoryOnServices()
			res.status(200).json({
				success: true,
				message: 'Связи категорий и услуг получены!',
				count: relations.length,
				relations,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось получить связи!',
				error: e instanceof Error ? e.message : 'Unknown error',
			})
		}
	}

	async getCategoriesByService(req: Request, res: Response) {
		try {
			const { serviceId } = req.params
			if (Array.isArray(serviceId)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			const relations =
				await this.categoriesOnServiceService.getCategoriesByServiceId(
					serviceId,
				)
			res.status(200).json({
				success: true,
				message: 'Категории услуги получены!',
				serviceId,
				categories: relations,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось получить категории услуги!',
				error: e instanceof Error ? e.message : 'Unknown error',
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
			const relation =
				await this.categoriesOnServiceService.deleteCategoryOnService(id)
			res.status(200).json({
				success: true,
				message: 'Связь успешно удалена!',
				relation,
			})
		} catch (e) {
			console.error(e)
			res.status(400).json({
				success: false,
				message: 'Не удалось удалить связь!',
				error: e instanceof Error ? e.message : 'Unknown error',
			})
		}
	}
}
