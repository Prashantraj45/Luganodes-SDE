const express = require("express");
const homeRouter=express.Router();

const {checkUserAuth}=require('../middleware/checkUserAuth.js');
const { home } = require("../controller/userController.js");
homeRouter.get('/home',[checkUserAuth],home);
module.exports={homeRouter};