import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

export const Registration = () => {
    const [nickName, setNickName] = useState();
    const[email, setEmail] = useState();
    const[password, setpassword] = useState();

    const navigate = useNavigate()
    const toHome = () => {
        navigate('/projects')
    }

    const RegisterRequest = event => {
        event.preventDefault();
        console.log('piped')
        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json'
        }

        const data = {
            nickname: nickName,
            email : email,
            password : password
        }
        console.log(data)
        //console.log(fullname,birthdate,email,password,confirmpassword)
        axios.post('https://teamtoolhosting.ru/api/register', data, {headers: headers}
        ).then((response) => {
            //alert('успех')
            if (response.status == 200){
                console.log(response)
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('auth', true)
                const newheaders = {
                    'Authorization': 'Bearer ' + response.data.token
                }
                toHome()
            }
        
        })
    }


    return(
        <>
             <Container className="d-flex cont justify-content-md-center mt-5">
                <Card style={{ width: '30rem' }}  className="justify-content-md-center text-center card1">
                    <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-4">Registration</Card.Title>
                        <Form onSubmit={RegisterRequest}>
                            <Form.Group className="mb-3" controlId="formBasicEmai">
                                <Form.Control type="name" placeholder="Nickname" onChange={e => {setNickName(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-mail" onChange={e => {setEmail(e.target.value)}}/>
                            </Form.Group>
                    
                            <Form.Group className="mb-1" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={e => {setpassword(e.target.value)}}/>
                            </Form.Group>
                            <Form.Text id= "err" className="text-danger">
                            </Form.Text>
                        </Form>
                        <Button className="mt-3 mb-2" variant="primary" type="submit" onClick={RegisterRequest}>
                                Register
                        </Button>
                        <p><Link id="reg" key="reg" to={`/`}>Log In</Link></p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}