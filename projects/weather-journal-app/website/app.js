// Create a new date instance dynamically with JS
const API_BASE = "http://localhost:8000/api/";
const API_PROJECT_ENDPOINT = `${API_BASE}/projects`;
const API_CURRENT_WEATHER_ENDPOIT = `${API_BASE}/currentWeather`;

/**
 * Post user form with temprature to API to store in project data
 * @param {FormData} form 
 * @param {String} temprature 
 * @returns 
 */
function postUserData(form, temprature) {
  const data = {
    temperature: temprature,
    date: Date.now(),
    user_response: form.get("feelings"),
  };
  return fetch(API_PROJECT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

/**
 * read all project data
 * @returns undefined
 */
function fetchAllData() {
  return fetch(API_PROJECT_ENDPOINT)
    .then((res) => res.json())
    .then((res) => {
      const userresDiv = document.getElementById("entryHolder");
      const html = getUserWeatherLogHtml(res);
      userresDiv.innerHTML =
        html.length > 0
          ? html.join("")
          : ' <div class="title">Use form on the right side to log your weather Journal.</div>';
    });
}

/**
 * iterate on data and build html
 * @param {Array} data 
 * @returns [String]
 */
function getUserWeatherLogHtml(data) {
  return (data || []).map((x) => {
    const d = new Date(x.date);
    return `<div class="user-weather-log-row" id="${x.key}">
            <div class="post-title">
                <div class="temp">Temperature: ${x.temperature}F &nbsp;</div>
                <div class="date"> at ${d.toLocaleString("en-US")}</div>
            </div>
            <hr />
            <div class="content"><pre>${x.user_response}</pre></div>
            
        </div>`;
  });
}

/**
 * function to handle on submit call of form
 * @param {FormObject} form 
 * @returns 
 */
function handleGenerateClick(form) {
  try {
    let formData = new FormData(form);
    // read weather
    fetch(`${API_CURRENT_WEATHER_ENDPOIT}?zip=${formData.get("zip")}`)
      .then((res) => res.json())
      .then((temprature) => {
        if (temprature.cod === "404") {
          // on weather faiure catch exception and bail out
          throw new Error(temprature.message);
        }
        // return weahter object
        return temprature.main;
      })
      .then((temprature) => {
        // post user response to server
        return postUserData(formData, temprature.temp);
      })
      .then(() => fetchAllData()) // featch all recorded data
      .catch((e) => {
        debugger;
      });
  } catch (e) {
    alert(e.message);
  }
  return false;
}

// fetch project data if available
fetchAllData();
