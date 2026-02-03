import { Router } from 'express'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { validate } from '@/middleware/validate.middleware'
import { createMessageDto } from './dto/message.create.dto'

const router = Router()
const messageService = new MessageService()
const messageController = new MessageController(messageService)

router.post(
  '/',
  validate(createMessageDto),
  messageController.createMessage.bind(messageController)
)

router.get(
  '/',
  messageController.getMessages.bind(messageController)
)

router.delete(
  '/:id',
  messageController.deleteMessage.bind(messageController)
)

export const messageRouter = router