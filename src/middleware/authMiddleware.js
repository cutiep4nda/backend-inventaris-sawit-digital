const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    // FORMAT: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Format token salah",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // SIMPAN USER KE REQUEST
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid",
    });
  }
}

module.exports = authMiddleware;
