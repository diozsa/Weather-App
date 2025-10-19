import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import icons from "../icons/icons";

const HourCard = ({icon, temp, hour}) => {
  return (
    <>
      <Card
        className="me-2 shadow-lg border-0 m-auto d-flex align-items-center justify-content-center"
        style={{maxWidth: '130px' }}
      >
        <Card.Img variant="top" src={icons[icon]} style={{ maxWidth: '70px' }} />

        <ListGroup className="list-group-flush d-flex align-items-center justify-content-center">
          <ListGroup.Item className="fs-4">{temp}</ListGroup.Item>
          <ListGroup.Item>{hour}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  )
}

export default HourCard;

