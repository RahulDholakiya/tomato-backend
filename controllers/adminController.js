// import adminModel from "../models/adminModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// const createAdmin = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const admin = await adminModel.findOne({ email });
//     if (admin) {
//       return res.json({ success: false, message: "Admin already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }

//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please enter a strong password",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newAdmin = new adminModel({
//       username: username,
//       email: email,
//       password: hashedPassword,
//     });

//     const user = await newAdmin.save();

//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// const loginAdmin=async(req,res)=>{
//   const{email,password}=req.body
//     try {
//       const admin=await adminModel.findOne({email})

//       if(admin){
//         return res.json({success:false,message:"Admin already exists"})
//       }
//     } catch (error) {
      
//     }
// }

// export { createAdmin, loginAdmin };
