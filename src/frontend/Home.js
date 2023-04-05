import { React, useEffect, useState, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../backend/firebase";
import { BsQuestionCircle } from "react-icons/bs";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar1 from "./NavBar1";
import Profile from "./Profile";
const Home = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [currLocation, setCurrLocation] = useState({});

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
    });
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     // ...
    //     console.log("uid", uid);
    //   } else {
    //     // User is signed out
    //     // ...
    //     console.log("user is logged out");
    //   }
    // });
    getLocation();
  }, []);
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
              <button
                type="button"
                className="btn-h btn btn-success"
                style={{ textAlign: "center" }}
              >
                <h4>Create Online Sport</h4>
              </button>
            </Link>
            <div className="p-h">
              <BsQuestionCircle />
            </div>
          </div>
          <div
            className="col-sm-4 text-white p-3"
            style={{ textAlign: "center" }}
          >
            <Link to="/JoinARoom">
              <br />
              <br />
              <button type="button" className="btn-h btn btn-success">
                <h4>Join Online Sport</h4>
              </button>
            </Link>
            <p className="p-h">
              <BsQuestionCircle />
            </p>
          </div>
          <div
            className="col-sm-4 text-white p-3"
            style={{ textAlign: "center" }}
          >
            <Link to="/Code">
              <br />
              <br />
              <button type="button" className="btn-h btn btn-success">
                <h4>Enter Code</h4>
              </button>
            </Link>
            <br />
            <p className="p-h">
              <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <BsQuestionCircle />
              </div>
            </p>
            <br />
            {isHovering && (
              <div className="card-info">
                <p style={{ color: "black" }}>Info</p>
                {/* <p style={{ color: "black" }}>
                  Latitude:{currLocation.latitude}
                </p>
                <p style={{ color: "black" }}>
                  Longitude:{currLocation.longitude}
                </p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
