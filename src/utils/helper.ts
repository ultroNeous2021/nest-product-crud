import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );
    cb(null, `${Date.now()}.${extension}`);
  },
});
