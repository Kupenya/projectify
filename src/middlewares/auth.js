import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: "Authorization header missing",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Invalid token format",
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not configured");
    return res.status(500).json({
      success: false,
      error: "Server configuration error",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    return next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    const errorResponse = {
      success: false,
      error: "Invalid token",
    };

    if (err.name === "TokenExpiredError") {
      errorResponse.error = "Token expired";
    } else if (err.name === "JsonWebTokenError") {
      errorResponse.error = "Malformed token";
    }

    return res.status(401).json(errorResponse);
  }
};

export default auth;
