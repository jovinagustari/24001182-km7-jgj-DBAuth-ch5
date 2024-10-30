const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCars = async (capacity) => {
  // Convert capacity to number if it is a string
  const numericCapacity = Number(capacity);
  // console.log("Numeric Capacity:", numericCapacity);

  const searchedCars = await prisma.cars.findMany({
    where: {
      car_models: {
        // Melakukan filtering berdasarkan capacity yang ada di car_types
        car_types: {
          capacity: {
            gte: numericCapacity,
          },
        },
      },
    },
    include: {
      car_models: {
        include: {
          car_types: true, // Include car_types untuk mendapatkan data capacity
        },
      },
    },
  });

  console.log(" serached cars:", searchedCars)
  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarsById = async (id) => {
  const carsFind = await prisma.cars.findFirst({
    where: {
      id: id,
    },
    include: {
      car_models: {
        include: {
          car_types: true,
        },
      },
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(carsFind);
  return JSONBigInt.parse(serializedCars);
};

exports.createCars = async (data) => {
  const newCars = await prisma.cars.create({
    data: {
      ...data, // Spread semua data dari request body ke sini
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(newCars);
  return JSONBigInt.parse(serializedCars);
};

exports.updateCars = async (id, data) => {
  const updatedCars = await prisma.cars.update({
    where: {
      id: id,
    },
    include: {
      car_models: {
        include: {
          car_types: true,
        },
      },
    },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(updatedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.deleteCarsById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: { id: id },
  });

  const serializedCar = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCar);
};
