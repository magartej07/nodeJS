// console.log("hi, i am server");
// npm i nodemon to run server automatic
const express = require("express");

const app = express();
const port = 3000;
const jobs = require("./data.json")
const mongoose = require("mongoose")
const {Blog} = require("./models/blog.model.js")


let dbUrl = "mongodb://localhost:27017/rangin-blogs"

const connectToDb = async()=>{
    try{
        await mongoose.connect(dbUrl)
        console.log("Connect to database")
    }
    catch (error){
        console.log(error)
    }
}

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.post("/blogs",async(req, res)=> {
    const userName = req.body
    const blog = new Blog(userData)
    const data = await blog.save()
    res.status(201).json(data)
})


app.listen(port, ()=> {
    console.log("hi, i am server");
    connectToDb()
})

// app.get("/jobs",(req,res)=>{
//     res.json(jobs)})

// app.listen(port, ()=> {
//     console.log("hi, i am server");
// })