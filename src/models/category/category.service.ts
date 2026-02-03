import { Category } from '@/generated/prisma/client'
import { CategoryCreateDto, CategoryUpdateDto } from './dto/category.dto'
import prisma from '@/prisma'

export class CategoryService {
	async createCategory(dto: CategoryCreateDto): Promise<Category> {
		return await prisma.category.create({
			data: {
				categoryName: dto.categoryName,
				categoryType: dto.categoryType,
			},
		})
	}

	async updateCategory(id: string, dto: CategoryUpdateDto): Promise<Category> {
		return await prisma.category.update({
			where: { id },
			data: {
				...dto,
			},
		})
	}

	async getCategories(): Promise<Category[]> {
		return await prisma.category.findMany({
			orderBy: { createAt: 'desc' },
		})
	}

	async deleteCategory(id: string): Promise<Category> {
		return await prisma.category.delete({
			where: { id },
		})
	}
}
