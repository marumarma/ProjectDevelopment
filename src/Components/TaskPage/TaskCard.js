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


export default function TaskCard() {
    const {id} = useParams()
    console.log(id)
    const now = 60

    const navigate = useNavigate()
    const toProjects = () => {
        navigate('/projects')
    }

    const [tasks, setTasks] = useState({"admin": {
        "id": 2,
        "nickname": "qwerty",
        "email": "qwerty1@qwerty.com",
        "image": "https://www.fonstola.ru/images/201305/fonstola.ru_96099.jpg"
    },})

    const [admin, setAdmin] = useState()
    const [tasksToDo, setTasksToDo] = useState()
    const [tasksInProcess, setTasksInProcess] = useState()
    const [tasksDone, setTasksDone] = useState()

    const [usersList, setUsersList] = useState([])
    const [userEmail, setUserEmail] = useState('')

    const [projName, setProjName] = useState()
    const [projDesc, setProjDesc] = useState()

    const [taskName, setTaskName] = useState()
    const [taskDesc, setTaskDesc] = useState()
    const [taskCreationDate, setTaskCreationDate] = useState()
    const [taskDeadline, setTaskDeadline] = useState()
    const [category, setCategory] = useState()

    const [categoryList, setCategoryList] = useState()
    const [addedUsers, setAddedUsers] = useState()
    const [todoStatus, setTodoStatus] = useState()
    const [processStatus, setProcessStatus] = useState()
    const [progress, setProgress] = useState()
    const [editStatus, setEditStatus] = useState()
    const [newCategory, setNewCategory] = useState()

    const editStatusChange = (event) => {
        setEditStatus(event.target.value)
    }


    const userChange = (event) => {
        setUserEmail(event.target.value)
    }

    const categoryChange = (event) => {
        setCategory(event.target.value)
    }

    const addedUsersChange = (event) => {
        setAddedUsers(event.target.value)
    }

    const todoStatusChange = (event) => {
        setTodoStatus(event.target.value)
    }

    const progressChange = (event) => {
        setProgress(event.target.value)
    }


    const [modalActive, setModalActive] = useState({
        active: false,
        itemName: "",
        itemId: "",
        type: ''
    });

    const [profile, setProfile] = useState([])
    let Token = localStorage.getItem('token');
    
    const headers = {
        'accept': '*/*',
        'Authorization' : 'Bearer ' + Token
    }

    useEffect(() => {
        axios.get('https://teamtoolhosting.ru/api/auth/user', {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setProfile(response.data)
                console.log(profile)
            }
        })
        axios.get('https://teamtoolhosting.ru/api/project/' + id, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setTasks(response.data)
                console.log(response.data)
                console.log(tasks)
            }
        })
        axios.get('https://teamtoolhosting.ru/api/users', {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setUsersList(response.data)
                console.log(response.data)
                console.log(tasks)
            }
        })
        axios.get('https://teamtoolhosting.ru/api/category/'+ id, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setCategoryList(response.data)
            }
        })


    }, {})

    function AddMember(){
        let data ={
            project_id: id,
            email: userEmail,
            is_moderator: 0
        }
        
        axios.post('https://teamtoolhosting.ru/api/users', data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }

    function EditProject(){
        let data = {
            name: projName,
            description: projDesc
        }

        axios.put('https://teamtoolhosting.ru/api/project/' + id, data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                document.getElementById('projname').textContent = response.data.name
                document.getElementById('projDesc').textContent = response.data.description
                setModalActive({active: false})
            }
        })
    }

    function DeleteProject(){
        axios.delete('https://teamtoolhosting.ru/api/project/' + id, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setModalActive({active: false})
                toProjects()

            }
        })
    }

    function CreateTask(){
        let data = {
            name: taskName,
            description: taskDesc,
            creation_date: taskCreationDate,
            deadline: taskDeadline,
            is_important: 0,
            category_id: category,
            project_id: id
        }

        axios.post('https://teamtoolhosting.ru/api/task', data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setModalActive({active: false})
                setTasks(response.data)
            }
        })
    }

    function AddPerformer(id){
        let data = {
            task_id: id,
            user_id: addedUsers
        }
        console.log(addedUsers)

        console.log(data)

        axios.post('https://teamtoolhosting.ru/api/performer', data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                console.log(response)
                setModalActive({active: false})
                setTasks(response.data)
            }
        })
    }

    function ChangeStatus(id){
        let data = {
            status: todoStatus
        }

        axios.put('https://teamtoolhosting.ru/api/task/status/' + id, data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                console.log(response)
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }

    function ChangeProgress(id){
        let data = {
            progress: progress
        }

        axios.put('https://teamtoolhosting.ru/api/task/progress/' + id, data, {headers: headers}
        ).then((response) => {
            if (response.status == 200) {
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }

    function EditTask(id){
        let data ={
            name: taskName,
            description: taskDesc,
            creation_date: taskCreationDate,
            deadline: taskDeadline,
            is_important: 0,
            category_id: category,
            status: editStatus,
            progress: progress
        }

        console.log(data)

        axios.put('https://teamtoolhosting.ru/api/task/' + id, data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }

    function DeleteTask(id){
        axios.delete('https://teamtoolhosting.ru/api/task/' + id, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }

    function CreateCategory(){
        let data ={
            name: newCategory,
            project_id: id
        }
        axios.post('https://teamtoolhosting.ru/api/category', data, {headers: headers}
        ).then((response) => {
            if (response.status == 200){
                setTasks(response.data)
                setModalActive({active: false})
            }
        })
    }



    function Avatar(task){
        let count = task.performers.length
        if (count == 0){
            return(null)
        }
        else if (count > 0){
            let img = task.performers[0].user.image
            if (img == null){
                img = "https://i.pinimg.com/736x/eb/8c/ba/eb8cba7ff7973794e0b5e3209667a84c.jpg"
            }
            return(
            <>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>{task.performers[0].user.nickname}</Tooltip>} delay={{ show: 250, hide: 400 }}>
                    <Image src={img} roundedCircle width={35} height={35}></Image>
                </OverlayTrigger>
               
            </>)
        }
    }

    function ModalType(name, id, type){
        if (type == "addmember"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Invite user to project "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Choose user:</Form.Label>
                            <Form.Select aria-label="email" value={userEmail} onChange={userChange}>
                                {
                                    usersList?.map((user) =>
                                        <option value={user.email}>{user.email}</option>
                                    )
                                }
                            </Form.Select>
                            
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  AddMember()}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type =="edit"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Edit project "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" className="mb-3" onChange={e => {setProjName(e.target.value)}}></Form.Control>
                            <Form.Control placeholder="Description" onChange={e => {setProjDesc(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  EditProject()}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type =="delete"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Are you sure that you want to delete project "{name}"?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  DeleteProject()}>
                        Delete
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type =="addtasktodo"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Add tew task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" className="mb-3" onChange={e => {setTaskName(e.target.value)}}></Form.Control>
                            <Form.Control placeholder="Description" className="mb-3" onChange={e => {setTaskDesc(e.target.value)}}></Form.Control>
                            <Form.Label>Start date:</Form.Label>
                            <Form.Control placeholder="" type="date" className="mb-3" onChange={e => {setTaskCreationDate(e.target.value)}}></Form.Control>
                            <Form.Label>Deadline:</Form.Label>
                            <Form.Control placeholder="" type="date" className="mb-3" onChange={e => {setTaskDeadline(e.target.value)}}></Form.Control>
                            <Form.Label>Choose category:</Form.Label>
                            <Form.Select aria-label="email" value={category} onChange={categoryChange}>
                                {
                                    categoryList?.map((categ) =>
                                        <option value={categ.id}>{categ.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  CreateTask(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "addperformer"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Add performer to task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Choose user:</Form.Label>
                            <Form.Select aria-label="email" value={addedUsers} onChange={addedUsersChange}>
                            <option value=""> </option>
                                {
                                    
                                    tasks.users?.map((user) => (
                                        user.accepted == 1 ? (
                                            <option value={user.user.id}>{user.user.email}</option>
                                        ) : null
                                    )
                                    )
                                }
                            <option value={tasks.admin.id}>{tasks.admin.email}</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  AddPerformer(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "changestatustodo"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Change status of task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Select aria-label="email" value={todoStatus} onChange={todoStatusChange}>
                                <option value=""></option>
                                <option value="InProcess">In process</option>
                                <option value="Finished">Done</option>
                                    
                                
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  ChangeStatus(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "changestatusinprocess"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Change status of task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Select aria-label="email" value={todoStatus} onChange={todoStatusChange}>
                                <option value=""></option>
                                <option value="Finished">Done</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  ChangeStatus(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "changeprogress"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Change progress of task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Select aria-label="email" value={progress} onChange={progressChange}>
                                <option value=""></option>
                                <option value="0">0%</option>
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                                <option value="60">60%</option>
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                                <option value="90">90%</option>
                                <option value="100">100%</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  ChangeProgress(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "edittodo"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Edit task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" onChange={e => {setTaskName(e.target.value)}}></Form.Control>
                            <Form.Control placeholder="Description" onChange={e => {setTaskDesc(e.target.value)}}></Form.Control>
                            <Form.Label>Creation date:</Form.Label>
                            <Form.Control placeholder="" type="date"onChange={e => {setTaskCreationDate(e.target.value)}}></Form.Control>
                            <Form.Label >Deadline:</Form.Label>
                            <Form.Control placeholder="" type="date" onChange={e => {setTaskDeadline(e.target.value)}}></Form.Control>
                            <Form.Label>Choose category:</Form.Label>
                            <Form.Select aria-label="email" value={category} onChange={categoryChange}>
                                {
                                    categoryList?.map((categ) =>
                                        <option value={categ.id}>{categ.name}</option>
                                    )
                                }
                            </Form.Select>
                            <Form.Label>Choose status:</Form.Label>
                            <Form.Select aria-label="email" value={editStatus} onChange={editStatusChange}>
                                <option value=""></option>
                                <option value="Created">To do</option>
                                <option value="InProcess">In process</option>
                                <option value="Finished">Done</option>
                                    
                                
                            </Form.Select>
                            <Form.Label>Choose progress:</Form.Label>
                            <Form.Select aria-label="email" value={progress} onChange={progressChange}>
                                <option value=""></option>
                                <option value="0">0%</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  EditTask(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "editinprocess"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Edit task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" onChange={e => {setTaskName(e.target.value)}}></Form.Control>
                            <Form.Control placeholder="Description" onChange={e => {setTaskDesc(e.target.value)}}></Form.Control>
                            <Form.Label>Creation date:</Form.Label>
                            <Form.Control placeholder="" type="date"onChange={e => {setTaskCreationDate(e.target.value)}}></Form.Control>
                            <Form.Label >Deadline:</Form.Label>
                            <Form.Control placeholder="" type="date" onChange={e => {setTaskDeadline(e.target.value)}}></Form.Control>
                            <Form.Label>Choose category:</Form.Label>
                            <Form.Select aria-label="email" value={category} onChange={categoryChange}>
                                {
                                    categoryList?.map((categ) =>
                                        <option value={categ.id}>{categ.name}</option>
                                    )
                                }
                            </Form.Select>
                            <Form.Label>Choose status:</Form.Label>
                            <Form.Select aria-label="email" value={editStatus} onChange={editStatusChange}>
                                <option value=""></option>
                                <option value="InProcess">In process</option>
                                <option value="Finished">Done</option>
                                    
                                
                            </Form.Select>
                            <Form.Label>Choose progress:</Form.Label>
                            <Form.Select aria-label="email" value={progress} onChange={progressChange}>
                                <option value=""></option>
                                <option value="0">0%</option>
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                                <option value="60">60%</option>
                                <option value="70">70%</option>
                                <option value="80">80%</option>
                                <option value="90">90%</option>
                                <option value="100">100%</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  EditTask(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "editdone"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Edit task "{name}"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" onChange={e => {setTaskName(e.target.value)}}></Form.Control>
                            <Form.Control placeholder="Description" onChange={e => {setTaskDesc(e.target.value)}}></Form.Control>
                            <Form.Label>Creation date:</Form.Label>
                            <Form.Control placeholder="" type="date"onChange={e => {setTaskCreationDate(e.target.value)}}></Form.Control>
                            <Form.Label >Deadline:</Form.Label>
                            <Form.Control placeholder="" type="date" onChange={e => {setTaskDeadline(e.target.value)}}></Form.Control>
                            <Form.Label>Choose category:</Form.Label>
                            <Form.Select aria-label="email" value={category} onChange={categoryChange}>
                                {
                                    categoryList?.map((categ) =>
                                        <option value={categ.id}>{categ.name}</option>
                                    )
                                }
                            </Form.Select>
                            <Form.Label>Choose status:</Form.Label>
                            <Form.Select aria-label="email" value={editStatus} onChange={editStatusChange}>
                                <option value=""></option>
                                <option value="Finished">Done</option>
                                    
                                
                            </Form.Select>
                            <Form.Label>Choose progress:</Form.Label>
                            <Form.Select aria-label="email" value={progress} onChange={progressChange}>
                                <option value=""></option>
                                <option value="100">100%</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  EditTask(id)}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "deletetask"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Are you sure that you want to delete task "{name}"?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  DeleteTask(id)}>
                        Delete
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
        else if (type == "addcategory"){
            return(
                <>
                    <Modal.Header>
                     <Modal.Title>Add new category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control placeholder="Name" className="mb-3" onChange={e => {setNewCategory(e.target.value)}}></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setModalActive({active: false})}>
                        Cancel
                        </Button>
                        <Button variant="secondary" onClick={() =>  CreateCategory()}>
                        Save 
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
    }


   

    console.log(tasksToDo, tasksInProcess, tasksDone)

    

 
            return(
                <>
                <NavBar email={profile.email}></NavBar>
                <Container fluid className="d-flex cont justify-content-md-center mt-2 ">
                    <Card style={{ width: '80rem', minHeight: '50rem' }} className="card1">

                        <Container className="mt-3">
                            <Row>
                                <Col>
                                <ListGroup variant="flush">
                                    <h2 className="ms-3 "  id="projname">{tasks.name}</h2>
                                    <h5 className="text-secondary ms-3 mb-5"  id="projDesc">{tasks.description}</h5>
                                    {tasks.admin.id == profile.id ? (
                                        <>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item  className="pointer fs-5" onClick={() => setModalActive({active: true, itemName: tasks.name, type: "addmember", itemId: null})}>Add member +</ListGroup.Item>
                                                <ListGroup.Item  className="pointer fs-5" onClick={() => setModalActive({active: true, itemName: tasks.name, type: "addcategory", itemId: null})}>Add category +</ListGroup.Item>
                                                <ListGroup.Item className="pointer fs-5" onClick={() => setModalActive({active: true, itemName: tasks.name, type: "edit", itemId: null})}>Edit project</ListGroup.Item>
                                                <ListGroup.Item className="pointer fs-5" onClick={() => setModalActive({active: true, itemName: tasks.name, type: "delete", itemId: null})}>Delete project</ListGroup.Item>
                                                <ListGroupItem className="fs-5">Invited Users:</ListGroupItem>
                                            </ListGroup>
                                            {
                                                tasks.users?.map((user) => (
                                                    user.accepted == 0 ? (
                                                        <p className="fs-6 ms-3" style={{color: '#5B69C6'}}>{user.user.email + " (" + user.user.nickname + ")" }</p>
                                                    ) : null
                                                ))
                                            }
                                            
                                            

                                        </>
                                    ) : null}
                                            <ListGroup variant="flush">
                                                <ListGroupItem className="fs-5">Members:</ListGroupItem>
                                            </ListGroup>
                                            {
                                                tasks.users?.map((user) => (
                                                    user.accepted != 0 ? (
                                                        <p className="fs-6 ms-3" style={{color: '#5B69C6'}}>{user.user.email + " (" + user.user.nickname + ")" }</p>
                                                    ) : null
                                                ))
                                            }
                                            <p className="fs-6 ms-3" style={{color: '#5B69C6'}}>{tasks.admin.email + " (" + tasks.admin.nickname + ")" }</p>

                                            <ListGroup variant="flush">
                                                <ListGroupItem className="fs-5">Categories:</ListGroupItem>
                                            </ListGroup>
                                            {
                                                tasks.category?.map((item) => (
                                                    
                                                        <p className="fs-6 ms-3" style={{color: '#5B69C6'}}>{item.name}</p>
                                                    
                                                ))
                                            }
                                </ListGroup>
                                </Col>
                                <Col>
                                
                                    <h2 className="ms-2 mb-3">To do <span class="pointer" onClick={() => setModalActive({active: true, itemName: tasks.name, type: "addtasktodo", itemId: null})}>+</span></h2>
                                    
                                    {
                                        tasks.tasks?.map((task) => (
                                            task.status == "Created" ? (
                                            <Card className="ms-1 me-1 littlecard mb-3">
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                        <Card.Title className="fs-4">{task.name}</Card.Title>
                                                        </Col>
                                                        <Col>
                                                            <DropdownButton id="dropdown-basic-button" title="" variant="outline-secondary">
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "addperformer", itemId: task.id})}>Add performer +</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "changestatustodo", itemId: task.id})}>Change status</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "edittodo", itemId: task.id})}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "deletetask", itemId: task.id})}>Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Card.Text>{task.description}</Card.Text>
                                                    <ProgressBar now={task.progress} label={`${task.progress}%`} className="mb-3"/>
                                                    <Row className="mb-2">
                                                        {
                                                            task.category?.map((categ) => (
                                                            <Col md="auto">
                                                                <Badge>{categ.name}</Badge>
                                                            </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                    <Card.Text>
                                                        <Row className="text-secondary">
                                                            <Col md="auto">
                                                                Created: {task.creation_date}
                                                            </Col>
                                                            <Col md="auto">
                                                                Deadline: {task.deadline}
                                                            </Col>
                                                            <Col md="auto">
                                                                {Avatar(task)}
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                                            
                                                </Card.Body>
                                            </Card>
                                        ): null))
                                    }
                                    
                                </Col>
                                <Col>
                                <h2 className="ms-2 mb-3">In process</h2>
                                {
                                        tasks.tasks?.map((task) => (
                                            task.status == "InProcess" ? (
                                            <Card className="ms-1 me-1 littlecard mb-3">
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                        <Card.Title className="fs-4">{task.name}</Card.Title>
                                                        </Col>
                                                        <Col>
                                                            <DropdownButton id="dropdown-basic-button" title="" variant="outline-secondary">
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "addperformer", itemId: task.id})}>Add performer +</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "changestatusinprocess", itemId: task.id})}>Change status</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "changeprogress", itemId: task.id})}>Change progress</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "editinprocess", itemId: task.id})}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "deletetask", itemId: task.id})}>Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </Col>
                                                    </Row>
                                                    <Card.Text>{task.description}</Card.Text>
                                                    <ProgressBar now={task.progress} label={`${task.progress}%`} className="mb-3"/>
                                                    <Row className="mb-2">
                                                        {
                                                            task.category?.map((categ) => (
                                                            <Col md="auto">
                                                                <Badge>{categ.name}</Badge>
                                                            </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                    <Card.Text>
                                                        <Row className="text-secondary">
                                                            <Col md="auto">
                                                                Created: {task.creation_date}
                                                            </Col>
                                                            <Col md="auto">
                                                                Deadline: {task.deadline}
                                                            </Col>
                                                            <Col md="auto">
                                                            {Avatar(task)}
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                                            
                                                </Card.Body>
                                            </Card>
                                        ): null))
                                    }
                                </Col>
                                <Col>
                                <h2 className="ms-2 mb-3">Done</h2>
                                {
                                        tasks.tasks?.map((task) => (
                                            task.status == "Finished" ? (
                                            <Card className="ms-1 me-1 littlecard mb-3">
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                        <Card.Title className="fs-4">{task.name}</Card.Title>
                                                        </Col>
                                                        <Col>
                                                            <DropdownButton id="dropdown-basic-button" title="" variant="outline-secondary">
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "addperformer", itemId: task.id})}>Add performer +</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "editdone", itemId: task.id})}>Edit</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setModalActive({active: true, itemName: task.name, type: "deletetask", itemId: task.id})}>Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </Col>
                                                    </Row>
                                                    <Card.Text>{task.description}</Card.Text>
                                                    <ProgressBar now="100" label="100%" className="mb-3"/>
                                                    <Row className="mb-2">
                                                        {
                                                            task.category?.map((categ) => (
                                                            <Col md="auto">
                                                                <Badge>{categ.name}</Badge>
                                                            </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                    <Card.Text>
                                                        <Row className="text-secondary">
                                                            <Col md="auto">
                                                                Created: {task.creation_date}
                                                            </Col>
                                                            <Col md="auto">
                                                                Deadline: {task.deadline}
                                                            </Col>
                                                            <Col md="auto">
                                                            {Avatar(task)}
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                                            
                                                </Card.Body>
                                            </Card>
                                        ): null))
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
                <ModalWindow active={modalActive.active} setActive={setModalActive}>
                {ModalType(modalActive.itemName, modalActive.itemId, modalActive.type)}
                </ModalWindow>
                </>
              )
                                
    
 

}