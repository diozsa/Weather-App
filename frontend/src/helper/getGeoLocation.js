import React from "react";
import axios from "axios";
/** Helper to get the geolocation of the browser **/

const getGeoLocation = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    const { city, country } = response.data;
    const location = `${city}, ${country}`;
    return location;
  } catch (error) {
    console.error(error);
    return "Denver, CO"; // to circumvent browser blocker
  }
}

export default getGeoLocation;