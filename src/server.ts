import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import prisma from '@/prisma'
import { messageRouter } from '@/models/message/message.controller' 

dotenv.config()
const app = express()

app.use(express.json())

app.use('/api/messages', messageRouter)


app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Что то пошло не так!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

async function main() {
  await prisma.$connect()
  console.log('База данных загружена, сервер активен...')
  
  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT)
  
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
  console.log(`📨 Messages API: http://localhost:${PORT}/api/messages`)
}

main().catch(error => {
  console.error('Failed to start server: ', error)
  process.exit(1)
})