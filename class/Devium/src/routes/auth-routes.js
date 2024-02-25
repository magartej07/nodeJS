const {
  loginController,
  registerController,
  currentUserController,
  verifyUserController,
  resendVerificationEmailController,
} = require("../controllers/auth-controller");
const isLoggedIn = require("../middlewares/is-logged-in.middleware");
const schemaValidator = require("../middlewares/schema-validator");
const loginSchema = require("../schemas/login-schema");
const registerSchema = require("../schemas/register-schema");
const multer = require("multer");
const upload = require("../utils/Multer");
const verifyUserSchema = require("../schemas/verify-user-schema");
const userAttachMiddleware = require("../middlewares/User.middleware");


const router = require("express").Router();

router.post("/login", schemaValidator(loginSchema), loginController);
router.post("/register",upload.single("avatar"), schemaValidator(registerSchema), registerController);
router.get("/me",isLoggedIn ,currentUserController)
router.post("/verify",isLoggedIn ,schemaValidator(verifyUserSchema),verifyUserController)
router.get("/resend-verification",isLoggedIn ,resendVerificationEmailController)




module.exports = router;




///npm i multer