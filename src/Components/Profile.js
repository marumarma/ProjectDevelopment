import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Components/custom.css'
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {Button } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { useEffect } from "react";
import {Image} from "react-bootstrap";

export const Profile = () => {
    const[email, setEmail] = useState();
    const[nickname, setNickname] = useState();
    const [image, setImage] = useState()
    const [profile, setProfile] = useState([])

    const navigate = useNavigate()
    const toHome = () => {
        navigate('/')
    }

    let Token = localStorage.getItem('token');
    
    const headers = {
        'accept': '*/*',
        'Authorization' : 'Bearer ' + Token
    }
        //console.log(fullname,birthdate,email,password,confirmpassword)
    useEffect(() => {
        axios.get('https://teamtoolhosting.ru/api/auth/user', {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setProfile(response.data)
            }
        })
    }, [])

    console.log(profile)

    function Avatar(){
        if (profile.image == null){
            return ('https://i.pinimg.com/736x/eb/8c/ba/eb8cba7ff7973794e0b5e3209667a84c.jpg')
        }
        else {
            return(profile.image)
        }
    }

    function EditProfile(){

        let data = {
            nickname: nickname,
            image: image
        }

        axios.put('https://teamtoolhosting.ru/api/user', data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setProfile(response.data)
            }
        })
    }




    return(
        <>
             <Container className="d-flex cont justify-content-md-center mt-5 ">
                <Card style={{ width: '30rem', marginBottom: '10px' }}  className=" text-center card1">
                    <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3 fw-bold" style={{color: '#5B69C6'}}>Профиль</Card.Title>
                        <Form>
                            <Image src={Avatar()} rounded width={250} height={250} className="mb-3"></Image>
                            <Container className="pl-0">
                            <Row className="help mt-2 mb-3 me-5" style={{color: '#5B69C6'}}>
                                <Col xs lg={3} className="help fw-bold">E-mail:</Col>
                                <Col className="help">{profile.email}</Col>
                            </Row>
                            </Container>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="name" placeholder={profile.nickname} onChange={e => {setNickname(e.target.value)}}/>
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicPassword">
                                <Form.Control type="name" placeholder={"Ссылка на аватар: " + profile.image} onChange={e => {setImage(e.target.value)}}/>
                            </Form.Group>
                            <Form.Text id= "err" className="text-danger">
                            </Form.Text>
                        </Form>
                        <Button className="mt-3 mb-2" variant="primary" type="submit" onClick={() => EditProfile()}>
                                Сохранить
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}