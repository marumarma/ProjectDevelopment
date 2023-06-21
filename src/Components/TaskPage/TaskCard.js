import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge } from "react-bootstrap";

export default function TaskCard() {
  return(
    <Container fluid className="d-flex cont justify-content-md-center mt-2 ">
        <Card style={{ width: '90vw', minHeight: '90vh', marginBottom: '10px' }} className="card1">
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h2 className="ms-2 mb-3">To do +</h2>
                        <Card className="ms-1 me-1 littlecard">
                            <Card.Body>
                                <Card.Title className="fs-4">Task title</Card.Title>
                                <Card.Text>Loren ipsum card text</Card.Text>
                                <Badge>design</Badge>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <h2 className="ms-2 mb-3">In process +</h2>
                        <Card className="ms-1 me-1 littlecard">
                            <Card.Body>
                                <Card.Title className="fs-4">Task title</Card.Title>
                                <Card.Text>Loren ipsum card text</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <h2 className="ms-2 mb-3">Done +</h2>
                        <Card className="ms-1 me-1 littlecard">
                            <Card.Body>
                                <Card.Title className="fs-4">Task title</Card.Title>
                                <Card.Text>Loren ipsum card text</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Card>
    </Container>
  )
}