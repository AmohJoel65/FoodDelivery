const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please sign in." });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET || 'joel_artisan_secret_2026_key_superb');
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired session. Please log in again." });
  }
};

module.exports = authMiddleware;
