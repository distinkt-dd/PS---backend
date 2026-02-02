import prisma from '@/prisma'
import { ServiceCreateDto } from './dto/service.dto'

export class ServicesService {
	async create(data: ServiceCreateDto) {
		return prisma.service.create({
			data: {
				title: data.title,
				description: data.description as string,
				minSum: data.minSum,
				maxSum: data.maxSum,
			},
		})
	}
}
