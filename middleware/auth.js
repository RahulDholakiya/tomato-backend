import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     if (!req.headers) {
//       return res.status(401).json({ error: "Authorization header missing" });
//     }

//     const token = req.headers;
//     console.log("token",token);
//     const decodeToken = jwt.decode(token);
//     console.log("decodeToken",decodeToken);

//     if (!decodeToken || !decodeToken.userId) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     const id = decodeToken.userId;
//     const user = await userModel.findOne({ _id: id });

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = req.headers.authorization;

    const decodeToken = jwt.decode(token);

    if (!decodeToken || !decodeToken.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const id = decodeToken.userId;

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default authMiddleware;
