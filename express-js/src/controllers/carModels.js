const carService = require("../services/carModels");
const { successResponse } = require("../utils/response");

exports.getCarModel = async (req, res, next) => {
  const data = await carService.getCarModel(req.query?.manufacturer);

  successResponse(res, data);
};

exports.getCarModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get student by id
  const data = await carService.getCarModelById(id);
  successResponse(res, data);
};

exports.createCarModel = async (req, res, next) => {
  const data = await carService.createCarModel(req.body);

  successResponse(res, data);
};

exports.updateCarModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await carService.updateCarModel(id, req.body);
  successResponse(res, data);
};

exports.deleteCarModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await carService.deleteCarModel(id);
  successResponse(res, data);
};
 