import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb( null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024, // 1MB maximum file size
  },
});

export const configureMulter = () => {
  return upload.single('file');
};
