import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";

const Login = () => {
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
          <h1 className="card1-title">Login</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="email"
                  class="form-label"
                >
                  Email:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeHolder="Type Your Email"
                  name="email"
                ></input>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="pwd"
                  class="form-label"
                >
                  Password:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="pwd"
                  placeholder="Type Your Password"
                  name="pswd"
                />
                <button type="submit" class="btn btn-primary">
                  Log In
                </button>
              </div>
            </form>
            <h6 style={{ color: "Gray" }}>New Here?</h6>
            <Link to="/SignUp" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
