import React, {useState} from "react";
import * as  ReactDOMClient  from "react-dom/client";
import axios, { Axios } from 'axios';

import {Link, Route} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from "react-bootstrap";
import DropdownButton from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import './modal.css'

const ModalWindow = ({active, setActive, children}) => {
    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ?  "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalWindow