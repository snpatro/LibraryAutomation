const express =   require("express");
const router  =   express.Router();
const db = require("../models");

router.put("/verify/:userId", (req, res, next) => {
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

router.put("/userdata/:userId", (req, res, next) => {//depends on frontend
    console.log(req.params.userId)
    let ival= req.body.selectedap;
    // let ival= [1,2,3,4,5];
    
    db.User.findOneAndUpdate({_id: req.params.userId}, {$set:{apAccess:ival}}, {new: true}, (err, user) => {
        if(err) {
            console.log("error: "+err)
            return res.send({
                success: false,
                message: 'Error Granting Access'
            })
        }
        // console.log(apAccess+"  granted access to these action plans");
        return res.send({
            success: true,
            message: "Access provided as requested"
        })
    })
});

module.exports= router;