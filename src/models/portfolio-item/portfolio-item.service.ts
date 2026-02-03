import { PortfolioItem } from '@/generated/prisma/client'
import { FileService } from '../file/file.service'
import {
	PortfolioItemCreateDto,
	PortfolioItemUpdateDto,
} from './dto/portfolio-item.dto'
import prisma from '@/prisma'

export class PortfolioItemService {
	constructor(private fileService: FileService) {}

	async createPortfolioItem(
		dto: PortfolioItemCreateDto,
		imageFiles?: Express.Multer.File[],
	): Promise<PortfolioItem> {
		let imageSources: string[] = []
		if (imageFiles) {
			const filesResponse = await this.fileService.saveFiles(
				imageFiles,
				'portfolio-items',
			)
			imageSources = filesResponse.map(image => image.url)
		}
		return prisma.portfolioItem.create({
			data: {
				...dto,
				imageSources,
			},
		})
	}

	async updatePortfolioItem(
		id: string,
		dto: PortfolioItemUpdateDto,
		imageFiles?: Express.Multer.File[],
	): Promise<PortfolioItem> {
		const currentPortfolioItem = await prisma.portfolioItem.findUnique({
			where: { id },
		})

		if (!currentPortfolioItem) {
			throw new Error('Данное портфолио отсутствует в базе данных!')
		}

		let imageSources: string[] = currentPortfolioItem.imageSources

		if (imageFiles) {
			if (currentPortfolioItem.imageSources) {
				currentPortfolioItem.imageSources.forEach(async imageSrc => {
					await this.fileService.deleteFile(imageSrc)
				})
			}
			const filesResponse = await this.fileService.saveFiles(
				imageFiles,
				'portfolio-items',
			)
			imageSources = filesResponse.map(image => image.url)
		}

		return await prisma.portfolioItem.update({
			where: { id },
			data: {
				...dto,
				imageSources,
			},
		})
	}

	async getPortfolioItems(): Promise<PortfolioItem[]> {
		return await prisma.portfolioItem.findMany({
			orderBy: { createAt: 'desc' },
		})
	}

	async deletePortfolioItem(id: string): Promise<PortfolioItem> {
		const currentPortfolioItem = await prisma.portfolioItem.findUnique({
			where: { id },
		})

		if (!currentPortfolioItem) {
			throw new Error(`Портфолио по заданному id не найдена`)
		}

		if (currentPortfolioItem.imageSources.length > 0) {
			currentPortfolioItem.imageSources.forEach(async imageSrc => {
				await this.fileService.deleteFile(imageSrc)
			})
		}

		return await prisma.portfolioItem.delete({
			where: { id },
		})
	}
}
