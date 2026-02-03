import { Router } from 'express'
import { StackItemService } from './stack-item.service'
import { FileService } from '../file/file.service'
import { StackItemController } from './stack-item.controller'
import { upload } from '@/middleware/upload.middleware'
import { validate } from '@/middleware/validate.middleware'
import { stackItemCreateDto, stackItemUpdateDto } from './dto/stack-item.dto'

const stackItemRouter = Router()
const fileService = new FileService()
const stackItemService = new StackItemService(fileService)
const stackItemController = new StackItemController(stackItemService)

stackItemRouter.post(
	'/',
	upload.single('image'),
	validate(stackItemCreateDto),
	stackItemController.create.bind(stackItemController),
)

stackItemRouter.put(
	'/:id',
	upload.single('image'),
	validate(stackItemUpdateDto),
	stackItemController.update.bind(stackItemController),
)

stackItemRouter.delete(
	'/:id',
	stackItemController.delete.bind(stackItemController),
)

stackItemRouter.get('/', stackItemController.getAll.bind(stackItemController))

export default stackItemRouter
