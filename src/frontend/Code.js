import React from "react";
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
      <div className="container1">
        <div className="card1" style={{ width: "600px" }}>
          <h1 className="card1-title">Private Room</h1>
          <div className="card-body">
            <h2 style={{ paddingTop: "50px" }}>Join A Room:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="email"
                  class="form-label"
                >
                  RoomID:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeHolder="Enter the room ID"
                  name="email"
                ></input>
              </div>
              <button type="submit" class="btn btn-primary">
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
