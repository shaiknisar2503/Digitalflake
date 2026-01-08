const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @param {Array} roles - allowed roles (example: ["admin"])
 */
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      // 1️⃣ Get token from Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Fetch user from DB
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // 4️⃣ Role check (if roles are specified)
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // 5️⃣ Attach user to request
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
