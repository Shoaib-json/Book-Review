const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();



cloudinary.config({
    cloud_name :process.env.CLOUDNAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Books',
      allowedFormats: ["png" , " jpeg" , "jpg"], 
    },
  });

  module.exports = {
    cloudinary,
    storage
  }