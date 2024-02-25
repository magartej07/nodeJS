const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const schemaValidator = (schema) => {
  return async (req, res, next) => {
    try {
    //   const data = await schema.safeParseAsync(req.body);
      const data = await schema.parse(req.body);
      req.body = data;
      next();
    } catch (e) {
      // res.status(400).json(e);
      next(new ApiError(statusCode.BAD_REQUEST,e)) 
    }
  };
};

module.exports = schemaValidator;
