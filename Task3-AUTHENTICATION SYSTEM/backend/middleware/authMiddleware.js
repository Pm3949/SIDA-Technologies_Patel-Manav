import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import * as authModel from "../models/authModel.js";

export const protect = (req, res, next) =>{
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        try {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, SECRET);
            const user = authModel.findById(decoded.id);
            if(!user){
                const error = new Error("User not found");
                error.status = 404;
                throw error;
            }
            delete user.password;
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if(!token){
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};