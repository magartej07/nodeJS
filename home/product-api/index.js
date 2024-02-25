const express = require("express");
const connectToDb = require("./utils/db");
const Post = require("./modules/Post.model.js")

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello i am server")
})

app.post("/posts",async(req,res)=>{
    const data = req.body;
    try{
        const newPost = new Post({
            title:data.title,
            description:data.description,
            price:data.price,
            brand:data.brand,
            category:data.category,
            images:data.images
        });
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(400).json({
            message:error.message,
        })
    }
})

app.get("/posts", async (req, res) => {
    try {
      const Posts = await Post.find({});
      res.status(200).json(Posts);
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  });


app.listen(3000,()=>{
    connectToDb();
    console.log("server is listening");
})