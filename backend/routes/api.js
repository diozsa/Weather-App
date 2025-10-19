const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const { API_KEY } = require("../config");
const axios = require("axios");
const express = require("express");
const router = express.Router();

/** helper method for pulling only the data needed
 *  from the external API and repackaging it.
 * 
 * Note - JSON received from API contains 11K+ lines
 */

function repackageData(data) {

  const daysData = data.days
    .map(({
      datetime,
      tempmin,
      tempmax,
      precipprob,
      conditions,
      description,
      icon,
      hours
    }) => ({
      datetime,
      tempmin,
      tempmax,
      precipprob,
      conditions,
      description,
      icon,
      hours: hours.map(({ datetime, temp, icon }) => ({ datetime, temp, icon }))
  }));

  const {resolvedAddress, description, alerts, currentConditions} = data;
  const alert = (alerts.length === 0)
    ? { event: "No current alerts" } :
    {
      event: alerts[0].event,
      link: alerts[0].link
    }

  const newData = {
    resolvedAddress,
    description,
    alert,
    currentConditions,
    days: daysData
  }
  console.log(newData)
  return newData;
}

/** GET / {data} => {processed_data}
 * 
 * Gets data from external weather API
 * NO autho required
 */

router.get('/data', async function (req, res, next) {
  const location = req.query.location;
  const unitGroup = req.query.unit; // metric or US
  console.log("THE QUERY IS ", req.query)
  try {
    const response = await axios.get(`${API_BASE_URL}${location}?unitGroup=${unitGroup}&key=${API_KEY}`);
    const data = response.data;

    console.log("Location in Express is ", location)
    console.log("Resolved Address in Express is ", data.resolvedAddress)

    const newData = repackageData(data);
    
    // res.send(data.resolvedAddress);    
    res.send(newData);
  } catch (err) {
    return next(err);
  }
})

module.exports = router;