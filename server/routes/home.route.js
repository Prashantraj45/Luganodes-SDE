const express = require("express");
const homeRouter=express.Router();

const {checkUserAuth}=require('../middleware/checkUserAuth.js');
const { home,addcrypto} = require("../controller/userController.js");
homeRouter.get('/home',[checkUserAuth],home);
homeRouter.post('/addcrypto',addcrypto);
module.exports={homeRouter};