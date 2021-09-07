// Setup empty JS object to act as endpoint for all routes
import express from "express";
import cors from "cors";
import routes from "./apiRoutes.js";
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// const bodyParser = require("body-parser");

const app = express();

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder
 
app.use("/api", routes);
app.use(express.static("website"));

const port = 8000;

app.listen(port, () => {
  console.log("server running");
  console.log(`running on http://localhost:${port}`);
});
