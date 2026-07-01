const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED");
    }
    catch(err){
        console.log("Unable to Connect DB", err);
    }
};

module.exports = connectDB;