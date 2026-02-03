import { Request, Response } from 'express'
import { MessageService } from './message.service'

export class MessageController {
  constructor(private messageService: MessageService) {}

  async createMessage(req: Request, res: Response) {
    try {
      const message = await this.messageService.createMessage(req.body)
      res.status(201).json(message)
    } catch (e) {
      res.status(500).json({ message: `Ошибка отправки сообщения: ${e}` })
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const messages = await this.messageService.getMessages()
      res.status(201).json(messages)
    } catch (e) {
      res.status(500).json({ message: `Ошибка получения всех сообщений: ${e}` })
    }
  }

  async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params
      if (Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: 'Неверный формат id',
        })
      }
      await this.messageService.deleteMessage(id)
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
  }
}