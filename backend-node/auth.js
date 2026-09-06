import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function issueToken(user, config) {
  if (!config?.JWT_SECRET) throw new Error("JWT_SECRET is not configured.");
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}

export function authenticate(config) {
  return (req, res, next) => {
    if (!config?.JWT_SECRET) return res.status(503).json({ error: { code: "CONFIG_INVALID", message: "JWT authentication is not configured." } });
    const header = req.get("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ error: { code: "AUTH_REQUIRED", message: "A bearer token is required." } });
    try {
      req.user = jwt.verify(token, config.JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ error: { code: "INVALID_TOKEN", message: "The authentication token is invalid or expired." } });
    }
  };
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: { code: "FORBIDDEN", message: "You do not have permission to perform this action." } });
    }
    next();
  };
}
