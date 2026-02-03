import { z } from 'zod'

export const serviceCreateDto = z.object({
	title: z
		.string()
		.min(2, 'Минимальная длина названия - 2 символа')
		.max(50, 'Максимальная длина названия - 50 символов'),
	description: z
		.string()
		.min(1, 'Описание не может быть пустым')
		.max(1500, 'Максимальная длина описания - 1500 символов'),
	minSum: z
		.number()
		.min(1, 'Минимальная сумма за работу не может быь пустой')
		.positive('Минимальная сумма не может быть отрицательной'),
	maxSum: z
		.number()
		.min(1, 'Максимальная сумма за работу не может быь пустой')
		.positive('Максимальная сумма не может быть отрицательной'),
	descriptionItems: z.array(z.string()).optional().default([]),
	categoryIds: z.array(z.string()).optional(),
})

export const serviceUpdateDto = serviceCreateDto.partial()

export type ServiceCreateDto = z.infer<typeof serviceCreateDto>
export type ServiceUpdateDto = z.infer<typeof serviceUpdateDto>
