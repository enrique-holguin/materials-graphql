import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async ploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("File can't be empty");
    }
    await this.fileService.parseCsv(file)
    return {operation : 'ends'}
  }
}
