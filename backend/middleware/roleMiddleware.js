
const hasRole = (allowed) => (req, res, next) => {
    if (!allowed) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized access'
        });
    }

    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized access'
        });
    }

    const roles = Array.isArray(allowed) ? allowed : [allowed];

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
            message: 'Forbidden'
        });
    }
    
    return next;
}