const fs = require('fs');
const path = require('path');

// Chemin du répertoire de destination
const uploadPath = path.join(__dirname, '../uploads/outputs');

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('file');

module.exports = upload;
