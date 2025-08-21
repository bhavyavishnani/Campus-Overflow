import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import repostRoutes from "./routes/repostRoutes.js";
import voteRoutes from './routes/votesRoutes.js';

import dotenv from 'dotenv';
import express from 'express';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/vote', voteRoutes);
app.use("/reposts", repostRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Mongo Db connected successfully')
}).catch(err=> console.log(err));

app.get('/', (req, res)=>{
    res.send('WELCOME TO CAMPUS OVERFLOW');
});

app.listen(PORT, ()=>{
    console.log(`sever is running on port ${PORT}`);
});