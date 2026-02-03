import { title } from 'node:process'
import { z } from 'zod'

export const portfolioItemCreateDto = z.object({
	title: z
		.string()
		.min(2, 'Минимальная длина названия портфолио item - 2 символа')
		.max(30, 'Максимальная длина названия портфолио item - 40 символов'),
	description: z
		.string()
		.min(20, 'Минимальная длина описания - 20 символов')
		.max(1500, 'Максимальная длина описания - 1500 символов')
		.optional(),
	siteLink: z.string().optional(),
	gitHubLink: z.string().optional(),
})

export const portfolioItemUpdateDto = portfolioItemCreateDto.partial()

export type PortfolioItemCreateDto = z.infer<typeof portfolioItemCreateDto>

export type PortfolioItemUpdateDto = z.infer<typeof portfolioItemUpdateDto>
