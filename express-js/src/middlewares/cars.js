const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  const carValidationSchema = z.object({
    capacity: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Capacity must be a positive number",
      }),
  });

  const parsed = carValidationSchema.safeParse(req.query);

  if (!parsed.success) {
    throw new BadRequestError(parsed.error.errors);
  }

  next();
};

exports.validateGetCarsById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateCreateCars = (req, res, next) => {
  console.log(req.body);

  const validateBody = z.object({
    plate: z
      .string(),
      // .trim()
      // .regex(/^[A-Z]{3}-\d{4}$/, {
      //   message: "Plate must be in the format 'ABC-1234'",
      // }),
    car_model_id: z
      .string(),
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val > 0, {
      //   message: "Cars Model must be a positive integer",
      // }),
    rentPerDay: z
      .string(),
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val > 0, {
      //   message: "Rent per day must be a positive integer",
      // }),

    availableAt: z.string(),
    // .refine(
    //   (date) => {
    //     const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    //     return datePattern.test(date) && !isNaN(Date.parse(date));
    //   },
    //   {
    //     message: "Available date must be in the format YYYY-MM-DD",
    //   }
    // ),

    available: z
      .string(),
      // .transform((val) => val.toLowerCase() === "true")
      // .refine((val) => val === true || val === false, {
      //   message: "Available must be 'true' or 'false'",
      // }),
    year: z
      .string(),
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val >= 1886, {
      //   message: "Year must be a valid automobile year",
      // }),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  const validateFileBody = z
  .object({
    image: z
      .object({
        name: z.string(),
        data: z.any(),
      })
      .nullable()
      .optional(),
  })
  .nullable()
  .optional();

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

    // Convert to car data format
    req.body = {
      ...req.body,
      rentPerDay: parseInt(req.body["rentPerDay"]) || null, // Convert to number or null if invalid
      availableAt: new Date(req.body["availableAt"]),
      year: parseInt(req.body["year"]) || null,
      available: req.body["available"] === "true", // Convert string to boolean
  };

  next();
};

exports.validateUpdateCars = (req, res, next) => {
  const validateSchema = z.object({
    id: z.string(),
  });

  validateSchema.safeParse(req.params);
  const result = validateSchema.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  const validateBody = z.object({
    plate: z
      .string()
      // .trim()
      // .regex(/^[A-Z]{3}-\d{4}$/, {
      //   message: "Plate must be in the format 'ABC-1234'",
      // })
      .optional(),

    car_model_id: z
      .string()
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val > 0, {
      //   message: "Rent per day must be a positive integer",
      // })
      .optional(),
    rentPerDay: z
      .string()
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val > 0, {
      //   message: "Rent per day must be a positive integer",
      // })
      .optional(),
    availableAt: z
      .string()
      // .refine(
      //   (date) => {
      //     const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      //     return datePattern.test(date) && !isNaN(Date.parse(date));
      //   },
      //   {
      //     message: "Available date must be in the format YYYY-MM-DD",
      //   }
      // )
      .optional(),
    available: z
      .string()
      // .min(1, { message: "Available cannot be empty" }) // Validasi untuk input kosong
      // .refine(
      //   (val) => val.toLowerCase() === "true" || val.toLowerCase() === "false",
      //   {
      //     message: "Available must be 'true' or 'false'",
      //   }
      // )
      // .transform((val) => val.toLowerCase() === "true")
      .optional(),
    year: z
      .string()
      // .trim()
      // .transform((val) => parseInt(val, 10))
      // .refine((val) => !isNaN(val) && val >= 1886, {
      //   message: "Year must be a valid automobile year",
      // })
      .optional(),
  });

  //Validasi
  const result2 = validateBody.safeParse(req.body);
  if (!result2.success) {
    throw new BadRequestError(result2.error.errors);
  }

  const validateFileBody = z
    .object({
      profilePicture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteCars = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};
