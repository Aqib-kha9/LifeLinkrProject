import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "&@*!@^@#()$"); 

    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is invalid or expired", success: false });
  }
};

export default authMiddleware;
