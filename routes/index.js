const express =   require("express");
const router  =   express.Router();
const { signup, signin, verify }   =   require("./auth");
const  { userAccess }   =   require("./userData");

router.post("/signup",signup);
router.post("/signin",signin);
//router.post("/verify",verify);


module.exports= router;
