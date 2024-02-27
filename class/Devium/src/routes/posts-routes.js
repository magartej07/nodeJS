const {
  getAllPostController,
  createPostController,
  deletePostController,
  updatePostController,
  reactOnPostController,
  unReactOnPostController,
} = require("../controllers/posts-controller");

const isLoggedIn = require("../middlewares/is-logged-in.middleware");
const schemaValidator = require("../middlewares/schema-validator");
const postSchema = require("../schemas/post-schema");
const upload = require("../utils/Multer");

const router = require("express").Router();

router.get("/", getAllPostController);
router.post(
  "/",
  upload.single("thumbnail"),
  isLoggedIn,
  schemaValidator(postSchema),
  createPostController
);
router.delete("/:id", isLoggedIn, deletePostController);
router.patch(
  "/:id",upload.single("thumbnail"),
  isLoggedIn,
  schemaValidator(postSchema),
  updatePostController
);
router.post("/:id/react", isLoggedIn, reactOnPostController);
router.delete("/:id/react", isLoggedIn, unReactOnPostController);

module.exports = router;
