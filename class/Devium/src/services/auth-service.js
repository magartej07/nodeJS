const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const { sendMail } = require("./mail-service");
const {
  findUserByEmail,
  getUser,
  createUser,
  verifyUserPassword,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("./user-service");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  // console.log("regster", userData)

  const user = await findUserByEmail(userData.email);
  if (user) {
    throw new ApiError(statusCode.BAD_REQUEST,"User already exists","email already used");
  }
  const newUser = await createUser(userData);
  await sendVerificationEmail({
    name:userData.name,
    email:userData.email,
  })
  return generateJWT(newUser);
};

//ethereal

const verifyUser = async({token,email})=>{
  const user = await findUserByEmail(email)

  console.log({
    user, email, token
  })

  if(!user){
    throw new ApiError(statusCode.BAD_REQUEST,"User not found");
  }
  if(user.verifiedAt){
    throw new ApiError(statusCode.BAD_REQUEST,"User already verified");
  }
  if(user.verificationToken !== token){
    throw new ApiError(statusCode.BAD_REQUEST,"Invalid token");

  }
  const updateUser = await User.findByIdAndUpdate(user._id, {
    verifiedAt:new Date(),
  })
  await sendWelcomeEmail({
    name: updateUser.name,
    email: updateUser.email
  });
  return updateUser
}

// npm i zod jsonwebtoken

const generateJWT = (user) => {
  const userData = getUser(user);
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const verifyJWT = (token)=>{
  return jwt.verify(token,process.env.JWT_SECRET)
}


const login = async (userData) => {
  const user = await findUserByEmail(userData.email);
  if (!user) {
    throw new ApiError(statusCode.BAD_REQUEST,"User not found")
  }
  const isPasswordValid = await verifyUserPassword(
    userData.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const userObject = user.toObject()
  return generateJWT(userObject);
};

// for mail nodemailer

module.exports = {
  register,
  login,
  verifyJWT,
  verifyUser,
};
