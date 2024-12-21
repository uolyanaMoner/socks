// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// cloudinary.config({
//   cloud_name: "dud2xcn2l",
//   api_key: "759584591321217",
//   api_secret: "T-DNZyiEQoZWpsmhpas43vUVwcA",
// });

// const storage = new multer.memoryStorage();

// async function imageUploadUtil(file) {
//   const result = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });

//   return result;
// }

// const upload = multer({ storage });

// module.exports = { upload, imageUploadUtil };

const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

async function uploadToCloudinary(file) {
  return await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
}

module.exports = { upload, uploadToCloudinary };
