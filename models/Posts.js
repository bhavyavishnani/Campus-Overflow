import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"]
    },
    body: {
        type: String,
        required: [true, "Post body is required"],
        minlength: [10, "Post body must be at least 10 characters long"]
    },
    tags: {
        type: [String],
        validate: {
            validator: function (tags) {
                return tags.length <= 5;
            },
            message: "You can add up to 5 tags only"
        },
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    image: {
        type: String,
        default: null
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // 👈 track upvoters
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // 👈 track downvoters
    repost: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

export default mongoose.model("posts", postSchema);
