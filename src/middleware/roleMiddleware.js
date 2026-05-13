function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Akses ditolak",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role middleware error",
      });
    }
  };
}

module.exports = roleMiddleware;
