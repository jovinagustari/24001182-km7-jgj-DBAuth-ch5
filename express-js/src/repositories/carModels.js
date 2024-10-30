const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCarModel = async (manufacturer) => {
  // Construct the where clause
  const query = {};
  if (manufacturer) {
    query.manufacturer = { contains: manufacturer, mode: "insensitive" };
  }

  // Find by query
  const searchedCarModel = await prisma.car_models.findMany({
    where: query,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModel = JSONBigInt.stringify(searchedCarModel);
  return JSONBigInt.parse(serializedCarModel);
};

exports.getCarModelById = async (id) => {
  const carModel = await prisma.car_models.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModel = JSONBigInt.stringify(carModel);
  return JSONBigInt.parse(serializedCarModel);
};

exports.createCarModel = async (data) => {
  const newCarModel = await prisma.car_models.create({
    data: {
      ...data,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModel = JSONBigInt.stringify(newCarModel);
  return JSONBigInt.parse(serializedCarModel);
};

exports.updateCarModel = async (id, data) => {
  const updatedCarModel = await prisma.car_models.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModel = JSONBigInt.stringify(updatedCarModel);
  return JSONBigInt.parse(serializedCarModel);
};

exports.deleteCarModel = async (id) => {
  const deletedCarModel = await prisma.car_models.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarModel = JSONBigInt.stringify(deletedCarModel);
  return JSONBigInt.parse(serializedCarModel);
};
