import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Components/custom.css'
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import NavLink from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Styles = styled.div`
    a, .navbar-nav, .nav-link {
        color: white;
        text-decoration: none;
        &:hover {
            color: #CB7EAE
        }
}
`
export default function NavBar(props) {

  const navigate = useNavigate()
  const toHome = () => {
      navigate('/')
  }

  function Logout(){
    let Token = localStorage.getItem('token');
    let headers = {
      'accept': '*/*',
      'Authorization' : 'Bearer ' + Token
    }

    let data ={

    }

    axios.post('https://teamtoolhosting.ru/api/auth/logout', data, {headers: headers}
    ).then((response) => {
      if (response.status == 200){
        localStorage.clear()
        toHome()
      }
    })


  }


  return(
    <>
    <Styles>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand className="ms-3">TODOList</Navbar.Brand>
        <Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
        <Navbar.Collapse id = "responsive-navbar-nav">
          <Nav.Link className="ms-3"><Link to="/projects">Projects</Link></Nav.Link>
          <Nav.Link className="ms-3"><Link to="/notifications">Notifications</Link></Nav.Link>
          <Nav.Link className="ms-3"><Link to="/pomodoro">Pomodoro</Link></Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" id = "responsive-navbar-nav">
        <Nav>
          <Nav.Link id ="user" className="bug ms-3" ><Link to="/profile">{props.email}</Link></Nav.Link>
          <Nav.Link id ="logout" className="bug ms-3 me-2"><Link onClick={() => Logout()}>Exit</Link></Nav.Link></Nav>
        </Navbar.Collapse>
      </Navbar>
      </Styles>
    </>
  )
}