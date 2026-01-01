import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMiddleware = (req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { 
        return res.status(401).json({ message: "No token, authorization required" });
    }
    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) { 
        res.status(403).json({ message: `Token is not valid: ${e}` });
    }
};
