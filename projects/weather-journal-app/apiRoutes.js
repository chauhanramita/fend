import Weather from "./lib/weather.js";
import express from "express";
import { encode } from "html-entities";

// an instance of express router
const app = express.Router();

// required to parse form json data
app.use(express.json());

const projectData = {};

// Respond with JS object when a GET request is made to the homepage
app.get("/projects", function (req, res) {
  res.setHeader("content-type", "application/json");
  res.send(projectData);
});

/**
 * Record user response and store it in projectdata
 */
app.post("/projects", function (req, res) {
  const { temperature, date, user_response } = req.body;
  res.setHeader("content-type", "application/json");
  try {
    Weather.validateInputs(req.body);
    projectData[date] = {
      temperature,
      date,
      user_response: encode(user_response),
    };

    res.send(projectData[date]);
  } catch (e) {
    res.json({ error: e.message });
  }
  // res.send(projectData);
});

export default app;
