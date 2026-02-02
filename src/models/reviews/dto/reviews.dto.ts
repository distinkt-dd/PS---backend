import { z } from 'zod'

export enum ReviewStatus {
	VERIFIED = 'VERIFIED',
	UNVERIFIED = 'UNVERIFIED',
}

export const ReviewStatusLabel: Record<ReviewStatus, string> = {
	[ReviewStatus.VERIFIED]: 'Подтвержденно',
	[ReviewStatus.UNVERIFIED]: 'Отклонен',
}

export const reviewsCreateDto = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Имя должно быть не менее 2 символов' })
		.max(50, { message: 'Имя не должно превышать 50 символов' }),
	lastName: z
		.string()
		.min(2, { message: 'Фамилия должно быть не менее 2 символов' })
		.max(50, { message: 'Фамилия не должна превышать 50 символов' }),
	textReview: z
		.string()
		.min(10, {
			message: 'Отзыв не может быть настолько коротким, минимум 10 символов.',
		})
		.max(1500, { message: 'Чуточек по короче отзыв)' }),
})

export const reviewsUpdateDto = z.object({
	firstName: z
		.string()
		.min(2, { message: 'Имя должно быть не менее 2 символов' })
		.max(50, { message: 'Имя не должно превышать 50 символов' })
		.optional(),
	lastName: z
		.string()
		.min(2, { message: 'Фамилия должно быть не менее 2 символов' })
		.max(50, { message: 'Фамилия не должна превышать 50 символов' })
		.optional(),
	textReview: z
		.string()
		.min(10, {
			message: 'Отзыв не может быть настолько коротким, минимум 10 символов.',
		})
		.max(1500, { message: 'Чуточек по короче отзыв)' })
		.optional(),
	status: z
		.nativeEnum(ReviewStatus)
		.optional()
		.default(ReviewStatus.UNVERIFIED),
})

export const reviewResponseDto = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	textReview: z.string(),
	status: z.nativeEnum(ReviewStatus),
	statusLabel: z.string(),
	createAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
})

export type ReviewResponseDto = z.infer<typeof reviewResponseDto>

export type ReviewUpdateDto = z.infer<typeof reviewsUpdateDto>

export type ReviewCreateDto = z.infer<typeof reviewsCreateDto>
