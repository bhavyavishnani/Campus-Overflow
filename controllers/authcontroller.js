import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { name, email, password, department, collegeId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword,
            department,
            collegeId
        });

        await user.save();

        res.status(201).json({ message: "user created successfully", user: user });
    }
    catch (e) {
        res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
}

export const login = async (req, res) => {

    try {
            const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
        return res.status(400).json({message: "wrong password"});
    }

    const token = jwt.sign(
        {id: existingUser._id, role: existingUser._role},
        secret,
        {expiresIn: '7d'}
    );

    res.status(200).json({message: "Login Successfully", token: token})
    }
    catch(e){
        res.status(500).json({message: "Internal Server Error", error: e.message})
    }
}