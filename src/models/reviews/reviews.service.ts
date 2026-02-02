import { Review, ReviewStatus } from '@/generated/prisma/client'
import prisma from '@/prisma'
import {
	ReviewCreateDto,
	ReviewStatusLabel,
	ReviewUpdateDto,
} from './dto/reviews.dto'
import { ICreateReview } from './reviews.types'

export class ReviewService {
	async createReview(dto: ReviewCreateDto): Promise<Review> {
		const data: ICreateReview = {
			firstName: dto.firstName,
			lastName: dto.lastName,
			textReview: dto.textReview,
		}
		return await prisma.review.create({
			data: {
				...data,
				status: ReviewStatus.UNVERIFIED,
			},
		})
	}

	async updateReview(id: string, data: ReviewUpdateDto): Promise<Review> {
		return await prisma.review.update({
			where: { id },
			data,
		})
	}

	async getReviews() {
		const reviews = await prisma.review.findMany({
			orderBy: { createAt: 'desc' },
		})

		return await reviews.map(review => ({
			...review,
			statusLabel: ReviewStatusLabel[review.status as ReviewStatus],
		}))
	}

	async deleteReviews(id: string): Promise<Review> {
		return await prisma.review.delete({
			where: { id },
		})
	}
}
