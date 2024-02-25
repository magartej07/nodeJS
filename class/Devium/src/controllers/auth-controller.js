const User = require("../models/user");
const { register, login, verifyUser } = require("../services/auth-service");
const { sendVerificationEmail } = require("../services/user-service");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/Async-handeler");
const statusCode = require("../utils/statusCode");

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 */
const registerController = asyncHandler(async (req, res) => {
  // console.log(req.body)
  // res.send("Your are in register page")
  // try {
  //   // console.log(req.body)
  //   // const userData = await registerSchema.safeParseAsync(req.body)
  //   const response = req.body;
  //   console.log(req.body)
  //   const token = await register(response);
  //   res.status(201).json({
  //     token,
  //   });
  // res.json(userData)
  // } catch (error) {
  //   res.status(400).json({
  //     message: error.message,
  //     stack: error.stack, //to find error path
  //   });
  // }
  // no try catch used

  const avatar = req.file;
  if (!avatar) {
    throw new ApiError(statusCode.BAD_REQUEST, "avatar is required", [
      "avatar is required",
    ]);
  }
  const response = req.body;
  // console.log(req.body)
  const token = await register({
    ...response,
    avatar: avatar.path,
  });
  res.status(201).json(
    new ApiResponse(statusCode.CREATED, "user register", {
      token,
    })
  );
});

const loginController = async (req, res) => {
  //   res.send("Your are in login page");
  try {
    const response = req.body;
    const token = await login(response);
    res
      .status(statusCode.OK)
      .json(new ApiResponse(statusCode.OK, "Logged in", { token }));
  } catch (error) {
    res.status(400).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

const currentUserController = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFromDb = await User.findById(user._id).select("-password -verificationToken -resetToken")
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "Wow you are logged in", userFromDb));
});

const verifyUserController = asyncHandler(async (req, res) => {
  const user = req.user;

  const { token } = req.body;
  await verifyUser({ token, email: user.email });
  return res
    .status(statusCode.OK)
    .json(new ApiResponse(statusCode.OK, "User verification ok"));
});

const resendVerificationEmailController = asyncHandler(async(req,res)=>{
  const user = req.user
  const email = user.email
  const name = user.name
  await sendVerificationEmail({
    name,
    email,
  })
  return res.status(statusCode.OK).json(new ApiResponse(statusCode.OK, "Verification email sent successfully"))
})


module.exports = {
  registerController,
  loginController,
  currentUserController,
  verifyUserController,
  resendVerificationEmailController,
};
