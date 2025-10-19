import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icons from "../icons/icons";

const CurrentCard = ({time}) => {
  const { weatherData, unit } = useContext(UserContext);
  const icon = weatherData.currentConditions.icon;

  return (
    <Card
      className="border-info border-2 shadow m-4 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
    >
      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center justify-content-center"
        >
          <Card.Img variant="top" src={icons[icon]}/>
          <Card.Text className={"text-center mx-3 fs-1"}>
            {Math.round(weatherData.currentConditions.temp)
              + (unit === "us" ? "\xB0F" : "\xB0C")} 
          </Card.Text>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center" style={{ width: "60%" }}>

          <Card.Body style={{ textAlign: 'center'}}>
            <Card.Title className="fw-bold text-muted" style={{ fontSize: '24px' }}>
              Current stats
            </Card.Title>
            <Card.Text className="fs-5">
              {weatherData.currentConditions.conditions}
            </Card.Text>
            <Card.Text className="fs-5">
              Feels like&nbsp;
              {Math.round(weatherData.currentConditions.feelslike)}
              {unit === "us" ? "\xB0F" : "\xB0C"}
            </Card.Text>
            <Card.Text className="text-muted fs-6" >
              (as of {time})
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )

}

export default CurrentCard;