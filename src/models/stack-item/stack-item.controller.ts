import { StackItemService } from './stack-item.service'
import { Request, Response } from 'express'

export class StackItemController {
	constructor(private stackItemService: StackItemService) {}

	async create(req: Request, res: Response) {
		try {
			const stackItem = await this.stackItemService.createStackItem(
				req.body,
				req.file,
			)
			res.status(201).json({
				success: true,
				message: 'Технология успешно создана',
				stackItem,
			})
		} catch (e) {
			console.log(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось создать технологию' })
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
			const updateStackItem = await this.stackItemService.updateStackItem(
				id,
				req.body,
				req.file,
			)
			res.status(201).json({
				success: true,
				message: 'Технология успешно обновлена!',
				updateStackItem,
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
			const stackItems = await this.stackItemService.getStackItems()
			res.status(201).json({
				success: true,
				message: 'Технологии успешно выведены!',
				stackItems,
			})
		} catch (e) {
			console.error('Ошибка в получении всех технологий! ', e)
			res
				.status(400)
				.json({ success: false, message: 'Ошибка в получении всех технологий' })
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

			const stackItem = await this.stackItemService.deleteStackItem(id)

			res.status(201).json({
				success: true,
				message: 'Технология и ее изображение успешно удалено',
				stackItem,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось удалить технологию!' })
		}
	}
}
