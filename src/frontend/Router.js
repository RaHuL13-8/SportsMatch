import React from "react";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Home from "./Home";
import JoinARoom from "./JoinARoom";
import CreateARoom from "./CreateARoom";
import Code from "./Code";
// navbar
// import Navbar from "./Navbar";
const ReactRouterSetup = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/SignUp" element={<SignUp />}></Route>
        <Route exact path="/Profile" element={<Profile />}></Route>
        <Route exact path="/Home" element={<Home />}></Route>
        <Route exact path="/JoinARoom" element={<JoinARoom />}></Route>
        <Route exact path="/CreateARoom" element={<CreateARoom />}></Route>
        <Route exact path="/Code" element={<Code />}></Route>
      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
