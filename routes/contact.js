var nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();

router.post('/contact/send', (req, res) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const subject = req.body.subject;
    let account = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        ignoreTLS: true,
        requireTLS: false,
        auth: {
            user: 'mishra.subham134@gmail.com', // generated ethereal user
            pass: 'jarvis1304' // generated ethereal password
        }
    });

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: "mishra.subham134@gmail.com", // sender address
        to: 'subhamrajpathy@gmail.com', // list of receivers
        subject: "Query", // Subject line // plain text body
        html: `<p>From: ${email}. Name: ${fname} ${lname}. Subject: ${subject}</p>` // html body
    };

    // send mail with defined transport object
    let info = transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: 'fail'
            })
        } else {
            console.log('sent')
            res.json({
                success: true,
                msg: 'success'
            })
        }
    })

})

module.exports= router;