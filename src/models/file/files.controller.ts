import { FileService } from './file.service'

export class FileController {
	constructor(private readonly fileService: FileService) {}

	async saveFile(file: Express.Multer.File, folder?: string) {
		return this.fileService.saveFile(file, folder)
	}
}
