import { Service } from '@/generated/prisma/client'
import { ServiceCreateDto, ServiceUpdateDto } from './dto/service.dto'
import prisma from '@/prisma'

export class ServiceService {
	async createService(dto: ServiceCreateDto): Promise<Service> {
		return await prisma.service.create({
			data: {
				title: dto.title,
				description: dto.description,
				minSum: dto.minSum,
				maxSum: dto.maxSum,
				descriptionItems: dto.descriptionItems || [],

				...(dto.categoryIds && dto.categoryIds.length > 0
					? {
							categoryOnServices: {
								create: dto.categoryIds.map(categoryId => ({
									categoryId,
								})),
							},
						}
					: {}),
			},
			include: {
				categoryOnServices: {
					include: {
						category: true,
					},
				},
			},
		})
	}

	async updateService(id: string, dto: ServiceUpdateDto): Promise<Service> {
		return prisma.service.update({
			where: { id },
			data: {
				...dto,
			},
			include: {
				categoryOnServices: {
					include: {
						category: true,
					},
				},
			},
		})
	}

	async getServices(): Promise<Service[]> {
		return await prisma.service.findMany({
			include: {
				categoryOnServices: {
					include: {
						category: true,
					},
				},
			},
			orderBy: {
				createAt: 'desc',
			},
		})
	}

	async deleteService(id: string): Promise<Service> {
		return await prisma.service.delete({
			where: { id },
		})
	}
}
