import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge, ProgressBar, Image, Tooltip, ListGroupItem } from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { isEmpty } from "lodash";
import axios from "axios";
import {OverlayTrigger} from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import ModalWindow from "../Modal/ModalWindow";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {DropdownButton} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import NavBar from "../SideBar";
import { Profile } from "../Profile";
import { CountDown } from "./CountDown";

export default function Pomodoro(){
    let Token = localStorage.getItem('token');
    const [profile, setProfile] = useState([])
    
    const headers = {
        'accept': '*/*',
        'Authorization' : 'Bearer ' + Token
    }

    useEffect(() => {
        axios.get('https://teamtoolhosting.ru/api/auth/user', {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setProfile(response.data)
            }
        })
    }, [])



    return(
        <>
        <NavBar email={profile.email}></NavBar>
            <Container className="d-flex cont justify-content-md-center mt-5">
                <Card style={{ width: '50rem', minHeight: '15rem' }} className="card1">
                    <Card.Body className="d-flex flex-column">
                        <h1 style={{ color: '#5B69C6' }}>Pomodoro Timer</h1>
                        <CountDown minutes={25} seconds={0}></CountDown>
                    </Card.Body>
                </Card>

            </Container>
        </>
    )
}