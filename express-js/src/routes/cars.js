const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCars,
  validateGetCarsById,
  validateCreateCars,
  validateUpdateCars,
  validateDeleteCars,
} = require("../middlewares/cars.js");
const {
  getCars,
  createCars,
  updateCars,
  deleteCarsById,
} = require("../controllers/cars.js");
const { getCarsById } = require("../controllers/cars.js");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCars, getCars)
  .post(authorization(adminRole), validateCreateCars, createCars);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetCarsById, getCarsById)
  .put(authorization(adminRole), validateUpdateCars, updateCars)
  .delete(authorization(adminRole), validateDeleteCars, deleteCarsById);

module.exports = router;
