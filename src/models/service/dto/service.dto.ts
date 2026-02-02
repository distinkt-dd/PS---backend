import { z } from 'zod'

export const serviceCreateDto = z.object({
	title: z
		.string()
		.min(2, { message: 'Минимальная длина названия услуги: 2 симовла' })
		.max(100, { message: 'Максимальная длина названия услуги: 100 символов' }),
	description: z
		.string()
		.min(10, { message: 'Минимальная длина описания: 10 символов' })
		.max(1000, { message: 'Максимальная длина описания: 1000 символов' })
		.optional(),
	minSum: z
		.number({
			message: 'Значения минимальной суммы не является числом',
		})
		.min(0, { message: 'Минимальная сумма не может быть отрицательной' }),
	maxSum: z
		.number({ message: 'Значения максимальной суммы не является числом' })
		.positive({ message: 'Максимальная сумма должна быть положительной' }),
})

export const serviceUpdatedDto = serviceCreateDto.partial()

export type ServiceCreateDto = z.infer<typeof serviceCreateDto>
export type ServiceUpdatedDto = z.infer<typeof serviceUpdatedDto>
