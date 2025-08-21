import express from "express";
import { downvotePost, upvotePost } from "../controllers/votescontroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upvote
router.put("/:postId/upvote", authMiddleware, upvotePost);

// Downvote
router.put("/:postId/downvote", authMiddleware, downvotePost);

export default router;
