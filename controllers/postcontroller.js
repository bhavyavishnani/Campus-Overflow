import cloudinary from "cloudinary";
import Post from "../models/Posts.js";

// create a post
export const createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const author = req.user.id; // middleware se aayega (JWT se)

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      imageUrl = result.secure_url;
    }

    const post = new Post({
      title,
      body,
      tags,
      author,
      image: imageUrl,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update post
export const updatePost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (title) post.title = title;
    if (body) post.body = body;
    if (tags) post.tags = tags;

    // check if new image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      post.image = result.secure_url;
    }

    await post.save();

    res.status(200).json({ success: true, message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// upvote
export const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.upvotes += 1;
    await post.save();

    res.status(200).json({ success: true, message: "Post upvoted", upvotes: post.upvotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// downvote
export const downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.downvotes += 1;
    await post.save();

    res.status(200).json({ success: true, message: "Post downvoted", downvotes: post.downvotes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
