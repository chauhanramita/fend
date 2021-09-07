import { isEmpty, zip } from "lodash-es";
import moment from "moment";

/**
 * Weather class
 */
export default class Weather {

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
}
