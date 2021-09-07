import { isEmpty, zip } from "lodash-es";
import moment from "moment";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { encode } from "html-entities";

// weather map related constants
const WEATHER_MAP_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_MAP_APP_ID = "f42174352bae921a80d52d1c96aa8849";

/**
 * Weather class
 */
export default class Weather {
  // initialize weather object and if key is missing than buit key = uuid
  constructor({ temperature, date, user_response, keyName }) {
    this.temperature = temperature;
    this.date = date;
    this.user_response = encode(user_response);
    this.key = keyName || uuidv4();
  }

  /**
   * Static method to validate Weather form data
   * @param {formData = {temperature, date, user_response}} param0
   * @returns
   */
  static validateInputs({ temperature, date, user_response }) {
    const errors = [];

    if (isEmpty(`${temperature}`)) {
      errors.push("Temperature cannot be left blank");
    }
    if (isEmpty(`${date}`)) {
      errors.push("Date cannot be left blank");
    } else {
      const dt = moment(date);
      if (!dt.isValid()) {
        errors.push("Unable to parse date");
      }
    }

    if (isEmpty(user_response)) {
      errors.push("Use Response cannot be left blank");
    }
    if (isEmpty(errors)) {
      return true;
    }
    throw new Error(errors);
  }

  /**
   * get zip code and call weather map URL to read current weather
   * @param {String} zip
   * @returns Promise
   */
  static getWeather(zip) {
    return fetch(
      `${WEATHER_MAP_API_URL}?${new URLSearchParams({
        zip: zip,
        appid: WEATHER_MAP_APP_ID,
        units: "imperial",
      }).toString()}`
    ).then((res) => res.json());
  }
}
