const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY="saimanjunath";

 /* ------------------ SignUp Logic----------------------------------- */

const signupController = async (req, res) => {
    const { email, password,name } = req.body;
    const isEmailPresent = await UserModel.findOne({ email });
      if (isEmailPresent) {
      return res
        .status(400)
        .send({ status: "error", message: "Email already exists" });
    } else {
      bcrypt
        .hash(password, 10)
        .then(async function (hash) {
          const newUser = new UserModel({ ...req.body, password: hash });
          await newUser.save();
          return res.status(201).json({
            message: "SignUp Successfull!!!",
            status: "success",
            user: newUser,
          });
        })
        .catch((err) => {
          res.status(400).send({ status: "error", message: err.message });
        });
    }
}
  
/* ------------------ Login Logic----------------------------------- */

 const loginController=async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email });
   
        if (user) {
          let hash = user.password;
          bcrypt.compare(password, hash, function (err, result) {
            if (err) {
              return res.send({
                message: "Something went wrong, plz try again later",
                status: "error",
              });
            }
            if (result) {
              const token = jwt.sign(
                { userId: user._id, email: email },
                JWT_SECRET_KEY,
                {
                  expiresIn: "5h",
                }
              );
              return res.status(200).send({
                status: "success",
                message: "Login Successfull!!!",
                token: token,
                user: user,
              });
            } else {
              return res
                .status(400)
                .send({ status: "error", message: "Invalid Credentials" });
            }
          });
        } else {
          return res
            .status(400)
            .send({ status: "error", message: "Invalid Credentials" });
        }
      } else {
        return res
          .status(400)
          .send({ status: "error", message: "All Fields are Required" });
      }
    } catch (err) {
      // console.log(err);
      return res.status(400).send({ status: "error", message: err.message });
    }
}
const API_KEY="b9e173ac-36c3-4f16-8a73-ce5ccd055dc8";
const home=async(req,res)=>{
 
}
const addcrypto=async(req,res)=>{
  console.log(req.body);
}
  module.exports= {signupController,loginController,home,addcrypto};