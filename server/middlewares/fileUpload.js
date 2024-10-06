const multer = require('multer');
const path = require('path');

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension; // Include the file extension
    cb(null, fileName);
  },
});

// Create the multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB maximum file size
  },
  fileFilter: function (req, file, cb) {
    // Check file types. You can modify the allowed file types according to your requirements.
    const allowedFileTypes = /jpeg|jpg|png|webp/;
    const extName = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extName) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Only JPEG, JPG, PNG, WEBP, PDF, DOC and DOCX files are allowed.'
        )
      );
    }
  },
});

// Define a middleware function to handle file uploads
const uploadMiddleware = (req, res, next) => {
  upload.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred during file upload
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

module.exports = { uploadMiddleware };