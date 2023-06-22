import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge, ProgressBar, Image, Tooltip, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
            <h1>Pomodoro Timer</h1>
        <CountDown minutes={25} seconds={0}></CountDown>
        </>
    )
}