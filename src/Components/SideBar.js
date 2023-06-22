import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../Components/custom.css'
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import NavLink from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
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
  return(
    <>
    <Styles>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand className="ms-3">TODOList</Navbar.Brand>
        <Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
        <Navbar.Collapse id = "responsive-navbar-nav">
          <Nav.Link className="ms-3"><Link to="/projects">Projects</Link></Nav.Link>
          <Nav.Link className="ms-3"><Link to="/notifications">Notifications</Link></Nav.Link>
          <Nav.Link className="ms-3"><Link to="#">Pomodoro</Link></Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" id = "responsive-navbar-nav">
        <Nav>
          <Nav.Link id ="user" className="bug ms-3" ><Link to="/profile">{props.email}</Link></Nav.Link>
          <Nav.Link id ="logout" className="bug ms-3 me-2"><Link>Exit</Link></Nav.Link></Nav>
        </Navbar.Collapse>
      </Navbar>
      </Styles>
    </>
  )
}