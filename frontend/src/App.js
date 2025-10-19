import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WeatherApi from "./api/api";
import NavBar from "./routes-nav/NavBar";
import HomePage from "./routes-nav/HomePage";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import { decodeToken } from "react-jwt";
import getGeoLocation from "./helper/getGeoLocation";

/**
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 * 
 * - currentUser: username - from token. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 */

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "weather-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [weatherData, setWeatherData] = useState(null);
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("us");

  // Gets username from token. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function getUsername() {
    // console.debug("App useEffect getUsername", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          // puts token on the Api class so it can use it to call the API.
          WeatherApi.token = token;
          setCurrentUser(username);
        } catch (err) {
          // console.error("App getUsername: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs;
    // once the data is fetched (or even if an error happens!),
    //this will be set back to false to control the spinner.

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs user in (set token) upon signup.
   *
   * Make sure to await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await WeatherApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      // console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


  /** Handles site-wide login.
   *
   * Make sure to await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await WeatherApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      // console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  
  /** Load data for default location on mount */
  /** Using IP geo detection for default - IF NO BROWSER BLOCKER PRESENT*/

  useEffect(() => {
    async function getLocationOnMount() {
      try {
        const location = await getGeoLocation();
        await search(location);
      } catch (error) {
        await search("Delhi");
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getLocationOnMount();
  }, []);

// Search function used in the SearchForm

  async function search(location, _unit) {
    try {
      let data = await WeatherApi.getWeatherData(location, _unit);
      setWeatherData(data);
      setAddress(data.resolvedAddress)
      return { success: true };
    } catch (errors) {
      // console.error("api failed", errors);
      return setWeatherData(null);
    }
  }

// Save location used in the NavBar
  
  async function saveAdd(data) {
    try {
      await WeatherApi.save(data);
      return { success: true };
    } catch (error) {
      // console.error("api failed: could not save address", error);
      return {success: false}
    }
  }

  async function getAdds(username) {
    try {
      let res = await WeatherApi.getAddresses(username);
      return { success: true, addresses: res };
    } catch (error) {
      // console.error("api failed: could not get address list", error);
      return {success: false}
    }
  }

  async function removeAdd(username, id) {
    try {
      await WeatherApi.removeAddress(username, id);
      return { success: true };
    } catch (error) {
      // console.error("api failed: could not remove address", error);
      return { success: false }
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <Router>
      <UserContext.Provider
        value={{ currentUser, weatherData, address, search, unit, setUnit }}>
        <NavBar
          logout={logout}
          login={login}
          signup={signup}
          saveAdd={saveAdd}
          getAdds={getAdds}
          removeAdd={removeAdd}
        />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage weatherData={weatherData} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>

        <Row className="fixed-bottom" style={{ backgroundColor: 'lightBlue' }}>
          <Col className="d-flex align-items-center justify-content-center">
            <p className="m-3">
              Dan Iozsa © {new Date().getFullYear()} | <a href="https://danlabs.dev"
                target="_blank" rel="noreferrer">danlabs.dev</a> | <a href="https://linkedin.com/in/diozsa"
                target="_blank" rel="noreferrer">LinkedIn</a>
            </p>
          </Col>
        </Row>
      </UserContext.Provider>
    </Router>
  );
}
export default App;
