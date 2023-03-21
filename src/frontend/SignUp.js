import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/");
  };
  return (
    <section>
      <NavBar1 />

      <div className="container1">
        <div
          className="card1"
          style={{
            width: "700px",
          }}
        >
          <h1 className="card1-title">Sign Up</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="Name"
                  class="form-label"
                >
                  Name:
                </label>
                <input
                  type="name"
                  class="form-control"
                  id="Name"
                  placeHolder="Type the name you want yourself to be called with"
                  name="name"
                ></input>
              </div>
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
              <div className="mb-3 mt-3">
                <label
                  style={{ fontSize: "30px" }}
                  for="username"
                  class="form-label"
                >
                  Username:
                </label>
                <input
                  type="username"
                  class="form-control"
                  id="username"
                  placeHolder="Type Your Username"
                  name="Username"
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
                  Sign Up
                </button>
                <p></p>
                <h6 style={{ color: "gray" }}>Already Have an Account?</h6>
                <Link to="/" className="btn btn-primary">
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
