const mongoose = require("mongoose");

const connectWithDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        console.log("Connected with database successfully")
    ).catch(error => {
        console.log("Database connection failed");
        console.log(error);
        process.exit(1);
    })
}

module.exports = connectWithDatabase;