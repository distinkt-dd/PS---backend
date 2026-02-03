import { z } from 'zod'

export const categoryOnServiceCreateDto = z.object({
	serviceId: z.string().min(1, 'Id услуги не может быть пустым'),
	categoryId: z.string().min(1, 'Id категории не может быть пустым'),
})

export const categoryOnServiceUpdateDto = categoryOnServiceCreateDto.partial()

export const assignCategoriesToServiceDto = z.object({
	categoryIds: z
		.array(z.string())
		.min(1, 'Должен быть хотя бы один category ID'),
})

export type CategoriesOnServiceCreateDto = z.infer<
	typeof categoryOnServiceCreateDto
>

export type CategoriesOnServiceUpdateDto = z.infer<
	typeof categoryOnServiceUpdateDto
>

export type AssignCategoriesToServiceDto = z.infer<
	typeof assignCategoriesToServiceDto
>
