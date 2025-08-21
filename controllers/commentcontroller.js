import cloudinary from '../config/couldinary.js';
import Comment from "../models/Comments.js";
import Post from "../models/Posts.js";

// ✅ Create Comment
export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;   // ✅ params se le lo

    if (!text && !req.file) {
      return res.status(400).json({ message: "Comment text or image required" });
    }

    // Upload image if available
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newComment = new Comment({
      text,
      image: imageUrl,
      author: req.user.id,
      post: postId,   // ✅ ab params se aaya id assign karo
    });

    await newComment.save();

    // Push commentId into post.comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Comments of a Post
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update text
    if (text) comment.text = text;

    // update image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      comment.image = result.secure_url;
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(id);

    // remove from post.comments array
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: id },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
