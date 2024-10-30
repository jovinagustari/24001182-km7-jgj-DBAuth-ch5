const express = require("express");
const authRouter = require("./auth");
const carsRouter = require("./cars");
const carTypesRouter = require("./carTypes");
const carModelsRouter = require("./carModels");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cars", carsRouter);
router.use("/types", carTypesRouter);
router.use("/models", carModelsRouter);

module.exports = router;
