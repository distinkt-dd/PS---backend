import { z } from 'zod'

export enum CategoryType {
	DEFAULT = 'DEFAULT',
	DANGER = 'DANGER',
}

export const categoryCreateDto = z.object({
	categoryName: z
		.string()
		.min(2, { message: 'Имя категории должно быть не менее 2 символов' })
		.max(50, { message: 'Имя категории должно быть не более 50 символов' }),
	categoryType: z
		.nativeEnum(CategoryType, {
			message: 'Выберите из двух вариантов DANGER или DEFAULT',
		})
		.default(CategoryType.DEFAULT),
})

export const categoryUpdateDto = categoryCreateDto.partial()

export type CategoryCreateDto = z.infer<typeof categoryCreateDto>
export type CategoryUpdateDto = z.infer<typeof categoryUpdateDto>
