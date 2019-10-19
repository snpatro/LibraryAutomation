const db = require("../models");
const express =   require("express");
const router  =   express.Router();

 router.post("/userData",(req,res,next)   =>{
    db.User.find({},    (err,users)   => {
        if(err){
            res.send({
            success:false,
            message : 'user Not found'
        })
    }
        return res.send(users);
    } )
});
module.exports=router;