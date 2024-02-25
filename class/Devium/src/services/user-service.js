const User = require("../models/user");
const argon2 = require("argon2");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const { sendMail } = require("./mail-service");
const path = require("path")
const fs = require("fs")
const hbs = require("handlebars")

const createUser = async (userData) => {
  console.log(userData);
  try {
    const hashedPassword = await hashPassword(userData.password);
    // const verificationToken = generateToken();
    const user = new User({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      username: userData.username,
      avatar: userData.avatar,
      // verificationToken: verificationToken,
    });
    await user.save();
    return user.toObject();
  } catch (error) {
    // console.error("error", error.message);
    if (error.code=== 11000){
      throw new ApiError(statusCode.CONFLICT,"Username already in use")
    }
    // throw new Error("error", error.message);
    throw new Error(error)
  }
};

const generateVerificationToken = async ({ email }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const token = generateToken();
  await User.findByIdAndUpdate(user._id, {
    verificationToken: token,
  });
  return token;
};

const sendVerificationEmail = async ({
  name, email
}) => {
  // const link =
  const token = await generateVerificationToken({email});
  const emailTemplateFilePath = path.join(__dirname,"../templates/verify-email.hbs")
  const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
  const hbsHtml = hbs.compile(hbsContent)
  const html = hbsHtml({
    name,
    token,
  })
  return sendMail({
    to: email,
    subject: "verified your email",
    html,
  });
};

const sendWelcomeEmail = async({
  name,email
})=>{
  const emailTemplateFilePath = path.join(__dirname,"../templates/welcome-email.hbs")
  const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
  const hbsHtml = hbs.compile(hbsContent)
  const html = hbsHtml({
    name
  })
  return sendMail({
    to: email,
    subject: "welcome email from devium",
    html,
  });
}

const findUserByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

const getUser = (user) => {
  const { password, verificationToken, resetToken, ...rest } = user;
  return rest;
};

const generateToken = () => {
  return Math.random().toString(36).substring(2, 8);
};

const hashPassword = async (password) => {
  return argon2.hash(password);
};

const verifyUserPassword = async (password, hashedPassword) => {
  return argon2.verify(hashedPassword, password);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUser,
  verifyUserPassword,
  sendVerificationEmail,
  sendWelcomeEmail,
};
