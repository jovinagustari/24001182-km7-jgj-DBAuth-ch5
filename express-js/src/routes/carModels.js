const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCarModel,
  validateGetCarModelById,
  validateCreateCarModel,
  validateUpdateCarModel,
  validateDeleteCarModel,
} = require("../middlewares/carModels");
const {
  getCarModel,
  getCarModelById,
  createCarModel,
  updateCarModel,
  deleteCarModel,
} = require("../controllers/carModels");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCarModel, getCarModel)
  .post(authorization(adminRole), validateCreateCarModel, createCarModel);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetCarModelById, getCarModelById)
  .put(authorization(adminRole), validateUpdateCarModel, updateCarModel)
  .delete(authorization(adminRole), validateDeleteCarModel, deleteCarModel);
module.exports = router;
