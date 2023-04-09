import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import { signOut } from "firebase/auth";
import { auth } from "../backend/firebase";

const Navbar2 = ({ userId }) => {
  const navigate = useNavigate();
  const [Dropdown, setDropdown] = useState("");
  const handleClick = () => {
    setDropdown(!Dropdown);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        auth.currentUser = null;
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleMatches = () => {
    navigate("/JoinedRooms");
  };
  return (
    <section className="profile" style={{ textAlign: "center" }}>
      <Link to="/Home">
        <img
          src="flc_design20230316126131.png"
          alt=""
          width="90%"
          height="180"
        />
      </Link>
      <Link to="/Home">
        <button className="btn btn-dark btn-nav">Home</button>
      </Link>
      <Link to="/Profile">
        <button className="btn btn-dark btn-nav">Profile</button>
      </Link>
      <Link to="/JoinedRooms">
        <button className="btn btn-dark btn-nav">My Matches</button>
      </Link>
      <button className="btn btn-dark btn-logout" onClick={handleLogout}>
        Log out
      </button>
    </section>
  );
};

export default Navbar2;
