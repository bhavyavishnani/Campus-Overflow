// routes/repostRoutes.js
import express from "express";
import { repostPost } from "../controllers/repostcontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Repost a post
router.post("/:postId", authMiddleware, repostPost);

export default router;
