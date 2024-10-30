const express = require("express"); // Import express
require("dotenv").config(); // To enable .env called
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors.js");

const app = express();
const port = process.env.PORT || 3000;

/* Enable CORS */
app.use(cors());

app.use(express.json());

// Buat routing dan response
app.get("/", (req, res) => {
  res.send("Ping Succesfully");
});

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/", router);
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);
// Running Aplikasi Express.js
app.listen(port, () => {
  console.log(`the express.js app is currently running on port ${port}`);
});
