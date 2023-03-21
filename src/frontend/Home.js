import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import Profile from "./Profile";
const Home = () => {
  return (
    <section>
      <Navbar1 />
      <div className="c2">
        {/* <div class="container-fluid mt-3"> */}
        <div className="row">
          <h1 className="h1-h">Connect,Compete,Conquer with SportsMatch</h1>
          <div className="col-h col-sm-4  text-white p-3">
            <br />
            <br />
            <Link to="/CreateARoom">
              <button type="button" class="btn-h btn btn-success">
                <h4>Create Online Sport</h4>
              </button>
            </Link>
            <p className="p-h">
              (Create Your Own Game to play with your Friends)
            </p>
          </div>
          <div className="col-sm-4 text-white p-3">
            <Link to="/JoinARoom">
              <br />
              <br />
              <button type="button" class="btn-h btn btn-success">
                <h4>Join Online Sport</h4>
              </button>
            </Link>
            <p className="p-h">(Join a game with online players)</p>
          </div>
          <div className="col-sm-4 text-white p-3">
            <Link to="/Code">
              <br />
              <br />
              <button type="button" class="btn-h btn btn-success">
                <h4>Enter Code</h4>
              </button>
            </Link>
            <p className="p-h">(Enter Code to join an existing Game)</p>
          </div>
        </div>
        <div className="row">
          <div className="col-h col-sm-4  text-gray p-3">
            <h3>Info</h3>
          </div>
          <div className="col-h col-sm-4  text-gray p-3">
            <h3>Info</h3>
          </div>
          <div className="col-h col-sm-4  text-gray p-3">
            <h3>Info</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
