import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API Class

class WeatherApi {
  
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", BASE_URL, endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WeatherApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);

      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API backend routes

  /** Get token for login from username and password */

  static async login(data) {
    const res = await this.request('auth/token', data, 'post');

    return res.token;
  } 

  /** Signup user */

  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');

    return res.token;
  }

  /** Save location */

  static async save(data) {
    const res = await this.request('addresses', data, 'post');

    return res.address;
  }

  /** Get all addresses saved by user */

  static async getAddresses(username) {
    const res = await this.request(`addresses/${username}`);

    return res.addresses;
  }

  /** Delete an address by username and id 
   * returns { deleted: id }
  */

  static async removeAddress(username, id) {
    const res = await this.request(`addresses/${username}/${id}`, {}, 'delete');

    return res
  }
  /** Fetch data from the external API */

  static async getWeatherData(location, unit="us") {
    
    const res = await this.request(`api/data?location=${location}&unit=${unit}`);
  
    return res;
  }

}

// Token for username "user", password "password"
// ==== to be remove later =====

// WeatherApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2NzcxMTU4MTB9.Gct_4TKa9f6NZyBHRZfVC7tj2DuP8ClLnnxnkd71wtI";


export default WeatherApi;
