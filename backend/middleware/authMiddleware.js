const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
                error: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) 
        {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
                error: 'Access denied. No token provided.'
            });
        }

        const isValid = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const user = await User.findById(isValid.id)
            .select('-hashedPassword -refreshToken');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Token invalid.',
                error: 'User not found. Token invalid.'
            });
        }
        
        req.user = user;

        next();
        
    }catch (error) {
        console.error('Token verification error:', error.message);
        
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired. Please refresh your token.',
                error: 'Access token expired. Please refresh your token.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.',
                error: 'Invalid token. Please login again.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Authentication failed.',
            error: 'Authentication failed.'
        });    
    }
}

module.exports = { verifyToken };
