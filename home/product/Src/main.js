const dotenv =require("dotenv")
dotenv.config();
const express = require("express");
const connectToDb = require("./Utils/db");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log("server is running in port", PORT)
    connectToDb();
})