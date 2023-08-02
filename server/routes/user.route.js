const express = require("express");
const userRouter=express.Router();




const { emailValidator } = require("../middleware/emailValidator.js");
const {loginController,signupController,home} = require("../controller/userController.js");
const { emailPassRequiredValidator } = require("../middleware/emailPasswordRequiredValidator.js");
const { passwordValidator } = require("../middleware/passwordValidator.js");



userRouter.post("/signup",[emailPassRequiredValidator, emailValidator, passwordValidator], signupController);

userRouter.post("/login", [emailPassRequiredValidator, emailValidator, passwordValidator], loginController);



module.exports = { userRouter };