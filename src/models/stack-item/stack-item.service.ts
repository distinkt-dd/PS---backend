import { StackItem } from '@/generated/prisma/client'
import { StackItemCreateDto, StackItemUpdateDto } from './dto/stack-item.dto'
import prisma from '@/prisma'
import { FileService } from '../file/file.service'

export class StackItemService {
	constructor(private fileService: FileService) {}

	async createStackItem(
		dto: StackItemCreateDto,
		imageFile?: Express.Multer.File,
	): Promise<StackItem> {
		let imageSrc = null

		if (imageFile) {
			const fileResponse = await this.fileService.saveFile(imageFile, 'stacks')
			imageSrc = fileResponse.url
		}

		return prisma.stackItem.create({
			data: {
				...dto,
				imageSrc,
			},
		})
	}

	async updateStackItem(
		id: string,
		dto: StackItemUpdateDto,
		imageFile?: Express.Multer.File,
	): Promise<StackItem> {
		const currentItem = await prisma.stackItem.findUnique({
			where: { id },
		})

		if (!currentItem) {
			throw new Error('Данная технология не существует в базе данных!')
		}

		let imageSrc = currentItem.imageSrc

		if (imageFile) {
			if (currentItem.imageSrc) {
				await this.fileService.deleteFile(currentItem.imageSrc)
			}

			const fileResponse = await this.fileService.saveFile(imageFile, 'stacks')
			imageSrc = fileResponse.url
		}

		return await prisma.stackItem.update({
			where: { id },
			data: {
				...dto,
				imageSrc,
			},
		})
	}

	async getStackItems(): Promise<StackItem[]> {
		return await prisma.stackItem.findMany({
			orderBy: { createAt: 'desc' },
		})
	}

	async deleteStackItem(id: string): Promise<StackItem> {
		const stackItem = await prisma.stackItem.findUnique({
			where: { id },
		})

		if (!stackItem) {
			throw new Error(`Технология по заданному id не найдена!`)
		}

		if (stackItem.imageSrc) {
			await this.fileService.deleteFile(stackItem.imageSrc)
		}

		return await prisma.stackItem.delete({
			where: { id },
		})
	}
}
