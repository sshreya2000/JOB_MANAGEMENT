// to upload file
import multer from 'multer';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const name =
      Date.now() + '-' + req.params.id + '-' + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
