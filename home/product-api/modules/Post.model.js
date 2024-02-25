const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        description:{
            type:String,
            required: true,
        },
        price:{
            type:String,
            required: true,
        },
        brand:{
            type:String,
            required: true,
        },
        category:{
            type:String,
            required: true,
        },
        images:{
            type:String,
            required: true,
        }
    },
    {
        timestamps:true,
    }
)
const Post = mongoose.model("post",postSchema);
module.exports = Post