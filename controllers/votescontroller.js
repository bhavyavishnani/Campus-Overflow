import Post from "../models/Posts.js";

// Upvote a post
export const upvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // If already upvoted → remove (toggle)
        if (post.upvotes.includes(userId)) {
            post.upvotes.pull(userId);
        } else {
            post.upvotes.push(userId);
            // Remove from downvotes if exists
            post.downvotes.pull(userId);
        }

        await post.save();
        res.status(200).json({ message: "Vote updated", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Downvote a post
export const downvotePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // If already downvoted → remove (toggle)
        if (post.downvotes.includes(userId)) {
            post.downvotes.pull(userId);
        } else {
            post.downvotes.push(userId);
            // Remove from upvotes if exists
            post.upvotes.pull(userId);
        }

        await post.save();
        res.status(200).json({ message: "Vote updated", post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
