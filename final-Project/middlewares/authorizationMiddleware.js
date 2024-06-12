const authorizationMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }

        next();
    };
};

module.exports = authorizationMiddleware;
