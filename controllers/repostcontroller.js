// controllers/repostController.js
import Post from "../models/Posts.js";
import User from "../models/User.js";

export const repostPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const user = await User.findById(userId);

    // Check if already reposted
    if (user.repostedPosts.includes(postId)) {
      return res.status(400).json({ message: "Already reposted this post" });
    }

    // Add to user's reposts
    user.repostedPosts.push(postId);
    await user.save();

    // Increase post repost count
    post.repostCount += 1;
    await post.save();

    res.status(200).json({ message: "Post reposted successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
