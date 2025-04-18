// mock_server/utils/jwtUtils.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'yourSecretKey';
const REFRESH_SECRET_KEY = 'yourRefreshSecretKey';

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

const verifyToken = (token, type = 'access') => {
  try {
    if (type === 'access') {
      return jwt.verify(token, SECRET_KEY);
    } else {
      return jwt.verify(token, REFRESH_SECRET_KEY);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  SECRET_KEY,
  REFRESH_SECRET_KEY,
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};