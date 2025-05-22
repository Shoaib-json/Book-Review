const express = require("express");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require('path');
const Book = require("./models/book");
const multer  = require('multer');
const {storage} = require("./cloudconfig"); 
const upload = multer({ storage });
const Review = require("./models/review");
const ejsMate = require("ejs-mate");
const auth = require("./utils/middleware")
const methodOverride = require("method-override");

const review = require("./routes/review")
const user = require("./routes/user");
const book = require("./routes/book")

require('dotenv').config();

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session({ secret: `${process.env.JWT_SECRET}`, resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

main()
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`);
  console.log("DB is connected");
}

app.use((req,res,next)=>{
    req.date = new Date();
    console.log(req.date,req.method , req.path);
    next();
});

app.use(auth , (req, res, next) => {
  res.locals.currUser = req.user?.username || null;
  next();
});

app.use("/user" , user);
app.use("/" , book);
app.use("/review" , review)

app.listen(8080 , ()=>{
    console.log("App is listening to the port 8080")
})