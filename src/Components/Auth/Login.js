import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {Button } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { Link } from "react-router-dom";
export const Login = () => {
    const[email, setEmail] = useState();
    const[password, setpassword] = useState();

    const navigate = useNavigate()
    const toHome = () => {
        navigate('/projects')
    }

    const LoginRequest = event => {
        event.preventDefault();

        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json'
        }

        const data = {
            email : email,
            password : password
        }
        console.log(data)
        //console.log(fullname,birthdate,email,password,confirmpassword)
        axios.post('https://teamtoolhosting.ru/api/auth/login', data, headers
        ).then((response) => {
            if (response.status == 200){
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('auth', true)
                const newheaders = {
                    'Authorization': 'Bearer ' + response.data.token
                }
                //props.setIsLoggedIn(true)
                console.log(newheaders)
                toHome()
            }
            //alert('успех')
 
        })
    }


    return(
        <>
             <Container className="d-flex cont justify-content-md-center mt-5">
                <Card style={{ width: '30rem' }}  className="justify-content-md-center text-center card1">
                    <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-4">Log In</Card.Title>
                        <Form onSubmit={LoginRequest}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-mail" onChange={e => {setEmail(e.target.value)}}/>
                            </Form.Group>
                    
                            <Form.Group className="mb-1" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={e => {setpassword(e.target.value)}}/>
                            </Form.Group>
                            <Form.Text id= "err" className="text-danger">
                            </Form.Text>
                        </Form>
                        <Button className="mt-3 mb-2" variant="primary" type="submit" onClick={LoginRequest}>
                                Go
                        </Button>
                        <p><Link id="reg" key="reg" to={`/registration`}>Registration</Link></p>
                    </Card.Body>
                </Card>
                
            </Container>
        </>
    )
}