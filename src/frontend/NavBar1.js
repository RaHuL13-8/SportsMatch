import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar1 = ({ userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <section id="Nav">
      <nav
        class="navbar navbar-light bg-gray"
        style={{
          position: "absolute",
          left: "0px",
          width: "100%",
          height: "80px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div class="container">
          <div
            class="navbar-brand"
            style={{ position: "absolute", left: "3%", top: "2%" }}
          >
            <Link to="/Home">
              <img
                src="flc_design20230316126131.png"
                alt=""
                width="240"
                height="79"
              />
            </Link>
          </div>
          <div
            class="navbar-brand"
            style={{
              position: "absolute",
              left: "93%",
              top: "2%",
            }}
          >
            <Link to="/Profile">
              <div className="img-circle">
                <img
                  className="logo"
                  src="https://t4.ftcdn.net/jpg/00/64/67/27/240_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
                  alt=""
                  width="100"
                  height="70"
                />
              </div>
            </Link>
          </div>
          <div className="navbar-brand">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar1;
