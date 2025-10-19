import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icons from "../icons/icons";

const StatCard = ({ txt, val, icon }) => {

  return (
    <Card
      className="shadow border-info m-auto d-flex align-items-center justify-content-center"
      style={{ minWidth: "200px", maxWidth: '210px'}}
    >
      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center justify-content-center"
          style={{ maxWidth: "60%" }}>
          <Card.Img variant="top" src={icons[icon]}
            style={{ margin: '0 auto', maxWidth: '80px' }} />
        </Col>

        <Col>
          <ListGroup className="list-group-flush" style={{ textAlign: 'center' }}>
            <ListGroup.Item className="fw-bold text-muted">{txt}</ListGroup.Item>
            <ListGroup.Item>{ val }</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>

  )
} 
export default StatCard;