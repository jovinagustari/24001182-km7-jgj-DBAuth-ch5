const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCarType,
  validateGetCarTypeById,
  validateCreateCarType,
  validateUpdateCarType,
  validateDeleteCarType,
} = require("../middlewares/carTypes.js");
const {
  getCarType,
  createCarType,
  updateCarType,
  deleteCarTypeById,
} = require("../controllers/carTypes.js");
const { getCarTypeById } = require("../controllers/carTypes.js");
const { adminRole, userRole } = require("../constants/auth");


const router = express.Router();

// It will be run the URL based on path and the method
router
    .route("/")
    .get(
      authorization(adminRole, userRole), 
      validateGetCarType, 
      getCarType
    )
    .post(authorization(adminRole), validateCreateCarType, createCarType);

router
    .route("/:id")
    .get(
      authorization(adminRole, userRole),
      validateGetCarTypeById, 
      getCarTypeById
    )
    .put(authorization(adminRole), validateUpdateCarType, updateCarType)
    .delete(authorization(adminRole), validateDeleteCarType, deleteCarTypeById);

module.exports = router;
