import { Router } from 'express'
import { FileService } from '../file/file.service'
import { PortfolioItemService } from './portfolio-item.service'
import { PortfolioItemController } from './portfolio-item.controller'
import { upload } from '@/middleware/upload.middleware'
import { validate } from '@/middleware/validate.middleware'
import {
	portfolioItemCreateDto,
	portfolioItemUpdateDto,
} from './dto/portfolio-item.dto'

const portfolioItemRouter = Router()
const fileService = new FileService()
const portfolioItemService = new PortfolioItemService(fileService)
const portfolioItemController = new PortfolioItemController(
	portfolioItemService,
)

portfolioItemRouter.post(
	'/',
	upload.array('images', 10),
	validate(portfolioItemCreateDto),
	portfolioItemController.create.bind(portfolioItemController),
)

portfolioItemRouter.put(
	'/:id',
	upload.array('images', 10),
	validate(portfolioItemUpdateDto),
	portfolioItemController.update.bind(portfolioItemController),
)

portfolioItemRouter.delete(
	'/:id',
	portfolioItemController.delete.bind(portfolioItemController),
)

portfolioItemRouter.get(
	'/',
	portfolioItemController.getAll.bind(portfolioItemController),
)

export default portfolioItemRouter
