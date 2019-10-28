const express = require("express");
const router = express.Router();
const db = require("../models");

//create new books
router.post("/addNewBook",(req,res,next)=>{
    const {name, barcode, row, column, genre}=req.body.createBook;
    if(!name) {
        return res.send({
             success: false,
             message: "Enter Name of the book"
         })
    }
    if(!barcode) {
        return res.send({
             success: false,
             message: "Enter barcode"
         })
    }
    if(!row) {
        return res.send({
             success: false,
             message: "Enter row number"
         })
    }
    if(!column) {
        return res.send({
             success: false,
             message: "Enter column Number"
         })
    }
    if(!genre) {
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
                Error: "Email Already Exist"
            });
        }
})
        const newBook = new db.Book();
        newBook = {name, barcode, row, column, genre};
        newBook.save((err) =>{
            if(err){
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Book Not Created'
                })
            }
            let { _id, name, status,row,column,genre,issuer,barcode}= newBook;
            res.send({
                _id,
                name, 
                status,
                row,
                column,
                genre,
                issuer,
                barcode,
                mesage:'Book added to library',
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

module.exports=router;