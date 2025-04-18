// mock_server/middlewares/authMiddleware.js
const { verifyToken } = require("../utils/jwtUtils.cjs");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token, 'access');
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
