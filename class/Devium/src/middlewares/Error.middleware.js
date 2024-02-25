const { Mongoose, MongooseError } = require("mongoose")
const ApiError = require("../utils/ApiError")

const errorHandler = (err,req,res,next)=>{
    let error =err
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof MongooseError ? 400 :500
        const message = error.message || "something went error"
        error = new ApiError(statusCode,message,[],error.stack)
    }

    const response= {
        ...error,
        message:error.message,
        ...(process.env.NODE_ENV === "development")?{
            stack:error.stack,
        }
        :{},
    }

    res.status(error.statusCode).json(response)
}


module.exports= errorHandler