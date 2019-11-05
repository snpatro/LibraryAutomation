const db = require("../models");
const jwt = require("jsonwebtoken");
// var nodemailer = require('nodemailer');
//signup student, only for desktop
exports.signup = (req, res) => {
    // const { body } = req;
    // console.log(body);
    const { Name, email, password, username, department } = req.body.registerUser;
    if(!Name) {
        return res.send({
             success: false,
             message: "Enter Name"
         })
     }
    if(!email) {
        return res.send({
            success: false,
            message: "Enter Email"
        })
    }
    if(!password) {
        return res.send({
            success: false,
            message: "Enter Password"
        })
    }
    if(!username) {
        return res.send({
            success: false,
            message: "Enter Username"
        })
    }
    if(!department) {
        return res.send({
            success: false,
            message: "Enter Department"
        })
    }
    //Check If User Exists
    db.User.find({
        email: email
    }, (err, previousUser) =>{
        if(err){
            return res.send({
                Error: "Server Error"
            });
        }
        else if(previousUser.length > 0){
            return res.send({
                Error: "Email Already Exist"
           });
    }

        //Save The New User
        const newUser = new db.User();
        newUser.email = email;
        newUser.Name = Name;
        newUser.username = username;
        newUser.department = department;
        newUser.password = newUser.generateHash(password);
        newUser.save((err) => {
            if(err){
                console.log(err)
                return res.send({
                    success: false,
                    message: 'User Not Created'
                })
            }

            let { _id,  email, Name, username, department, isAdmin, isVerified, proPic, inventory, fee} = newUser;
            let token = jwt.sign({ _id,  email, Name, username, department, isAdmin, isVerified, proPic, inventory, fee }, 'THISISMYBIGSECRETHUHUHAHA');
            let signedUser={id: _id,
                Name,
                email,
                username,
                department,
                token,
                isAdmin,
                isVerified,
                proPic,
                inventory,
                fee}
            return res.send({
                success: true,
                message: 'User Created',
                signedUser
            })
        })
    })
}

exports.signin = (req, res) => {
    const { username, password } = req.body.user;
    if(!username) {
        return res.send({
            success: false,
            message: "Enter username/regdNo"
        })
    }
    if(!password) {
        return res.send({
            success: false,
            message: "Enter password"
        })
    }
    db.User.find({
        username: username
    }, (err, users) =>{
        if(err){
            return res.send({
               message: "Server Error",
            });
        }
        else if(users.length == 0){
            return res.send({
                message:'Email does not exist'
            })
        }
        else if(users.length > 0){
            let user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Invalid Password'
                });
            }
            else {
                let { _id, email, Name, username, department, isAdmin, isVerified, proPic,inventory,fee } = user;
                let token = jwt.sign({  _id, email, Name, username, department, isAdmin, isVerified, proPic, inventory, fee }, 'THISISMYBIGSECRETHUHUHAHA');
                let signedUser={id: _id,
                    Name,
                    username,
                    department,
                    token,
                    isAdmin,
                    isVerified,
                    proPic,
                    email,
                    inventory,
                    fee};
               return res.send({
                success: true,
                message: 'Sign In Ok',
                signedUser
             })
            }
           
        }
    })

}

// exports.verify = (req, res) => {
//     const email = req.body.email;
//     const id = req.body.id;
 
//     // create reusable transporter object using the default SMTP transport
   
//    let transporter = nodemailer.createTransport({
//      service:'gmail',
//      host: 'smtp.gmail.com',
//      port: 465,
//      secure: true, // true for 465, false for other ports
//      ignoreTLS:true,
//      requireTLS:false,
//      auth: {
//        user: 'mishra.subham134@gmail.com', // generated ethereal user
//        pass : 'jarvis1304' // generated ethereal password
//      }
//    });

//    transporter.verify((error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Server is ready to take messages');
//     }
//   });
 
//     // setup email data with unicode symbols
//     let mailOptions = {
//       from: "mishra.subham134@gmail.com", // sender address
//       to: email, // list of receivers
//       subject: "Account Verification", // Subject line // plain text body
//       html: `<p>Click Here To Verify Your Account</p><br><a data-method="put" href=http://localhost:3000/verify/${id}/>Click This Link To Verify</a>` // html body
//     };
  
  
// }