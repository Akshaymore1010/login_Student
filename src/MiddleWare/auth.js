import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }
       
        const token = authHeader.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

