import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // after succesfull upload of file
    // console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // remove the locally save temp file when upload operation fails
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
