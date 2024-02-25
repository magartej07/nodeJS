const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        username:{
            type:String,
            require:true,
            unique:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
        },
        password:{
            type:String,
            require:true,
        },
        avatar:{
            type:String,
            require:true,
        },
        verifiedAt:{
            type:Date,
            default:null,
        },
        verificationToken:{
            type:String,
            default:null,
        },
        resetToken:{
            type:String,
            default:null,
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user",
        },
      
    },
    {
        timestamps:true,
    }
)


const user = mongoose.model("User", userSchema)
module.exports = user