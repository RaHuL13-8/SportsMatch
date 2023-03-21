import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";

const JoinARoom = () => {
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
            <h2 style={{ paddingTop: "50px" }}>Create A Room:</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="email"
                  class="form-label"
                >
                  Sport:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeHolder="Enter the sport you want to play"
                  name="email"
                ></input>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="pwd"
                  class="form-label"
                >
                  Time:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="pwd"
                  placeholder="Enter the time you want to play"
                  name="pswd"
                />
                <div className="mb-3 mt-3">
                  <label
                    style={{ fontSize: "30px" }}
                    for="email"
                    class="form-label"
                  >
                    Max Players:
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeHolder="Enter the max Number of players required"
                    name="email"
                  ></input>
                </div>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinARoom;
