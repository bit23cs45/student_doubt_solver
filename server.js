const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Student Doubt Solver API is running");
});

app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log("1. Server Started at https://localhost:"+PORT);
    // console.log(`2. Server Started at https://localhost:${PORT}`);
});