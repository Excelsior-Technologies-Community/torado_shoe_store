import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${folder}`;
      ensureDirectoryExists(uploadPath);
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
};

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|JPG|JPEG|PNG|GIF|WEBP /;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());

  const mime = allowed.test(file.mimetype);

  if (ext && mime) cb(null, true);
  else cb(new Error("Only images are allowed"));
};

export const uploadProductImages = multer({
  storage: storage("products"),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

export const uploadBlogImages = multer({
  storage: storage("blogs"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const uploadTeamImage = multer({
  storage: storage("team"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const uploadTestimonialImage = multer({
  storage: storage("testimonials"),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
