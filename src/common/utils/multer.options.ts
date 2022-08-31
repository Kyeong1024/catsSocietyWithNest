import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const createFolder = (folder: string) => {
  try {
    fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
  } catch (err) {
    console.error('folder has already exists.');
  }

  try {
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (err) {
    console.error(`${folder} has already exists.`);
  }
};

export const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
