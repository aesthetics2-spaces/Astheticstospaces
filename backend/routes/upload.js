// backend/routes/upload.js
import express from "express";
import multer from "multer";
import { supabase } from "../supabaseClient.js";
import path from "path";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", upload.single("image"), async (req, res) => {
  const file = req.file;
  const fileName = `${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("design-images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    return res.status(400).json({ error });
  }

  // Get public URL
  const { publicURL, error: urlError } = supabase.storage
    .from("design-images")
    .getPublicUrl(fileName);

  if (urlError) {
    return res.status(400).json({ error: urlError });
  }

  res.json({ imageUrl: publicURL });
});

export default router;
