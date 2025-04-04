require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
res.send("<h1>Hello World</h1>");
})

app.use('/api/v1',userRoute);


const PORT = process.env.PORT || 5000;

const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(error){
        console.log(error);
    }
}

start();






