
import React, {useState} from "react";
import './App.css';
import { 
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./Components/SideBar";
import TaskCard from "./Components/TaskPage/TaskCard";
import { Login } from "./Components/Auth/Login";
import { Registration } from "./Components/Auth/Registration";
import ProjectsPage from "./Components/Projects/ProjectsPage";
import { Profile } from "./Components/Profile";

export default function App() {
  return (
    <>
    <Router>
     <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element ={<TaskCard></TaskCard>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/registration" element={<Registration></Registration>}></Route>
        <Route path="/projects" element={<ProjectsPage></ProjectsPage>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </Router>
    </>
  );
}
