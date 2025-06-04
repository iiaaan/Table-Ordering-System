import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const uploadImageRouter = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const resId = req.body.resId || "default";
    return {
      folder: `restaurant_app/${resId}`, 
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

const upload = multer({ storage });

uploadImageRouter.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path,
    });   
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message || "Unknown error"
    });
  }
});

export default uploadImageRouter;
