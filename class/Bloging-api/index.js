const express = require("express"); //multer
const { connectToDb } = require("./utils/db.js");
const Post = require("./modules/Post.model.js");
const { registerUser, loginUser, me } = require("./Controllers/auth.controller.js");
const injectUser = require("./middleware/injectUser.js");
const isLoggedIn = require("./middleware/isLoggedin.js");
// const secret = require('mySecret')

const app = express(); //create  new instnce of express

app.use(express.json()); // middleware to parse json use "use" key word

app.use(injectUser)

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/posts", async (req, res) => {
  const data = req.body;
  try {
    const newPost = new Post({
      title: data.title,
      content: data.content,
      featuredImg: data.featuredImg,
    });
    await newPost.save(); //to save data in db
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

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

app.get("/posts/:id",async(req,res)=>{ //to get output by id
  try{
    const {id} = req.params;
    const post = await Post.findById(id); 

    if(!post){
      return res.status(404).json(
       {message: "Post not found",}
      )
    }
    res.status(200).json(post)
    // res.status(200).json(post)
  }
  catch(e){
    res.status(500).json({
      message: e.message,
    });
  }

})


app.patch("/posts/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const data = req.body;
    const post = await Post.findByIdAndUpdate(id,data);
    const updatePost = await Post.findById(id); //to see updateone  in same time
    if(!post){
      return res.status(404).json(
       {message: "Post not found",}
      )
    }
    res.status(200).json(updatePost)
    // res.status(200).json(post)
  }
  catch(e){
    res.status(400).json({
      message: e.message,
    });
  }

})

//to delete
app.delete("/posts/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const post = await Post.findByIdAndDelete(id);//to see updateone  in same time
    if(!post){
      return res.status(404).json(
       {message: "Post not found",}
      )
    }
    res.status(200).json(post)
    // res.status(200).json(post)
  }
  catch(e){
    res.status(400).json({
      message: e.message,
    });
  }

})


// auth routs
app.post('/auth/register',registerUser)
app.post('/auth/login',loginUser)
// app.get('/auth/me',injectUser,me)
app.get('/auth/me',isLoggedIn,me)


// listern for request
app.listen(3000, () => {
  connectToDb();
  console.log("server is litening on port 3000");
});
