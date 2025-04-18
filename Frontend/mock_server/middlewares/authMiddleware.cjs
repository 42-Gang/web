const { verifyToken } = require("../utils/jwtUtils.cjs");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  console.log("🛂 Authorization header:", authHeader) // 추가

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❗ Missing or malformed token")
    return res.status(401).json({ message: 'Missing or invalid Authorization header' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token, 'access')
    console.log("✅ Token verified successfully:", decoded) // 추가
    req.user = decoded
    next()
  } catch (err) {
    console.log("❌ Token verification failed:", err.message)
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}


module.exports = authenticateToken;
