import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import Alert from "react-bootstrap/Alert"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const boldUS = <span className="fw-bold">{"\xB0F"}</span>;
const regUS = <span>{"\xB0F"}</span>;
const boldMetric = <span className="fw-bold">{"\xB0C"}</span>;
const regMetric = <span>{"\xB0C"}</span>;

const Header = () => {
  
  const { weatherData, search, address, unit, setUnit } = useContext(UserContext);
  
  const [usBold, setUsBold] = useState(unit === "us");
  const [metricBold, setMetricBold] = useState(unit === "metric");


  if (!weatherData) {
    return <p className="lead fs-4 m-4">Location not found. Try another!</p>;
  }

  return (
    <>
      <Row>
        <Col>
          <h1 className="display-6 ms-3 mt-4">{weatherData.resolvedAddress}</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <button
            className="btn btn-outline-primary mt-5 me-2 fs-5"
            onClick={() => {
              /* This version did not retrieve the correct state
              *
              * search(address, unit).then(() => {
              * setUnit(unit === "us" ? "metric" : "us");
              * });              
              */
              const unitToUse = unit === "us" ? "metric" : "us"
              search(address, unitToUse)
                .then(() => {
                  setUnit(unitToUse);
                  setUsBold(unitToUse === "us");
                  setMetricBold(unitToUse === "metric");
                });
            }}
          >            
            {usBold ? boldUS : regUS} / {metricBold ? boldMetric : regMetric}

          </button>
        </Col>
      </Row>
      
      <p className="lead fs-4 m-3">{weatherData.description}</p>
      {
        weatherData.alert.link && (
          <Alert variant="danger" className="ms-3">
            Weather Alert - {weatherData.alert.event}. &nbsp;&nbsp;
            <a href={weatherData.alert.link} target="_blank" rel="noopener noreferrer">
              More information here</a>
          </Alert>
        )
      }
    </>
  )
}

export default Header;