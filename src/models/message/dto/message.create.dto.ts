import { z } from 'zod'

export const createMessageDto = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Имя должно быть не менее 2 символов' })
		.max(50, { message: 'Имя не должно превышать 50 символов' }),
	lastName: z
		.string()
		.min(2, { message: 'Фамилия должно быть не менее 2 символов' })
		.max(50, { message: 'Фамилия не должна превышать 50 символов' }),
	email: z
		.string()
		.email({ message: 'Некорректный email адрес' })
		.optional()
		.or(z.literal('')),
	phone: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, { message: 'Некорректный номер телефона' })
		.optional()
		.or(z.literal('')),
	comment: z
		.string()
		.min(10, { message: 'Комментарий должен быть не менее 10  символов' })
		.max(1000, {
			message: 'Комментарий не может быть более 1000 символов, опишите кратко',
		})
		.optional()
		.or(z.literal('')),
})

export type CreateMessageDto = z.infer<typeof createMessageDto>
