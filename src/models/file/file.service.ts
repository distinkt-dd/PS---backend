import { path } from 'app-root-path'
import { ensureDir, unlink, writeFile } from 'fs-extra'
import { FileResponse } from './file.interface'

export class FileService {
	async saveFile(file: Express.Multer.File, folder: string = 'stacks') {
		const uploadedFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadedFolder)

		const timestamp = Date.now()
		const randomString = Math.random().toString(36).substring(7)
		const originalName = `${timestamp}-${randomString}-${file.originalname}`

		await writeFile(`${uploadedFolder}/${originalName}`, file.buffer)

		return {
			url: `/uploads/${folder}/${originalName}`,
			name: originalName,
		}
	}

	async deleteFile(filePath: string): Promise<void> {
		try {
			const fullPath = `${path}${filePath}`
			await unlink(fullPath)
		} catch (e) {
			console.error('Ошибка удаления файла: ', e)
		}
	}

	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'other',
	): Promise<FileResponse[]> {
		return Promise.all(files.map(file => this.saveFile(file, folder)))
	}
}
