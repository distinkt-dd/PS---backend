import multer from 'multer'

import { Request } from 'express'

import path from 'node:path'
import { toLowerCase } from 'zod'

const storage = multer.memoryStorage()

export const upload = multer({
	storage: storage,
	limits: { fileSize: 10 * 1024 * 1024 },
	fileFilter: (req: Request, file: Express.Multer.File, cb) => {
		const allowedTypes = /jpeg|jpg|svg|png|gif|webp/
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase(),
		)
		const mimetype = allowedTypes.test(file.mimetype)

		if (mimetype && extname) {
			return cb(null, true)
		} else {
			cb(new Error('Только файлы с изображениями доступны для загрузки'))
		}
	},
})
