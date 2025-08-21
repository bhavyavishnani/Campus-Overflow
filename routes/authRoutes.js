import express from "express";
import { validationResult } from "express-validator";
import { login, register } from "../controllers/authcontroller.js";
import { loginValidation, resgiterValidation } from "../middleware/validator.js";

const router = express.Router();

const handleMiddleware = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

router.post('/register', resgiterValidation, handleMiddleware, register);
router.post('/login', loginValidation, handleMiddleware, login);


export default router;