// backend/src/middlewares/multer.middleware.js

import multer from "multer";
import path from "path";
import os from "os";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, os.tmpdir());
        cb(null, './public/temp/uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});

// Filter to allow only image uploads
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"), false);
    }
};

// Export configured multer instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // Max 2MB
    },
});
