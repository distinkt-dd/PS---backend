import prisma from '@/prisma'
import { Message } from '@/generated/prisma/client'
import { CreateMessageDto } from './dto/message.create.dto'

export class MessageService {
	async createMessage(dto: CreateMessageDto): Promise<Message> {
		const data = {
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email || undefined,
			phone: dto.phone || undefined,
			comment: dto.comment || undefined,
			createAt: new Date(),
			updatedAt: new Date(),
		}

		return await prisma.message.create({
			data,
		})
	}

	async getMessages(): Promise<Message[]> {
		return await prisma.message.findMany()
	}

	async deleteMessage(id: string): Promise<Message> {
		return await prisma.message.delete({
			where: { id },
		})
	}
}
