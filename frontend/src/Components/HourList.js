import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import HourCard from "./HourCard";
import Row from "react-bootstrap/Row";

const HourList = ({ formatDateTime, selectedDay }) => {

  const { weatherData, unit } = useContext(UserContext);
  const dateString = weatherData.days[0].datetime;

  return (
    <>
      <Row className="flex-nowrap overflow-auto py-4 mx-3">
      {weatherData.days[selectedDay].hours.map(hour => {
        const time = formatDateTime(hour.datetime, dateString)[0];

        return (
          <HourCard
            key={hour.datetime} // add a unique key prop
            icon={hour.icon}
            temp={Math.round(hour.temp) + (unit === "us" ? "\xB0F" : "\xB0C")}
            hour={time}
          />
        );
      })}
      </Row>
    </>
  )
}

export default HourList;