import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    voteType: {type: String, enum: ['upvote', 'downvote'], required: true}
});

export default mongoose.model('votes', voteSchema);