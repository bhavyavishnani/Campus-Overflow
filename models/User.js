import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    collegeId: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
    reputationPoints: {
        type: Number,
        default: 0,
    },
    badges: {
        type: [String],
        default: [],
    },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    repostedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

}, { timestamp: true });

export default mongoose.model('users', userSchema);