const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Access Denied: No token provided' });
        }
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Invalid or expired token' });
    }
};