const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const ApiError = require("../utils/ApiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    const type = file.mimetype.startsWith("image");
    if (type) {
      cb(null, true);
    } else {
      cb(new ApiError("only image allowed", 400));
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);

cloudinary.config({
  cloud_name: "dscmyrqse",
  api_key: "275221993422486",
  api_secret: "02gz5e530VKe5nmYRwa-vz9UUwM",
});

exports.uploadImageToCloudinary = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
