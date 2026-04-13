import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, updateUserRole,getUserById } from '../models/userModel.js';

export const register = async (req, res, next) => {
    try {
        const {username, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(username.length < 3){
            return res.status(400).json({
                success : false,
                message : "Username must be greater than 3 characters"
            })
        }
        if(password.length < 8){
            return res.status(400).json({
                success : false,
                message : "Password must be greater than 8 characters"
            })

        }
        if(!email || !password || !username) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success : false,
                message : "Invalid email address"
            })
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message : "User already exists"
            })
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const newUser = await createUser(username,email,hashedPassword);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        next(error);
    }
}
export const login = async (req, res,next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "Email and password are required"
            })
        }
        const user = await getUserByEmail(email);
        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })
        }
        const token = jwt.sign({id: user.id , role: user.role}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN})

        return res.cookie("token", token, { 
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure: true,
            sameSite : "none",

         }).status(200).json({
            success : true,
            message : "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res,next) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success : true,
            message : "Logout successful"
        });
    } catch (error) {
        next(error);
        
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const {email, role} = req.body;
        const userByEmail = await getUserByEmail(email);
        if(!userByEmail) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        if(userByEmail.role !== "admin") {
            userByEmail.role = role;
            await updateUserRole(email,role);
            return res.status(200).json({
                success : true,
                message : "User role updated successfully"
            })
        }
        else{
            return res.status(400).json({
                success : false,
                message : "Cannot change role of admin user",
            })
        }

    } catch (error) {
        next(error);
        
    }
}

export const profile = async (req, res, next) => {
    
    try {

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        // console.log(token);
        
        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);
        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success : true,
            user : {
                id : user.id,
                username : user.username,
                email : user.email,
                role : user.role
            }
        })
    } catch (error) {
        next(error);
    }
}


