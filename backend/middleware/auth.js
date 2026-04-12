import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log("Token from middleware : ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    console.log("Role : ", req.user.role);

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Admin only",
      });
    }
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden. Admin only" });
  }
};
