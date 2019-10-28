const express =   require("express");
const router  =   express.Router();
const db = require("../models");
//user verify user
router.put("/verify", (req, res, next) => {
    db.User.findOneAndUpdate({_id: req.params.userId}, {$set:{isVerified:true}}, {new: true}, (err, user) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error Updating'
            })
        }
        else{
            console.log(user)
            return res.send({
            success: true,
            message: 'Account Verified',
            user:user
        })}
        
    })
});
//update user data
router.put("/user/:userId", (req, res, next) => {

    db.User.findOneAndUpdate({_id: req.params.userId}, req.body.User, {new: true} , (err, user) => {
        console.log(req.body.User)
        if(err) {
            console.log(err)
            return res.send({
                success: false,
                message: 'Error Updating'
            })
        }
        return res.send({
            success: true,
            message: 'Account Updated',
            user:user
        })
    })
});
//change password
router.put("/changePassword", (req, res, next) => { 
    db.User.findOneAndUpdate({username: req.body.username},{$set:{password:generateHash(password)}} ,{new: true}, (err, user) => {
        if(err) {
            console.log("error: "+err)
            return res.send({
                success: false,
                message: 'error updating password'
            })
        }
        return res.send({
            success: true,
            message: "password changed"
        })
    })
});

module.exports= router;