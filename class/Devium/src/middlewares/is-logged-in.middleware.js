const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const userAttachMiddleware = require("./User.middleware");

const isLoggedIn = (req, res, next) => {
  //    return  res.json(req.headers)
  return userAttachMiddleware(req, res, () => {
    if (req.user  || req.user !== undefined) {
      next();
    } else {
      next(new ApiError(statusCode.UNAUTHORIZED, "You are not logged in"));
    }
  });
};

module.exports = isLoggedIn;
