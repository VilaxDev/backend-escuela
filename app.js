const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/route");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", cors(corsOptions), routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
