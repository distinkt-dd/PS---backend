import { CategoryService } from './category.service'
import { Request, Response } from 'express'

export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	async create(req: Request, res: Response) {
		try {
			const category = await this.categoryService.createCategory(req.body)
			res.status(201).json({
				success: true,
				message: 'Категория успешно создана!',
				category,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось создать категорию!' })
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params
			if (Array.isArray(id)) {
				return res.status(400).json({
					success: false,
					message: 'Неверный формат id',
				})
			}
			const updatedCategory = await this.categoryService.updateCategory(
				id,
				req.body,
			)
			res.status(201).json({
				success: true,
				message: 'Категория успешно обновлена!',
				updatedCategory,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось обновить категорию!' })
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const categories = await this.categoryService.getCategories()
			res
				.status(201)
				.json({ success: true, message: 'Категории получены!', categories })
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось получить категории!' })
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
			const category = await this.categoryService.deleteCategory(id)
			res.status(201).json({
				success: true,
				message: 'Категория успешно удалена!',
				category,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось удалить категорию!' })
		}
	}
}
