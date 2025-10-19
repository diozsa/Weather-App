import React, {useContext} from "react";
import CurrentCard from "./CurrentCard";
import UserContext from "../auth/UserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatCard from "./StatCard";

const Stats = ({formatDateTime}) => {

  function uvIndex(uvindex) {
    switch (true) {
      case (uvindex >= 0 && uvindex <= 2):
       return "low";
      case (uvindex >= 3 && uvindex <= 5):
        return "mod";
      case (uvindex >= 6 && uvindex <= 8):
        return "high";
      case (uvindex >= 9):
        return "extreme";
      default:
        break;
    }
  }

  const { weatherData, unit } = useContext(UserContext);
  const uvindex = weatherData.currentConditions.uvindex;
  const index = uvIndex(uvindex);

  const dateString = weatherData.days[0].datetime;

  const currTime = formatDateTime(weatherData.currentConditions.datetime, dateString)[0];
  const sunrise = formatDateTime(weatherData.currentConditions.sunrise, dateString)[0];
  const sunset = formatDateTime(weatherData.currentConditions.sunset, dateString)[0];
  return (
    <>
      <Row >
        <Col sm={9} md={7} lg={5} xl={4}>
          <CurrentCard time={currTime} />
        </Col>
        <Col className="overflow-auto" style={{ marginTop: "30px" }}
        >
          
          <Row className="flex-nowrap">
            <StatCard
              txt="MaxTemp"
              val={Math.round(weatherData.days[0].tempmax)
                + (unit === "us" ? "\xB0F" : "\xB0C")}
              icon="max-temp"
            />
            <StatCard
              txt="Sunrise"
              val={sunrise}
              icon="sunrise"
            />
            <StatCard
              txt="Wind"
              val={Math.round(weatherData.currentConditions.windspeed)
                + (unit === "us" ? " mph" : " kmh")}
              icon="wind"
            />
            <StatCard            
              txt="UV index"
              val={Math.round(weatherData.currentConditions.uvindex) + ` (${index})`}
              icon="uv"
            />
            </Row>

          <Row className="flex-nowrap pb-4" style={{ marginTop: "10px" }}>
            <StatCard
              txt="MinTemp"
              val={Math.round(weatherData.days[0].tempmin)
                + (unit === "us" ? "\xB0F" : "\xB0C")}
              icon="min-temp"
            />
            <StatCard
              txt="Sunset"
              val={sunset}
              icon="sunset"
            />
            <StatCard
              txt="Visibility"
              val={weatherData.currentConditions.visibility
                + (unit === "us" ? " mi" : " km") }
              icon="visibility"
            />
            <StatCard
              txt="Humidity"
              val={Math.round(weatherData.currentConditions.humidity) + "%"}
              icon="humidity"
            />
            </Row>
        </Col>
      </Row>
    </>
    
  )
}

export default Stats;