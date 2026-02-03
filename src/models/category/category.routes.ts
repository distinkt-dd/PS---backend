import { validate } from '@/middleware/validate.middleware'
import { Router } from 'express'
import { categoryCreateDto, categoryUpdateDto } from './dto/category.dto'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

const categoryRouter = Router()
const categoryService = new CategoryService()
const categoryController = new CategoryController(categoryService)

categoryRouter.post(
	'/',
	validate(categoryCreateDto),
	categoryController.create.bind(categoryController),
)

categoryRouter.get('/', categoryController.getAll.bind(categoryController))

categoryRouter.delete(
	'/:id',
	categoryController.delete.bind(categoryController),
)

categoryRouter.post(
	'/updated/:id',
	validate(categoryUpdateDto),
	categoryController.update.bind(categoryController),
)

export default categoryRouter
