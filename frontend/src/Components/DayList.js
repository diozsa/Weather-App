import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import DayCard from "./DayCard";
import Row from "react-bootstrap/Row";

const DayList = ({ formatDateTime, onDayClick, selectedDay }) => {

  const { weatherData, unit } = useContext(UserContext);

  const handleDayCardClick = (dayIndex) => {
    onDayClick(dayIndex);
  }
  return (
    <div className="pb-5">
      <Row className="flex-nowrap overflow-auto py-4 my-5 mx-3">
        {weatherData.days.map((day, index) => {
          const date = formatDateTime(weatherData.days[0].hours[0].datetime, day.datetime)[1];

          return (
            <DayCard
              key={day.datetime} 
              icon={day.icon}
              conditions={day.conditions}
              tempMax={Math.round(day.tempmax) + (unit === "us" ? "\xB0F" : "\xB0C")}
              tempMin={Math.round(day.tempmin) + (unit === "us" ? "\xB0F" : "\xB0C")}
              precip={day.precipprob}
              date={date}
              onClick={() => handleDayCardClick(index)}
              isSelected={selectedDay === index}
            />
          );
        })}
      </Row>
    </div>
  )
}

export default DayList;