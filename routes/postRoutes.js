import express from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from "../controllers/postcontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// ✅ Create Post (with image upload)
router.post("/",authMiddleware, upload.single("image"), createPost);

// ✅ Read all posts
router.get("/", authMiddleware, getAllPosts);

// ✅ Read single post by id
router.get("/:id",authMiddleware, getPostById);

// ✅ Update post (with optional new image upload)
router.put("/:id", authMiddleware,upload.single("image"), updatePost);

// ✅ Delete post
router.delete("/:id",authMiddleware, deletePost);

export default router;
