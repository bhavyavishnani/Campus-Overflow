import { body } from "express-validator";


export const resgiterValidation = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().isEmail().withMessage("enter a valid email address"),
    body("password").notEmpty().isLength({min: 6}).withMessage("password must have 6 characters"),
    body("collegeId").notEmpty().withMessage("College Id is required"),
];

export const loginValidation = [
    body("email").notEmpty().isEmail().withMessage("enter a valid email address"),
    body("password").notEmpty().isLength({min: 6}).withMessage("password must have 6 characters"),
];
