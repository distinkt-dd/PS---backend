import { Request, Response, Router } from 'express'
import { validate } from '@/middleware/validate.middleware'
import { createMessageDto } from './dto/message.create.dto'
import { MessageService } from './message.service'
import { error } from 'node:console'
import { success } from 'zod'

const router = Router()
const messageService = new MessageService()

router.post(
	'/',
	validate(createMessageDto),
	async (req: Request, res: Response) => {
		try {
			const message = await messageService.createMessage(req.body)
			res.status(201).json(message)
		} catch (e) {
			res.status(500).json({ message: `Ошибка отправки сообщения: ${error}` })
		}
	},
)

router.get('/', async (req: Request, res: Response) => {
	try {
		const messages = await messageService.getMessages()
		res.status(201).json(messages)
	} catch (e) {
		res
			.status(500)
			.json({ message: `Ошибка получения всех сообщений: ${error}` })
	}
})

router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		if (Array.isArray(id)) {
			return res.status(400).json({
				success: false,
				message: 'Неверный формат id',
			})
		}
		await messageService.deleteMessage(id)
		res.json({
			success: true,
			message: 'Сообщение удалено!',
		})
	} catch (e) {
		console.error(`Ошибка удаления сообщения: ${e}`)
		res.status(500).json({
			success: false,
			message: 'Не удалось удалить сообщение. Возможно сообщение уже удалено!',
		})
	}
})

export const messageRouter = router
