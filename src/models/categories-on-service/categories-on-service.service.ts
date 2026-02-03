import { CategoryOnService } from '@/generated/prisma/client'
import {
	AssignCategoriesToServiceDto,
	CategoriesOnServiceCreateDto,
	CategoriesOnServiceUpdateDto,
} from './dto/categories-on-service.dto'
import prisma from '@/prisma'

export class CategoriesOnServiceService {
	async addingCategoryToService(
		dto: CategoriesOnServiceCreateDto,
	): Promise<CategoryOnService> {
		return await prisma.categoryOnService.create({
			data: {
				serviceId: dto.serviceId,
				categoryId: dto.categoryId,
			},
			include: {
				service: true,
				category: true,
			},
		})
	}

	async assignCategoriesToService(
		serviceId: string,
		dto: AssignCategoriesToServiceDto,
	): Promise<{ count: number; relations: CategoryOnService[] }> {
		await prisma.categoryOnService.deleteMany({
			where: { serviceId },
		})

		const createPromises = dto.categoryIds.map(categoryId =>
			prisma.categoryOnService.create({
				data: {
					serviceId,
					categoryId,
				},
				include: {
					category: true,
				},
			}),
		)

		const relations = await Promise.all(createPromises)

		return {
			count: relations.length,
			relations,
		}
	}

	async getAllCategoryOnServices(): Promise<CategoryOnService[]> {
		return await prisma.categoryOnService.findMany({
			include: {
				service: true,
				category: true,
			},
			orderBy: {
				createAt: 'desc',
			},
		})
	}

	async removeCategoryFromService(
		serviceId: string,
		categoryId: string,
	): Promise<CategoryOnService> {
		return await prisma.categoryOnService.delete({
			where: {
				serviceId_categoryId: {
					serviceId,
					categoryId,
				},
			},
		})
	}

	async getCategoriesByServiceId(
		serviceId: string,
	): Promise<CategoryOnService[]> {
		return await prisma.categoryOnService.findMany({
			where: { serviceId },
			include: {
				category: true,
			},
		})
	}

	async getServicesByCategoryId(
		categoryId: string,
	): Promise<CategoryOnService[]> {
		return await prisma.categoryOnService.findMany({
			where: { categoryId },
			include: {
				service: true,
			},
		})
	}

	async updateCategoryOnService(
		id: string,
		dto: CategoriesOnServiceUpdateDto,
	): Promise<CategoryOnService> {
		return await prisma.categoryOnService.update({
			where: { id },
			data: dto,
			include: {
				service: true,
				category: true,
			},
		})
	}

	async deleteCategoryOnService(id: string): Promise<CategoryOnService> {
		return await prisma.categoryOnService.delete({
			where: { id },
		})
	}
}
