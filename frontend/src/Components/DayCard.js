import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import icons from "../icons/icons";

const DayCard = ({ icon, tempMax, tempMin, precip, date, onClick, isSelected }) => {
  return (
    <>
      <Card
        className={`ms-3 me-3 shadow-lg m-auto d-flex align-items-center justify-content-center
          ${isSelected ? " border-primary" : ""}`}
        style={{ maxWidth: '200px', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
        onClick={onClick}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <Card.Img variant="top" src={icons[icon]}
          style={{ maxWidth: '70px' }} />
        <Card.Body>
          <Card.Text className="fs-4 text-danger d-flex justify-content-center">{tempMax}</Card.Text>
          <Card.Text className="fs-4 text-primary d-flex justify-content-center">{tempMin}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush d-flex align-items-center justify-content-center">
          <ListGroup.Item className="fs-5">{precip}%</ListGroup.Item>
          <ListGroup.Item>{date}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  )
}

export default DayCard;