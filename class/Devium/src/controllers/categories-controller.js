const {
  createCategory,
  verifyCategory,
  deleteCategory,
  updateCategory,
  getAllCategorry,
} = require("../services/categories-service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/Async-handeler");
const statusCode = require("../utils/statusCode");

const createCategoryController = asyncHandler(async (req, res) => {
  const response = req.body;
  const category = await createCategory(response);
  res
    .status(201)
    .json(new ApiResponse(statusCode.CREATED, "Category created", category));
});

const verifyCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await verifyCategory(id);
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "Category verified", category));
});

const deleteCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await deleteCategory(id);
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "Category deleted", category));
});

const updateCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = req.body
  const category = await updateCategory(id,response);
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "Category updated", category));
});

const getAllCategoryController = asyncHandler(async (req, res) => {
 
  const categories = await getAllCategorry();
  res
    .status(200)
    .json(new ApiResponse(statusCode.OK, "All Category", categories));
});



module.exports = {
  createCategoryController,
  verifyCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getAllCategoryController,
};
