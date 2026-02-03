import { ServiceService } from './service.service'
import { Request, Response } from 'express'
export class ServiceController {
	constructor(private serviceService: ServiceService) {}

	async create(req: Request, res: Response) {
		try {
			const service = await this.serviceService.createService(req.body)
			res.status(201).json({
				success: true,
				message: 'Услуга успешно создана!',
				service,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось создать сервис!' })
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
			const updatedService = await this.serviceService.updateService(
				id,
				req.body,
			)
			res.status(201).json({
				success: true,
				message: 'Услуга успешно обновлена!',
				updatedService,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось обновить услугу!' })
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const services = await this.serviceService.getServices()
			res
				.status(201)
				.json({ success: true, message: 'Услуги получены!', services })
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось получить услуги!' })
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
			const service = await this.serviceService.deleteService(id)
			res.status(201).json({
				success: true,
				message: 'Услуга успешно удалена!',
				service,
			})
		} catch (e) {
			console.error(e)
			res
				.status(400)
				.json({ success: false, message: 'Не удалось удалить услугу!' })
		}
	}
}
