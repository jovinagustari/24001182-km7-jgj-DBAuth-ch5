const carModelRepository = require("../repositories/carModels.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");

exports.getCarModel = async (manufacturer) => {
  const carModel = await carModelRepository.getCarModel(manufacturer);

  if (carModel.length < 1) {
    throw new NotFoundError("Car Is Not Found");
  }

  return carModel;
};

exports.getCarModelById = async (id) => {
  const carModel = await carModelRepository.getCarModelById(id);
  if (!carModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  return carModel;
};

exports.createCarModel = async (data) => {
  return carModelRepository.createCarModel(data);
};

// exports.updateStudent = async (req, res, next) => {
//   // Get the id from params
//   const { id } = req.params;
//   const data = await studentService.updateStudent(id, req.body, req.files);
//   successResponse(res, data);
// };

exports.updateCarModel = async (id, data) => {
  const existingCarModel = await carModelRepository.getCarModelById(id);
  if (!existingCarModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  data = {
    ...existingCarModel, // existing Student
    ...data,
  };

  // if exist, we will update the student data
  const updatedCarModel = await carModelRepository.updateCarModel(id, data);
  if (!updatedCarModel) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedCarModel;
};

exports.deleteCarModel = async (id) => {
  // find student is exist or not (validate the data)
  const existingCarModel = await carModelRepository.getCarModelById(id);
  if (!existingCarModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  // if exist, we will delete the student data
  const deletedCarModel = await carModelRepository.deleteCarModel(id);
  if (!deletedCarModel) {
    throw new InternalServerError(["Failed to delete Car Model!"]);
  }

  return deletedCarModel;
};
