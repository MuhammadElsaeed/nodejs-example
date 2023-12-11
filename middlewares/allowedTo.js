import AppError from "../utils/appError.js";
export default (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(new AppError('You are not allowed to perform this action', 403));
        }
        next();
    }
}
