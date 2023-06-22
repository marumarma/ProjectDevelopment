import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../Components/custom.css'
import { Card, Container, Row, Col, Badge, CardGroup } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { useEffect } from "react";
import ModalWindow from "../Modal/ModalWindow";
import {Button, Form, Modal, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../SideBar";

export default function ProjectsPage() {

    const [projects, setProjects] = useState([])
    let Token = localStorage.getItem('token');

    const [newName, setNewName] = useState()
    const [newDesc, setNewDesc] = useState()

    const [createName, setCreateName] = useState()
    const [createDesc, setCreateDesc] = useState()
    const [profile, setProfile] = useState([])

    const [modalActive, setModalActive] = useState({
        active: false,
        itemName: "",
        itemId: "",
        type: ''
    });

    const headers = {
        'accept': '*/*',
        'Authorization' : 'Bearer ' + Token
    }

    useEffect(() => {
        axios.get('https://teamtoolhosting.ru/api/project', {headers: headers})
        .then((response) => {
            console.log(response.data)
            setProjects(response.data)
        })
        axios.get('https://teamtoolhosting.ru/api/auth/user', {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setProfile(response.data)
            }
        })
    }, [])

    console.log(projects)

    function ModalType(name, id, type){
        if (type == "create"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>New project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" className="mb-3" onChange={e => {setCreateName(e.target.value)}}></Form.Control>
                            <Form.Text className="text-danger" id="newnameerr"></Form.Text>
                            <Form.Control placeholder="Description" onChange={e => {setCreateDesc(e.target.value)}}></Form.Control>
                            <Form.Text className="text-danger" id="newnameerr"></Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  CreateProject()}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "edit"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Edit project "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="New name" className="mb-3" onChange={e => {setNewName(e.target.value)}}></Form.Control>
                            <Form.Text className="text-danger" id="newnameerr"></Form.Text>
                            <Form.Control placeholder="New description" onChange={e => {setNewDesc(e.target.value)}}></Form.Control>
                            <Form.Text className="text-danger" id="newnameerr"></Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  EditProject(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }

        else if (type == "delete"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Are you sure that you want to delete project "{name}"?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  DeleteProject(id)}>
                        Yes
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
    }

    function EditProject(id){
        let data ={
            name: newName,
            description: newDesc
        }

        axios.put('https://teamtoolhosting.ru/api/project/' + id, data, {headers: headers}
        ).then((response) => {
            console.log(response.data)
            if (response.status == 200){
                document.getElementById(id + "name").textContent = response.data.name
                document.getElementById(id + "desc").textContent = response.data.description
                setModalActive(false)
                setCreateName('')
                setCreateDesc('')
                setModalActive({active:false})
            }
        })
    }

    function DeleteProject(id){

        axios.delete('https://teamtoolhosting.ru/api/project/' + id, {headers: headers}
        ).then((response) => {
            console.log(response.data)
            if (response.status == 200){
                document.getElementById(id).remove()
                setModalActive({active:false})
            }
        })
    }



    function CreateProject(){
        let data = {
            name: createName,
            description: createDesc
        }

        axios.post('https://teamtoolhosting.ru/api/project', data, {headers: headers} 
        ).then((response) => {
            console.log(response.data)
            if (response.status == 200){
                projects.push(response.data)
                setProjects(projects)
                setModalActive({active: false})
            }
        })
    }


  return(
    <>
    <NavBar email={profile.email}></NavBar>
    <Container fluid className="d-flex cont justify-content-md-center mt-2 ">
        <Card style={{ width: '50rem', minHeight: '15rem' }} className="card1">
            <Container className="d-flex justify-content-md-center">
                    <Col>
                        <Row>
                            <h2>My projects <span onClick={() => setModalActive({active: true, type: "create"})} class="pointer">+</span></h2>
                        </Row>
                        <Row xs={1} md={2} className="" style={{width: '40rem'}}>
                        
                        {projects?.map((project, idx) => (
                            <Col key={idx}>
                            <Card className="littlecard2 mb-3" id={project.id}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Card.Title className="mt-2" ><Link id={project.id +"name"} key={project.id} to={`/projects/${project.id}`} state={{name: project.name}}>{project.name} </Link></Card.Title>
                                        </Col>
                                        <Col>
                                            <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-autoclose-true">
                                            Actions
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setModalActive({active: true, type: "edit", itemId: project.id, itemName: project.name})}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => setModalActive({active: true, type: "delete",  itemId: project.id, itemName: project.name})}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                <Card.Text id={project.id+"desc"}>{project.description}</Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                        </Row>
                    </Col>
            </Container>
        </Card>
    </Container>

    <ModalWindow active={modalActive.active} setActive={setModalActive}>
        {ModalType(modalActive.itemName, modalActive.itemId, modalActive.type)}
    </ModalWindow>
    </>
  )
}