const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const isLoggedIn = require("./is-logged-in.middleware");

const isAdmin = (req, res, next) => {
  return isLoggedIn(req, res, () => {
    console.log("logged in:user",req.user);
    if (req.user.role === "admin") {
      next();
    } else {
      next(
        new ApiError(
          statusCode.FORBIDDEN,
          "You are not authorized to access this route"
        )
      );
    }
  });
};

module.exports = isAdmin;
