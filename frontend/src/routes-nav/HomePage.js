import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import Header from "../Components/Header";
import Stats from "../Components/Stats";
import HourList from "../Components/HourList";
import DayList from "../Components/DayList";
const HomePage = () => {
  const { weatherData } = useContext(UserContext);
  
  /**
   * formatDateTime (string, string) => ["12:00AM", "Mar 12"]
   * 
   * timeString format - "21:43:30"
   * dateString format - "2023-03-08"
   **/  

  const formatDateTime = (timeString, dateString) => { 

    const time = new Date(`${dateString} ${timeString}`);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    let res = [formattedTime, formattedDate];
    return res;
  }

  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
  }

  return(
    <>
      <Header />
      {weatherData ? (
        <>
          < Stats formatDateTime={formatDateTime} />

          <p className="lead fs-5 d-flex justify-content-center pt-5">
            Hourly forecast -&nbsp;
            {formatDateTime(weatherData.days[0].hours[0].datetime,
              weatherData.days[selectedDay].datetime)[1]}
          </p>

          < HourList
            formatDateTime={formatDateTime}
            selectedDay={selectedDay}
          />

          <p className="lead fs-5 d-flex justify-content-center pt-5">
            Daily forecast -&nbsp;
            {formatDateTime(weatherData.days[0].hours[0].datetime, weatherData.days[0].datetime)[1]}
            &nbsp;through&nbsp;
            {formatDateTime(weatherData.days[0].hours[0].datetime, weatherData.days[14].datetime)[1]}
          </p>

          < DayList
            formatDateTime={formatDateTime}
            onDayClick={handleDayClick}
            selectedDay={selectedDay}
          />

        </>
      ) : null}
      
    </>
  )
}

export default HomePage;