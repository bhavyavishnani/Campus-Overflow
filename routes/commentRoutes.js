import express from "express";
import {
    createComment,
    deleteComment,
    getComments,
    updateComment,
} from "../controllers/commentcontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Create comment (text + optional image)
router.post("/:postId", authMiddleware, upload.single("image"), createComment);

// Get all comments of a post
router.get("/:postId",getComments);

// Update comment (text + optional image)
router.put("/:commentId", authMiddleware, upload.single("image"), updateComment);

// Delete comment
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
