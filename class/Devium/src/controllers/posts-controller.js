const {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPost,
  reactOnPost,
  unReactOnPost,
} = require("../services/posts-service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/Async-handeler");
const statusCode = require("../utils/statusCode");

const createPostController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(statusCode.BAD_REQUEST, "Thumbnail is required");
  }
  const response = req.body;
  const post = await createPost({
    ...response,
    thumbnail: req.file.path,
    userId: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(statusCode.CREATED, "Post created", post));
});

const deletePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await deletePost(id);
  req.user._id;
  res.status(200).json(new ApiResponse(statusCode.OK, "Post deleted", post));
});

const getPostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await getPost(id);
  res.status(200).json(new ApiResponse(statusCode.OK, "Post fetched", post));
});

const reactOnPostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await reactOnPost(id);
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "Reaction on post", post));
});

const unReactOnPostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await unReactOnPost(id);
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "unReaction on post", post));
});

const updatePostController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = req.body;
  const post = await updatePost(id, req.user._id, response);
  res.status(200).json(new ApiResponse(statusCode.OK, "Post updated", post));
});

const getAllPostController = asyncHandler(async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    status = "published",
    q,
  } = req.query;

  const posts = await getAllPosts({
    page,
    perPage,
    sortBy,
    status,
    q,
  });
  res.status(200).json(new ApiResponse(statusCode.OK, "All Post", posts));
});

module.exports = {
  createPostController,
  deletePostController,
  updatePostController,
  getAllPostController,
  getPostController,
  reactOnPostController,
  unReactOnPostController,
};
