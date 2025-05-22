const mongoose = require("mongoose");
const User = require("./user");
const Review = require("./review")


const bookSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    publishedAt : {
        type : Date,
        default : Date.now
    },
    image: {
        type : String
    },
    price:{
        type : Number ,
        required : true
    },
    postedBy :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
    author :  {
        type : String
    } ,
    review :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }]

})

const Book = mongoose.model("book" , bookSchema);

module.exports = Book;