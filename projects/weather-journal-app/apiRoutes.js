import Weather from "./lib/weather.js";
import express from "express";

// an instance of express router
const app = express.Router();

// required to parse form json data
app.use(express.json());

const projectData = [];


/**
 * Get current weather from weather map API
 */
app.get("/currentWeather", function (req, res) {
  res.setHeader("content-type", "application/json");
  const { zip } = req.query;
  const data = Weather.getWeather(zip);
  data.then(
    (response) => {
      res.send(response);
    },
    (e) => {
      res.json({ error: e.message });
    }
  );
});

// Respond with JS object when a GET request is made to the homepage
app.get("/projects", function (req, res) {
  res.setHeader("content-type", "application/json");
  res.send(projectData);
});

/**
 * Record user response and store it in projectdata
 */
app.post("/projects", function (req, res) {
  const { temprature, date, user_response } = req.body;
  res.setHeader("content-type", "application/json");
  try {
    Weather.validateInputs(req.body);
    const weather = new Weather(req.body);
    projectData.push(weather);

    res.send(weather);
  } catch (e) {
    res.json({ error: e.message });
  }
  // res.send(projectData);
});

export default app;
