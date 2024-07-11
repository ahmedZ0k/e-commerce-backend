const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dscmyrqse",
  api_key: "275221993422486",
  api_secret: "02gz5e530VKe5nmYRwa-vz9UUwM",
});

const uploadImage = async (imagePath) => {
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
uploadImage(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
);
