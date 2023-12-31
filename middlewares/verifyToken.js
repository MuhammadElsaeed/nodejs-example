import Jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export default (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return next(new AppError("Access denied", 401));
    try {
        const verified = Jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = verified;
        next();
    } catch (error) {
        next(new AppError("Invalid token", 400));
    }
}
