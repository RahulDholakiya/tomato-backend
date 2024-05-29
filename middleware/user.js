// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";

// const verifyUser = async (req, res, next) => {
//   const { token } = req.headers;
//   if (token) {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     const id = token_decode.id;
//     const user = await userModel.findById(id);
//     if (user.role == "User") {
//       next();
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "You are not authenticated" });
//     }
//   } else {
//     return res
//       .status(401)
//       .json({ success: false, message: "You are not authenticated" });
//   }
// };

// const verifyAdmin = async (req, res, next) => {
//     const { token } = req.headers;
//     if (token) {
//       const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//       const id = token_decode.id;
//       const user = await userModel.findById(id);
//       if (user.role == "Admin") {
//         next();
//       } else {
//         return res
//           .status(401)
//           .json({ success: false, message: "You are not authenticated" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "You are not authenticated" });
//     }
//   };
// export { verifyUser, verifyAdmin };
