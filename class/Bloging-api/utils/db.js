const mongoose = require("mongoose")

const dbUrl = "mongodb://localhost:27017/bloggin-api"

const connectToDb = async () =>{
    try{ 
        await mongoose.connect(dbUrl)
        console.log("Connected to database")
    }
    catch(error){
        console.error("Error connected to db:",error)
    }
}

module.exports ={
    connectToDb
}