const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const auth =require("../utils/middleware");
const multer  = require('multer');
const {storage} = require("../cloudconfig"); 
const upload = multer({ storage });


router.get("/books" ,async(req,res) =>{
    let q = await Book.find()
    res.render("books" , {q})
});

router.get("/search", async (req, res,next) => {
    try {
        const { search } = req.query;
    
        if (!search) {
            return res.render("../listing/notfound.ejs");
        }
        const q = await Book.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }]
        });
        
        res.render("./books", { q });

    } catch (err) {
        next( err);  
    }
});



router.get("/upload" ,auth , (req,res) =>{
    res.render("upload")
})

router.post("/books" , auth , upload.single("image") ,async (req ,res) =>{
  let {name , author , category , description , price } = req.body;
  const q = new Book ({
    name,
    author,
    category,
    description,
    price,
    image : req.file.path,
    postedBy : req.user.id
  });

  await q.save();
  console.log(q);
  res.redirect(`/books/${q._id}`);
});

router.get("/books/:id" , async (req,res) =>{
    let lists = await Book.findById(req.params.id)
   .populate({
    path: 'review',
    populate: {
      path: 'user'
    }
  });

  res.render('show.ejs', { lists });
})


module.exports  = router ;