import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../custom.css'
import {Card, Container, Row, Col, Badge, Dropdown} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {Button } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { useEffect } from "react";

export const Notifications = () => {
    const [invitations, setInvitations] = useState([]);
    let Token = localStorage.getItem('token');

    const headers = {
        'accept': '*/*',
        'Authorization' : 'Bearer ' + Token
    }
    
    useEffect(() => {
        axios.get('https://teamtoolhosting.ru/api/users/invitations', {headers: headers}
        ).then((response) => {
            if (response.status === 200){
                setInvitations(response.data)
            }
        })
    }, [])

    function AcceptInvite(id){

        let data = {
            "project_id": id,
            "accept": true
        }

        axios.put('https://teamtoolhosting.ru/api/users/accept', data, {headers: headers}
        ).then((response) => {
            if (response.status === 200){
                setInvitations(response.data)
            }
        }).catch(error => console.log(error))
    }

    function DontAcceptInvite(id){

        let data = {
            "project_id": id,
            "accept": false
        }

        axios.put('https://teamtoolhosting.ru/api/users/accept', data, {headers: headers}
        ).then((response) => {
            if (response.status === 200){
                setInvitations(response.data)
            }
        }).catch(error => console.log(error))
    }

    return(
        <>
            <Container className="d-flex cont justify-content-center">
                <Card style={{ width: '50rem', minHeight: '15rem', marginBottom: '10px' }} className="card1">
                    <Container className="d-flex justify-content-center">
                        <Col>
                            <Row style={{marginTop: '10px', marginLeft: '5px'}}>
                                <h2>Уведомления </h2>
                            </Row>
                            <Row >
                                {invitations?.map((inv, idx) => (
                                    <Col key={idx}>
                                        <Card className="littlecard2 mb-3" id={inv.project.id}>
                                            <Card.Body>
                                                <Row>
                                                    <Col>
                                                        <Card.Title className="mt-2" id={inv.project.id +"name"}>Приглашение в проект "{inv.project.name}"</Card.Title>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                </Row>
                                                <Card.Text id={inv.project.id+"desc"}>Описание: {inv.project.description}</Card.Text>
                                                {(inv.isModerator === 1) &&
                                                    <span className="fw-light">Вы назначены модератором на этом проекте</span>
                                                }
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button className="mt-1 mb-2" variant="red" type="submit" onClick={() =>  DontAcceptInvite(inv.project.id)}>
                                                    Отклонить
                                                </Button>
                                                <Button className="mt-1 ml-3 mb-2" style={{ marginLeft: '3px' }} variant="green" type="submit" onClick={() =>  AcceptInvite(inv.project.id)}>
                                                    Принять
                                                </Button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Container>
                </Card>
            </Container>
        </>
    )
}