const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true,
    },
    user :{
        type : String ,
        required : true 
    },
    password :{
        type : String ,
        required : true
    }
})

const User = new mongoose.model('User' , userSchema);

module.exports = User;
