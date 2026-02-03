import { Router } from 'express'
import { CategoriesOnServiceService } from './categories-on-service.service'
import { CategoryOnServiceController } from './categories-on-service.controller'

import { validate } from '@/middleware/validate.middleware'
import {
	assignCategoriesToServiceDto,
	categoryOnServiceCreateDto,
} from './dto/categories-on-service.dto'

const categoryOnServiceRouter = Router()
const categoryOnServiceService = new CategoriesOnServiceService()
const categoryOnServiceController = new CategoryOnServiceController(
	categoryOnServiceService,
)

categoryOnServiceRouter.post(
	'/',
	validate(categoryOnServiceCreateDto),
	categoryOnServiceController.create.bind(categoryOnServiceController),
)

categoryOnServiceRouter.get(
	'/',
	categoryOnServiceController.getAll.bind(categoryOnServiceController),
)

categoryOnServiceRouter.delete(
	'/:id',
	categoryOnServiceController.delete.bind(categoryOnServiceController),
)

categoryOnServiceRouter.post(
	'/service/:id/assign-categories',
	validate(assignCategoriesToServiceDto),
	categoryOnServiceController.assignCategories.bind(
		categoryOnServiceController,
	),
)

categoryOnServiceRouter.delete(
	'/service/:serviceId/category/:categoryId',
	categoryOnServiceController.removeCategory.bind(categoryOnServiceController),
)

categoryOnServiceRouter.get(
	'/service/:serviceId/categories',
	categoryOnServiceController.getCategoriesByService.bind(
		categoryOnServiceController,
	),
)

export default categoryOnServiceRouter
