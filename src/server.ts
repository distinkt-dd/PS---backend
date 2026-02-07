import { messageRouter } from '@/models/message/message.routes'
import prisma from '@/prisma'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import path from 'node:path'
import { reviewRouter } from './models/reviews/reviews.routes'
import categoryRouter from './models/category/category.routes'
import serviceRouter from './models/service/service.routes'
import categoryOnServiceRouter from './models/categories-on-service/categories-on-service.routes'
import stackItemRouter from './models/stack-item/stack-item.routes'
import portfolioItemRouter from './models/portfolio-item/portfolio-item.routes'
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'PS-backend'
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/messages', messageRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/services', serviceRouter)
app.use('/api/category-on-services', categoryOnServiceRouter)
app.use('/api/stack-items', stackItemRouter)
app.use('/api/portfolio-items', portfolioItemRouter)

app.use((req: Request, res: Response) => {
	res.status(404).json({
		message: 'Not Found',
	})
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({
		message: 'Что то пошло не так!',
		error: process.env.NODE_ENV === 'development' ? err.message : undefined,
	})
})


async function main() {
	await prisma.$connect()
	console.log('База данных загружена, сервер активен...')

	const PORT = process.env.PORT ?? 3000
	await app.listen(PORT)

	console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
	console.log(`📨 Messages API: http://localhost:${PORT}/api/messages`)
	console.log(`Reviews API: http://localhost:${PORT}/api/reviews`)
}

main().catch(error => {
	console.error('Failed to start server: ', error)
	process.exit(1)
})
