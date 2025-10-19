import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinner.css";
// import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="spinner-container">
    <Spinner animation="border" variant="info" />
    </div>
  );
}

export default LoadingSpinner;