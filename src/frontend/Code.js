import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";

const Code = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/Home");
  };
  return (
    <section>
      <NavBar1 />
      <div className="container">
        <div className="card1" style={{ width: "600px" }}>
          <h1 className="card1-title" style={{ color: "gray" }}>
            Private Room
          </h1>
          <div className="card-body">
            <h2 style={{ paddingTop: "50px", color: "gray" }}>Join A Room:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "25px", color: "gray" }}
                  htmlFor="email"
                  class="form-label"
                >
                  RoomID:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  style={{
                    borderTop: "0px solid",
                    borderLeft: "0px solid",
                    borderRight: "0px solid",
                  }}
                  placeholder="Enter the room ID"
                  name="email"
                ></input>
              </div>
              <button type="submit" className="btn btn-dark btn-login">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Code;
