// backend/routes/designs.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// INSERT design
router.post("/add", async (req, res) => {
  const { title, image, style, budget, room_type, popularity } = req.body;

  const { data, error } = await supabase
    .from("design")
    .insert([
      {
        title,
        image,
        style,
        budget,
        room_type,
        popularity,
        is_published: true
      },
    ])
    .select();   // <-- add this line

  if (error) {
    return res.status(400).json({ error });
  }

  res.json({ message: "Design added successfully", data });
});

// FETCH all designs
router.get("/all", async (req, res) => {
    const { data, error } = await supabase
      .from("design")
      .select("*")
      .eq("is_published", true)
      .order("popularity", { ascending: false });
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    res.json(data);
  });
  
export default router;
