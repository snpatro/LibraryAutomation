const express = require("express");
const router = express.Router();
const db = require("../models");

//create new books
router.post("/addNewBook",(req,res,next)=>{
    const {title, barcode, subject}=req.body.createBook;
    if(!title) {
        return res.send({
             success: false,
             message: "Enter Title of the book"
         })
    }
    if(!barcode) {
        return res.send({
             success: false,
             message: "Enter barcode"
         })
    }
    if(!subject) {
        return res.send({
             success: false,
             message: "Enter genre Name"
         })
    }
     db.Book.find({
        barcode:barcode
    }, (err, exBook) =>{
        if(err){
            return res.send({
                Error: "Server Error"
            });
        }
        else if(exBook.length > 0){
            return res.send({
                Error: "Book Already Exist"
            });
        }
})
        const newBook = new db.Book();
        newBook.title=title;
        newBook.subject=subject;
        newBook.barcode=barcode;
        newBook.save((err) =>{
            if(err){
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Book Not Created'
                })
            }
            
            res.send({
                newBook,
                message:'Book added to library',
                success:true
            })
        })
});


// get all books

router.get("/getAll", (req,res)    =>  {
    db.Book.find({},(err,books)=>{
        if(err){
            return res.send({
                Error:"Books not found"
            })
        }
        res.send({
            books,
            success:true,
            message:"Books Found"
        })
    })
})
//get subjects wise books

router.get("/getAll/:subject",(req,res)=>{
    db.Book.find({subject:req.params.subject},(err,books)=>{
        if(err){
            console.log(err);
            return res.send({Error:"cannot find any books"})
        }
        res.send({
            books
        })
    })
})

module.exports=router;