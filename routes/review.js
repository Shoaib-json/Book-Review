const express = require("express");
const router =  express.Router();
const Review = require("../models/review");
const Book = require("../models/book")
const auth = require("../utils/middleware");


router.post("/:id", auth, async (req, res) => {
  let { comment, rating } = req.body;

  const q = new Review({
    comment: comment,
    rating: rating,
    user: req.user._id
  });

  await q.save();

  const book = await Book.findById(req.params.id);

  if (!book) {
    console.error("Book not found for ID:", req.params.id);
    return res.status(404).send("Book not found");
  }

  book.review.push(q._id); 
  await book.save();

  console.log(book);
  console.log(q);

  res.redirect(`/books/${req.params.id}`);
});


router.delete("/:id/:reviewId" , async(req,res)=>{
    let {id , reviewId}= req.params;
    await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a)
    res.redirect(`/books/${id}`);
    
})

module.exports = router ;