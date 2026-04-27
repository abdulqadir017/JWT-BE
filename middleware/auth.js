import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("POSTMAN SE AYA TOKEN:", token);
    console.log("SERVER KA SECRET KEY:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({ message: "Access Denied: Token nahi mila!" });
    }

    try {
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next(); 
    } catch (err) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};