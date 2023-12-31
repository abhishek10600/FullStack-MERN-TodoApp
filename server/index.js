require("dotenv").config();
const app = require("./app.js");
const connectWithDatabase = require("./config/database.js");
const cloudinary = require("cloudinary").v2;

connectWithDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening at PORT ${PORT}...`);
})