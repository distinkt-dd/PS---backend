import { z } from 'zod'

export const stackItemCreateDto = z.object({
	name: z
		.string()
		.min(2, 'Минимальная длина названия технологии - 2 символа')
		.max(30, 'Максимальная длина названия технологии - 40 символов'),
	description: z
		.string()
		.min(20, 'Минимальная длина описания - 20 символов')
		.max(1500, 'Максимальная длина описания - 1500 символов')
		.optional(),
})

export const stackItemUpdateDto = stackItemCreateDto.partial()

export type StackItemCreateDto = z.infer<typeof stackItemCreateDto>
export type StackItemUpdateDto = z.infer<typeof stackItemUpdateDto>
