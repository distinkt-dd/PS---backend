import { Router } from 'express'
import { ServiceService } from './service.service'
import { ServiceController } from './service.controller'
import { validate } from '@/middleware/validate.middleware'
import { serviceCreateDto, serviceUpdateDto } from './dto/service.dto'

const serviceRouter = Router()
const serviceService = new ServiceService()
const serviceController = new ServiceController(serviceService)

serviceRouter.post(
	'/',
	validate(serviceCreateDto),
	serviceController.create.bind(serviceController),
)

serviceRouter.get('/', serviceController.getAll.bind(serviceController))

serviceRouter.delete('/:id', serviceController.delete.bind(serviceController))

serviceRouter.post(
	'/updated/:id',
	validate(serviceUpdateDto),
	serviceController.update.bind(serviceController),
)

export default serviceRouter
